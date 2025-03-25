'use client'

import { PropsWithChildren } from 'react'

import { ColorPicker } from '@/components/ui/color-picker'

interface MenuItemColorPickerProps {
  value: string
  onChange?: (color: string) => void
} 

export function MenuItemColorPicker({
  value,
  onChange,
}: PropsWithChildren<MenuItemColorPickerProps>) {
  return <ColorPicker value={value} onChange={onChange} />
}
