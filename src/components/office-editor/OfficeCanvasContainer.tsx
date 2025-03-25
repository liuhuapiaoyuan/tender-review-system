import React, { useEffect, useRef } from "react";

import Editor, { Command, EditorMode, KeyMap } from "@hufe921/canvas-editor";
import docxPlugin from "@hufe921/canvas-editor-plugin-docx";
import type {} from "@hufe921/canvas-editor-plugin-docx/dist/src/docx/exportDocx.d.ts";
import type {} from "@hufe921/canvas-editor-plugin-docx/dist/src/docx/importDocx.d.ts";
import floatingToolbarPlugin from "@hufe921/canvas-editor-plugin-floating-toolbar";

import { useOfficeEditor } from "./OfficeCanvasProvider";
import "./style.css";
import { textStyle } from "./utils";

interface EditorProps {
  initialValue?: string;
  mode?: EditorMode;
}
/**
 * 编辑器
 * @param param0
 * @returns
 */
const OfficeCanvasContainer: React.FC<EditorProps> = ({
  mode,
  initialValue = "Hello World",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setEditor } = useOfficeEditor();
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const editorInstance = new Editor(containerRef.current, [], {
      width: 794,
      height: 1123,
      placeholder: { data: "请输入内容" },
      scrollContainerSelector: "#office-editor",
      group: {
        activeBackgroundColor: "#ef4444",
        backgroundColor: "#ef4444",
      },
      mode: mode ?? EditorMode.EDIT,
    });

    // 加载doc插件
    editorInstance.use(docxPlugin);
    editorInstance.use(floatingToolbarPlugin);
    editorInstance.use(textStyle);

    // 10. 快捷键注册
    editorInstance.register.shortcutList([
      {
        key: KeyMap.P,
        mod: true,
        isGlobal: true,
        callback: (command: Command) => {
          command.executePrint();
        },
      },

      {
        key: KeyMap.MINUS,
        ctrl: true,
        isGlobal: true,
        callback: (command: Command) => {
          command.executePageScaleMinus();
        },
      },
      {
        key: KeyMap.EQUAL,
        ctrl: true,
        isGlobal: true,
        callback: (command: Command) => {
          command.executePageScaleAdd();
        },
      },
      {
        key: KeyMap.ZERO,
        ctrl: true,
        isGlobal: true,
        callback: (command: Command) => {
          command.executePageScaleRecovery();
        },
      },
    ]);
    setEditor(editorInstance);

    return () => {
      editorInstance.destroy();
    };
  }, [initialValue, setEditor]);

  return <div className="h-full" ref={containerRef} />;
};

export { OfficeCanvasContainer };
