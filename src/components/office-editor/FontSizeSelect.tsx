import { SelectProps } from '@radix-ui/react-select'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { FontSizeList } from './const'

export function FontSizeSelect(props: SelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger className='w-[80px] border-none shadow-none bg-slate-50 rounded-none hover:bg-slate-100 text-sm h-6 hover:bg-foreground/5'>
        <SelectValue placeholder='字号' />
      </SelectTrigger>
      <SelectContent>
        {FontSizeList.map(({ size, name }) => (
          <SelectItem key={size} value={size}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
