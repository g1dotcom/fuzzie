"use client";
import React from "react";

import { Connection } from "@/lib/types";

import { EditorState } from "@/providers/editor-provider";
import { useNodeConnections } from "@/providers/connections-provider";

const RenderConnectionAccordion = ({
  connection,
  state,
}: {
  connection: Connection;
  state: EditorState;
}) => {
  const {
    title,
    image,
    description,
    connectionKey,
    accessTokenKey,
    alwaysTrue,
    slackSpecial,
  } = connection;

  const { nodeConnection } = useNodeConnections();

  return <div className=""></div>;
};

export default RenderConnectionAccordion;
