'use client';

import { useContext } from "react";
import { ToasterContext } from "./ToasterContext";

export const useToaster = () => {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }

  return context;
};
