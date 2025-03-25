import { createContext, useContext, useState } from "react";

import Editor from "@hufe921/canvas-editor";

interface OfficeEditorContextType {
  editor: Editor | null;
  setEditor: React.Dispatch<React.SetStateAction<Editor | null>>;
}

const EditorContext = createContext<OfficeEditorContextType>({
  editor: null,
} as OfficeEditorContextType);

export const useOfficeEditor = () => useContext(EditorContext);

export const OfficeEditorProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <EditorContext.Provider value={{ editor, setEditor }}>
      {children}
    </EditorContext.Provider>
  );
};
