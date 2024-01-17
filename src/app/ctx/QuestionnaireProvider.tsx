"use client";
import { ProviderInfo } from "@/types/provider";
import React, { createContext, useState } from "react";

type QuestionnaireContextType = {
  openQuestionnaire: (targetProvider: any) => void;
  closeQuestionnaire: () => void;
  isOpen?: boolean;
  setOpen: (open: boolean) => void;
  targetProvider: ProviderInfo | null;
};

export const QuestionnaireContext = createContext<QuestionnaireContextType>({
  openQuestionnaire: () => {},
  closeQuestionnaire: () => {},
  isOpen: false,
  setOpen: () => {},
  targetProvider: null,
});

export const QuestionnaireProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [targetProvider, setTargetProvider] = useState<any>(null);
  const openQuestionnaire = (targetProvider: any) => {
    setTargetProvider(targetProvider);
    setIsOpen(true);
  };
  const closeQuestionnaire = () => {
    setTargetProvider(null);
    setIsOpen(false);
  };

  const setOpen = (open: boolean) => {
    setIsOpen(open);
  };
  return (
    <QuestionnaireContext.Provider
      value={{
        openQuestionnaire,
        closeQuestionnaire,
        isOpen,
        setOpen,
        targetProvider,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};
