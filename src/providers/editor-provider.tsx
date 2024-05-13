"use client";

// Temel React ve kullanılan custom hook'ları içe aktarma
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { EditorActions, EditorNodeType } from "@/lib/types"; // Aksiyon tipleri ve düğüm yapıları için tanımlar

// Düzenleyici düğüm yapısının tanımı
export type EditorNode = EditorNodeType;

// Editörün genel durum yapısını tanımlayan türler
export type Editor = {
  elements: EditorNode[]; // Düğümler (elementler)
  edges: {
    id: string; // Kenarların benzersiz kimlikleri
    source: string; // Başlangıç düğüm kimliği
    target: string; // Hedef düğüm kimliği
  }[];
  selectedNode: EditorNodeType; // Şu anda seçili olan düğüm
};

// Geçmiş işlemlerinin durum yapısını tanımlayan tür
export type HistoryState = {
  history: Editor[]; // Geçmişteki editör durumlarının listesi
  currentIndex: number; // Geçerli indeks
};

// Editör ve geçmişin kapsamlı durum yapısını tanımlayan tür
export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

// Başlangıç editör ve geçmiş durumları
const initialEditorState: EditorState["editor"] = {
  elements: [],
  selectedNode: {
    data: {
      completed: false,
      current: false,
      description: "",
      metadata: {},
      title: "",
      type: "Trigger",
    },
    id: "",
    position: { x: 0, y: 0 },
    type: "Trigger",
  },
  edges: [],
};

const initialHistoryState: HistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

// Toplam başlangıç durumu
const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

// Editör için reducer fonksiyonu; aksiyonlara göre durum güncellemesi yapar
const editorReducer = (
  state: EditorState = initialState,
  action: EditorActions
): EditorState => {
  switch (action.type) {
    // Yeniden yapma işlemi
    case "REDO":
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        return {
          ...state,
          editor: { ...state.history.history[nextIndex] },
          history: { ...state.history, currentIndex: nextIndex },
        };
      }
      return state;

    // Geri alma işlemi
    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        return {
          ...state,
          editor: { ...state.history.history[prevIndex] },
          history: { ...state.history, currentIndex: prevIndex },
        };
      }
      return state;

    // Veri yükleme işlemi
    case "LOAD_DATA":
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: action.payload.elements || initialEditorState.elements,
          edges: action.payload.edges,
        },
      };

    // Seçili elementi güncelleme işlemi
    case "SELECTED_ELEMENT":
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedNode: action.payload.element,
        },
      };

    default:
      return state;
  }
};

// Editör context'inin tanımı
export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Editör sağlayıcısı; tüm çocuk bileşenlerine durum ve dispatch

type EditorProps = {
  children: React.ReactNode;
};

const EditorProvider = (props: EditorProps) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};

export default EditorProvider;
