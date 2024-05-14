"use client";
import React from "react";

import { Connection } from "@/lib/types";

import { EditorState } from "@/providers/editor-provider";

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

  return <div className=""></div>;
};

export default RenderConnectionAccordion;
