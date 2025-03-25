'use client'

import React from 'react'

import { Baseline } from 'lucide-react'

export function ColorPicker({
  value,
  onChange, 
}: {
  value: string
  defaultValue?: string
  onChange?: (color: string) => void
}) {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value
    onChange?.(newColor)
  }
  return (
    <label className='relative inline-block'>
      <div className='h-6 w-4 flex items-center justify-center'>
        <Baseline className='size-4' color={!value || value === '' ? '#000000' : value} />
      </div>
      <input
        type='color'
        value={value}
        onChange={handleColorChange}
        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
      />
    </label>
  )
}
