import { PropsWithChildren } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function MenuItem(
  props: PropsWithChildren<{
    tooltip?: string
    active?: boolean
    onClick?: () => void
  }>
) {
  const { children, active, onClick, tooltip } = props
  const Content = (
    <div
      onClick={onClick}
      data-active={active + ''}
      className='w-6 h-6 
      data-[active=true]:bg-gray-200
      cursor-pointer 
      flex items-center justify-center   hover:bg-foreground/5'
    >
      {children}
    </div>
  )
  if (!tooltip) {
    return Content
  }
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{Content}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
