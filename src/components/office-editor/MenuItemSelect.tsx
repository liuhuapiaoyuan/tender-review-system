import { ReactNode } from 'react'

import { SelectProps, SelectTrigger } from '@radix-ui/react-select'

import { Select, SelectContent, SelectItem } from '@/components/ui/select'

import { MenuItem } from './MenuItem'

type Option = {
  label: ReactNode
  value: string
}

export function MenuItemSelect({
  tooltip,
  children,
  options,
  ...props
}: SelectProps & {
  tooltip?: string
  children?: ReactNode
  options?: Option[]
}) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <MenuItem tooltip={tooltip}>{children}</MenuItem>
      </SelectTrigger>
      <SelectContent>
        {options?.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
