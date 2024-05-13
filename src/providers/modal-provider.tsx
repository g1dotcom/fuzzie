"use client";
// İstemci tarafında çalışması gereken kod olduğunu belirtir. Next.js gibi SSR destekli bir framework kullanıyorsanız, bu kodun sadece tarayıcıda çalıştırılmasını sağlar.

import { createContext, useContext, useEffect, useState } from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

export type ModalData = {};

type ModalContextType = {
  data: ModalData;
  isOpen: boolean;
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void;
  setClose: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  data: {},
  isOpen: false,
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
  setClose: () => {},
});
// React Context API kullanılarak bir modal yönetim sistemi oluşturulmuştur. Bu, modalın açık olup olmadığını, modal için verileri ve modalı açıp kapatma fonksiyonlarını yönetir.

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ModalData>({});
  const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
  const [isMounted, setIsMounted] = useState(false);
  // State'ler modalın durumu, içinde gösterilecek veriler ve modal bileşeni için kullanılır. `isMounted` durumu ise, componentin mount edilip edilmediğini kontrol eder.

  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Component mount edildiğinde `isMounted` state'ini true yapar.

  const setOpen = async (
    modal: React.ReactNode,
    fetchData?: () => Promise<any>
  ) => {
    if (modal) {
      if (fetchData) {
        setData({ ...data, ...(await fetchData()) } || {});
      }
      setShowingModal(modal);
      setIsOpen(true);
    }
  };
  // `setOpen` fonksiyonu modalı açar ve isteğe bağlı olarak veri getirme işlemi yapar.

  const setClose = () => {
    setIsOpen(false);
    setData({});
  };
  // `setClose` fonksiyonu modalı kapatır ve içindeki verileri temizler.

  if (!isMounted) return null;
  // Eğer component henüz mount edilmemişse hiçbir şey render etmez.

  return (
    <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
};
// Context sağlayıcı bileşeni, sağladığı context değerleri ve modalı içeren tüm çocuk bileşenleri render eder.

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within the modal provider");
  }
  return context;
};
// Modal context'ini kullanmak için bir hook sağlar. Bu hook, kullanıcıyı context'in doğru sağlayıcı içinde kullanıldığından emin olur.

export default ModalProvider;
// ModalProvider'ı default olarak dışa aktarır.
