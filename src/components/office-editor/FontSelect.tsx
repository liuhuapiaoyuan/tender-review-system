'use client'

import { useEffect } from 'react'

import { SelectContentProps, SelectProps } from '@radix-ui/react-select'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { FontFamily } from './const'

const FontFamilyNames = ['微软雅黑', '仿宋', '黑体', '楷体', ...FontFamily.map(z => z.name)]
export function FontSelect(props: SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className='w-[120px] border-none shadow-none bg-slate-50 rounded-none hover:bg-slate-100 text-sm h-6 hover:bg-foreground/5'>
        <SelectValue placeholder='选择字体' />
      </SelectTrigger>
      <FontSelectContent />
    </Select>
  )
}
export function FontSelectContent(props: SelectContentProps) {
  // 动态加载css
  useEffect(() => {
    if (typeof window !== 'undefined') {
      FontFamily.forEach(item => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.type = 'text/css'
        link.href = item.cssConfig
        document.head.appendChild(link)
      })
    }
  }, [])

  return (
    <SelectContent {...props}>
      {FontFamilyNames.map(item => (
        <SelectItem key={item} value={item} style={{ fontFamily: item }}>
          {item}
        </SelectItem>
      ))}
    </SelectContent>
  )
}
