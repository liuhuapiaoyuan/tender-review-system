import { PropsWithChildren } from 'react'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

export function MenuButton(
  props: PropsWithChildren<{
    tooltip?: string
    onClick?: () => void
    className?: string
  }>
) {
  const { children, className, onClick, tooltip } = props
  const Content = (
    <div
      onClick={onClick}
      className={cn(
        'h-6 text-nowrap px-2 text-sm bg-slate-50 cursor-pointer flex items-center justify-center   hover:bg-foreground/5',
        className
      )}
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
