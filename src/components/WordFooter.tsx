import { useEffect, useState } from 'react'

import { EditorMode } from '@hufe921/canvas-editor'

import { MenuButton } from '@/components/office-editor/MenuButton'
import { useOfficeEditor } from '@/components/office-editor/OfficeCanvasProvider'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

const EditorModes = [
  { value: EditorMode.EDIT, label: '编辑' },
  { value: EditorMode.READONLY, label: '只读' },
  { value: EditorMode.PRINT, label: '打印' },
  { value: EditorMode.FORM, label: '表单' },
]

export function WordFooter() {
  const { editor } = useOfficeEditor()
  const [pageSize, setPageSize] = useState(0)
  const [pageNo, setPageNo] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [currentMode, setCurrentMode] = useState<EditorMode>(EditorMode.EDIT)

  const [pageScale, setPageScale] = useState(1)
  useEffect(() => {
    const onContentChange = debounce(async () => {
      const count = await editor?.command.getWordCount()
      setWordCount(count ?? 0)
    }, 200)

    if (editor) {
      editor.eventBus.on('pageSizeChange', setPageSize)
      editor.eventBus.on('contentChange', onContentChange)
      editor.eventBus.on('intersectionPageNoChange', setPageNo)
      editor.eventBus.on('pageScaleChange', setPageScale)
    }

    return () => {
      if (editor) {
        editor.eventBus.off('pageSizeChange', setPageSize)
        editor.eventBus.off('intersectionPageNoChange', setPageNo)
        editor.eventBus.off('contentChange', onContentChange)
      }
    }
  }, [editor])

  useEffect(() => {
    if (editor) {
      editor.command.getWordCount().then(setWordCount)
    }
  }, [editor])
  const modeIndex = EditorModes.findIndex(item => item.value === currentMode)
  const nextState = EditorModes[modeIndex + (1 % EditorModes.length)]?.value ?? 'edit' as EditorMode
  return (
    <div className='w-full h-[30px] flex items-center justify-between bg-[#f2f4f7] z-[9] text-xs px-5 py-0 box-border gap-2'>
      <div>
        页面：{pageNo + 1}/{pageSize}
      </div>
      <div>字数：{wordCount}</div>
      <div className='flex-1 flex items-center justify-center'>
        <MenuButton
          onClick={() => {
            editor?.command?.executeMode(nextState)
            setCurrentMode(nextState)
          }}
        >
          {EditorModes[modeIndex]?.label ?? '编辑'}模式
        </MenuButton>
      </div>
      <MenuButton
        tooltip='点击恢复'
        onClick={() => {
          editor?.command?.executePageScale(1)
        }}
      >
        缩放：{(pageScale * 100).toFixed(0)}%
      </MenuButton>
    </div>
  )
}
