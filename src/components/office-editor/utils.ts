import { ElementType, IElement, IRange } from '@hufe921/canvas-editor'
import type Editor from '@hufe921/canvas-editor'
import type { ISearchResultContext } from '@hufe921/canvas-editor/dist/src/editor/interface/Search'

export const ZERO = '\u200B'

export const TEXTLIKE_ELEMENT_TYPE: ElementType[] = [
  ElementType.TEXT,
  ElementType.HYPERLINK,
  ElementType.SUBSCRIPT,
  ElementType.SUPERSCRIPT,
  ElementType.CONTROL,
  ElementType.DATE,
]
export enum TitleLevel {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
  FOURTH = 'fourth',
  FIFTH = 'fifth',
  SIXTH = 'sixth',
}
export type TextStyleType = {
  family?: string
  bold?: boolean
  color?: string
  type?: 'title' | 'paragraph'
  fontSize?: number
  level?: TitleLevel
}
// 批量设置文本样式，配置一个过滤器
function updateElement(item: IElement, config: TextStyleType) {
  return Object.assign(
    item,
    config.bold && { bold: config.bold },
    config.family && { font: config.family },
    config.color && { color: config.color },
    config.fontSize && { size: Number(config.fontSize) }
  )
}
/**
 * 内容合并
 * @param values
 * @param config
 * @returns
 */
export function textStyleAction(values: IElement[], config: TextStyleType) {
  return values.map(item => {
    if (item.type === ElementType.TITLE) {
      if (config.type === 'title' && (config.level ? item.level === config.level : true)) {
        item.valueList = item.valueList?.map(item => {
          return updateElement(item, config)
        })
      }
    } else if (item.valueList) {
      item.valueList = textStyleAction(item.valueList, config)
    } else if (!item.type && config.type === 'paragraph') {
      item = updateElement(item, config)
    }

    return item
  })
}

declare module '@hufe921/canvas-editor' {
  interface Command {
    /**
     * 批量调整样式
     * @param options
     */
    executeBatchTextStyle(options: TextStyleType): void

    /**
     * 聚焦
     * @param text
     * @param contextText 如果提供，则会先检索context再检索text，保证准确
     */
    executeTextFocus(text: string, contextText?: string): IRange
    /**
     * 聚焦并替换
     * @param text
     * @param replaceText
     * @param contextText 如果提供，则会先检索context再检索text，保证准确
     */
    executeFocusAndReplace(text: string, replaceText: string, contextText?: string): void

    /**
     * 创建group 并获得id
     * @param text
     * @param contextText
     */
    executeCreateGroup(text: string, contextText?: string): string | null
    /**
     * 获得交互点位置
     * 一般在命令产生的时候形成
     * @param text
     * @param contextText
     */
    getPointBykeyword(text: string, contextText?: string): [number, number, number, number] | null
  }
}

export function textStyle(editor: Editor) {
  editor.command.executeBatchTextStyle = (options: TextStyleType) => {
    const values = editor.command.getValue()
    const main = textStyleAction(values.data.main, options)
    editor.command.executeSetValue({
      main,
    })
  }

  editor.command.executeCreateGroup = (text: string, contextText?: string) => {
    const range = editor.command.executeTextFocus(text, contextText)
    if (range) {
      const groupId = editor.command.executeSetGroup()
      editor.command.executeSetRange(0, 0)
      return groupId
    }
    return null
  }

  editor.command.getPointBykeyword = (text: string, contextText?: string) => {
    const ranges = editor?.command.getKeywordRangeList(text)
    let rangeIndex = 0
    if (contextText) {
      const contextTextRange = editor?.command.getKeywordRangeList(contextText)?.[0]
      if (contextTextRange) {
        rangeIndex = ranges?.findIndex(range => {
          return (
            range.startIndex >= contextTextRange.startIndex &&
            range.endIndex <= contextTextRange.endIndex
          )
        })
      }
    }
    const container = editor.command.getContainer()
    const margin = editor.command.getPaperMargin()
    const contexts = editor.command.getKeywordContext(text)
    if (contexts?.[rangeIndex]) {
      const point = getRangePoint(contexts[rangeIndex], {
        pageWidth: container.clientWidth,
        pageMarginX: margin[1],
      })
      return [point.x, point.y, point.startX, point.textEndX]
    }
    return null
  }

  editor.command.executeTextFocus = (text: string, contextText?: string) => {
    const ranges = editor?.command.getKeywordRangeList(text)
    let rangeIndex = 0
    if (contextText) {
      const contextTextRange = editor?.command.getKeywordRangeList(contextText)?.[0]
      if (contextTextRange) {
        rangeIndex = ranges?.findIndex(range => {
          return (
            range.startIndex >= contextTextRange.startIndex &&
            range.endIndex <= contextTextRange.endIndex
          )
        })
      }
    }
    const range = ranges?.[rangeIndex]
    if (range) {
      editor?.command.executeSetRange(
        range.startIndex,
        range.endIndex,
        range.tableId,
        range.startTdIndex,
        range.endTdIndex,
        range.startTrIndex,
        range.endTrIndex
      )
    }
    return range
  }

  editor.command.executeFocusAndReplace = (
    text: string,
    replaceText: string,
    contextText?: string
  ) => {
    const ranges = editor?.command.getKeywordRangeList(text)
    let rangeIndex = 0
    if (contextText) {
      const contextTextRange = editor?.command.getKeywordRangeList(contextText)?.[0]
      if (contextTextRange) {
        rangeIndex = ranges?.findIndex(range => {
          return (
            range.startIndex >= contextTextRange.startIndex &&
            range.endIndex <= contextTextRange.endIndex
          )
        })
      }
    }
    if (rangeIndex >= 0) {
      editor?.command?.executeSearch(text)
      // 一步步的导航到下一个检查点
      let index = 0
      while (index <= rangeIndex) {
        index += 1
        editor?.command?.executeSearchNavigateNext()
      }
      editor?.command?.executeReplace(replaceText)
    }
    if (ranges[rangeIndex]) {
      editor?.command.executeSetRange(
        ranges[rangeIndex].startIndex,
        ranges[rangeIndex].endIndex,
        ranges[rangeIndex].tableId,
        ranges[rangeIndex].startTdIndex,
        ranges[rangeIndex].endTdIndex,
        ranges[rangeIndex].startTrIndex,
        ranges[rangeIndex].endTrIndex
      )
    }
  }
}

/**
 * 将厘米转换为像素
 */
export function cmToPx(cm: number, dpi = 96) {
  // 1英寸 = 2.54厘米
  const inches = cm / 2.54
  // 像素 = 英寸 * DPI
  const pixels = inches * dpi
  return pixels
}
export function ptToPx(pt: number, dpi = 96) {
  const inches = pt / 72
  // 像素 = 英寸 * DPI
  const pixels = inches * dpi
  return pixels
}
interface LineInfo {
  x: number
  y: number
  width: number
}

/**
 * 获得波浪线
 * @param param0
 * @returns
 */
export function getRangeLine({ startPosition: start, endPosition: end }: ISearchResultContext) {
  const lines: Array<LineInfo> = []
  const pageWidth = 796
  const pageMarginX = 124
  const lineWidth = pageWidth - pageMarginX * 2
  // 如果选区的起始和结束在同一行
  if (start.rowNo === end.rowNo) {
    const [x, y] = start.coordinate.leftBottom
    const [_, endY] = start.coordinate.rightBottom
    const width = endY - y
    lines.push({ x, y, width })
  } else {
    // 处理跨行的情况
    // 第一行的波浪线
    const [firstLineX, firstLineY] = start.coordinate.leftBottom
    lines.push({ x: firstLineX, y: firstLineY, width: lineWidth })

    // 中间行的波浪线（如果有）
    for (let row = start.rowNo + 1; row < end.rowNo; row++) {
      // 假设中间行的波浪线覆盖整行
      const midLineX = pageMarginX // 假设行的起始X坐标为0
      const midLineY = start.coordinate.leftBottom[1] + (row - start.rowNo) * start.lineHeight
      lines.push({ x: midLineX, y: midLineY, width: lineWidth })
    }

    // 最后一行的波浪线
    const lastLineX = pageMarginX
    const [lastLineEndX, lastLineY] = end.coordinate.rightBottom
    lines.push({ x: lastLineX, y: lastLineY, width: lastLineEndX - lastLineX })
  }
  return lines
}
/**
 * 计算激活点
 * @param param0
 * @returns
 */
export function getRangePoint(
  { endPosition: end }: ISearchResultContext,
  {
    pageWidth,
    pageMarginX,
  }: {
    pageWidth: number
    pageMarginX: number
  } = { pageWidth: 796, pageMarginX: 124 }
) {
  // 最后一行线
  const [endX, y2] = end.coordinate.rightBottom
  return {
    x: pageWidth - pageMarginX,
    y: y2,
    startX: pageMarginX,
    textEndX: endX,
  }
}
