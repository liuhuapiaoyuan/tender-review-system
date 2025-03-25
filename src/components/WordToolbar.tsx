'use client'

import { useEffect, useState } from 'react'

import { type IRangeStyle, RowFlex } from '@hufe921/canvas-editor'
import { FileInput } from 'lucide-react'

import { FontSelect } from '@/components/office-editor/FontSelect'
import { FontSizeSelect } from '@/components/office-editor/FontSizeSelect'
import { MenuButton } from '@/components/office-editor/MenuButton'
import { MenuDivider } from '@/components/office-editor/MenuDivider'
import { MenuItem } from '@/components/office-editor/MenuItem'
import { MenuItemColorPicker } from '@/components/office-editor/MenuItemColorPicker'
import { MenuItemSelect } from '@/components/office-editor/MenuItemSelect'
import { useOfficeEditor } from '@/components/office-editor/OfficeCanvasProvider'
import DocIcons from '@/components/office-editor/icons'
import { useToast } from '@/hooks/use-toast'

export function WordToolbar() {
  const { editor } = useOfficeEditor()
  const { toast } = useToast() 
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (
      selectedFile &&
      selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      if (!selectedFile) {
        toast({
          title: '错误',
          children: '文件格式错误',
        })
        return
      } 

      const arrayBuffer = await selectedFile.arrayBuffer()
      try {
        editor?.command.executeImportDocx({ arrayBuffer })
      } catch (error) {
        console.log(error)
      }
    } else {
      toast({
        title: '错误',
        children: '文件格式错误',
      })
    }
  }

  // 字号处理
  const [fontSize, setFontSize] = useState(12)
  const [font, setFont] = useState('微软雅黑')
  const [bold, setBold] = useState(false)
  const [rowMargin, setRowMargin] = useState<number>(0) 
  const [fontColor, setFontColor] = useState<string | null>('#000000')
  // 斜体
  const [italic, setItalic] = useState(false)
  useEffect(() => {
    const rangeStyleChange = (payload: IRangeStyle) => {
      setFontSize(payload.size)
      setFont(payload.font)
      setBold(payload.bold)
      setItalic(payload.italic)
      setFontColor(payload.color)
      setRowMargin(payload.rowMargin)
    }
    editor?.eventBus.on('rangeStyleChange', rangeStyleChange)
    return () => {
      editor?.eventBus?.off('rangeStyleChange', rangeStyleChange)
    }
  }, [editor])

  return (
    <div className='p-2 bg-gray-100 flex flex-wrap items-center gap-2 justify-center'>
      <label>
        <input
          type='file'
          accept='.docx,doc'
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <MenuButton tooltip='导入文档docx'>
          <FileInput className='w-4 h-4 mr-2' />
          导入文档
        </MenuButton>
      </label>
      <MenuItem tooltip='撤销'>
        <DocIcons.Undo className='size-4' />
      </MenuItem>
      <MenuItem tooltip='重做'>
        <DocIcons.Redo className='size-4' />
      </MenuItem>
      <MenuItem tooltip='格式刷'>
        <DocIcons.Painter className='size-4' />
      </MenuItem>
      <MenuItem tooltip='清除格式'>
        <DocIcons.Format className='size-4' />
      </MenuItem>
      <MenuDivider />
      <FontSelect
        value={font}
        onValueChange={value => {
          editor?.command?.executeFont(value)
        }}
      />
      <FontSizeSelect
        value={fontSize + ''}
        defaultValue={fontSize + ''}
        onValueChange={value => {
          editor?.command?.executeSize(Number(value))
        }}
      />
      <MenuItem tooltip='增加字号' onClick={() => editor?.command?.executeSizeAdd()}>
        <DocIcons.SizeAdd className='size-4' />
      </MenuItem>
      <MenuItem tooltip='减少字号' onClick={() => editor?.command?.executeSizeMinus()}>
        <DocIcons.SizeMinus className='size-4' />
      </MenuItem>
      {/* 加粗 */}
      <MenuItem
        active={bold}
        onClick={() => {
          editor?.command?.executeBold()
        }}
        tooltip='加粗(Ctrl+B)'
      >
        <DocIcons.Bold className='size-4' />
      </MenuItem>
      <MenuItem
        active={italic}
        onClick={() => {
          editor?.command?.executeItalic()
        }}
        tooltip='斜体(Ctrl+I)'
      >
        <DocIcons.Italic className='size-4' />
      </MenuItem>
      <MenuItem
        onClick={() => {
          editor?.command?.executeUnderline()
        }}
        tooltip='下划线(Ctrl+U)'
      >
        <DocIcons.Underline className='size-4' />
      </MenuItem>
      <MenuItem
        onClick={() => {
          editor?.command?.executeStrikeout()
        }}
        tooltip='删除线(Ctrl+Shift+U)'
      >
        <DocIcons.Strikeout className='size-4' />
      </MenuItem>
      {/* 上标 */}
      <MenuItem
        onClick={() => {
          editor?.command?.executeSuperscript()
        }}
        tooltip='上标(Ctrl+Shift+,)'
      >
        <DocIcons.Superscript className='size-4' />
      </MenuItem>
      {/* 下标 */}
      <MenuItem
        onClick={() => {
          editor?.command?.executeSubscript()
        }}
        tooltip='下标(Ctrl+Shift+.)'
      >
        <DocIcons.Subscript className='size-4' />
      </MenuItem>
      <MenuItemColorPicker
        value={fontColor ?? ''}
        onChange={value => {
          editor?.command?.executeColor(value)
        }}
      >
        <DocIcons.Color className='size-4' />
      </MenuItemColorPicker>
      <MenuItem onClick={() => {}} tooltip='高亮'>
        <DocIcons.Highlight className='size-4' />
      </MenuItem>
      <MenuDivider />
      {/* 左对齐 */}
      <MenuItem
        onClick={() => {
          editor?.command?.executeRowFlex(RowFlex.LEFT)
        }}
        tooltip='左对齐'
      >
        <DocIcons.Left className='size-4' />
      </MenuItem>
      {/* 居中 */}
      <MenuItem
        onClick={() => {
          editor?.command?.executeRowFlex(RowFlex.CENTER)
        }}
        tooltip='居中'
      >
        <DocIcons.Center className='size-4' />
      </MenuItem>
      {/* 右对齐 */}
      <MenuItem onClick={() => editor?.command?.executeRowFlex(RowFlex.RIGHT)} tooltip='右对齐'>
        <DocIcons.Right className='size-4' />
      </MenuItem>
      {/* 两段对齐 */}
      <MenuItem
        onClick={() => editor?.command?.executeRowFlex(RowFlex.ALIGNMENT)}
        tooltip='两段对齐'
      >
        <DocIcons.Alignment className='size-4' />
      </MenuItem>
      {/* 分散对齐 */}
      <MenuItem onClick={() => editor?.command?.executeRowFlex(RowFlex.JUSTIFY)} tooltip='分散对齐'>
        <DocIcons.Justify className='size-4' />
      </MenuItem>
      {/* 行间距 */}
      <MenuItemSelect
        tooltip='行间距'
        value={`${rowMargin}`}
        onValueChange={value => {
          editor?.command?.executeRowMargin(Number(value))
        }}
        options={[
          {
            value: '1',
            label: '1',
          },
          {
            value: '1.25',
            label: '1.25',
          },
          {
            value: '1.5',
            label: '1.5',
          },
          {
            value: '1.75',
            label: '1.75',
          },
          {
            value: '2',
            label: '2',
          },
          {
            value: '2.5',
            label: '2.5',
          },
          {
            value: '3',
            label: '3',
          },
        ]}
      >
        <DocIcons.RowMargin className='size-4' />
      </MenuItemSelect>
      {/*  */}
      <MenuItemSelect
        tooltip='列表(Ctrl+Shift+U)'
        options={[
          { value: 'none', label: <span>取消列表</span> },
          {
            value: 'ol-decimal',
            label: (
              <div>
                <div>有序列表：</div>
                <div>1.________</div>
              </div>
            ),
          },
          {
            value: 'ul-checkbox',
            label: (
              <div>
                <div>复选框列表：</div>
                <div>☑️________</div>
              </div>
            ),
          },
          {
            value: 'ul-disc',
            label: (
              <div>
                <div>实心圆点列表：</div>
                <div>• ________</div>
              </div>
            ),
          },
          {
            value: 'ul-circle',
            label: (
              <div>
                <div>空心圆点列表：</div>
                <div>○ ________</div>
              </div>
            ),
          },
          {
            value: 'ul-square',
            label: (
              <div>
                <div>空心方块列表：</div>
                <div>☐ ________</div>
              </div>
            ),
          },
        ]}
      >
        <DocIcons.List className='size-4' />
      </MenuItemSelect>
    </div>
  )
}
