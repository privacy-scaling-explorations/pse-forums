import { cn } from "l/utils"
import { DateTime } from "luxon"
import { useMemo } from "react"
import { Label } from "./label"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

type TimeSinceProps = {
  isoDateTime: string
  className?: string
}

export function TimeSince({ isoDateTime, className }: TimeSinceProps) {
  const timeSince = useMemo(() => {
    // TODO Server should return a more standardized (ISO 8601) date/time string
    const iso8601 = `${isoDateTime.substring(0, 10)}T${isoDateTime.substring(11).replace(" ", "")}`
    return DateTime.fromISO(iso8601).toRelativeCalendar()
  }, [isoDateTime])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Label className={cn("italic", className)}>{timeSince}</Label>
      </TooltipTrigger>
      <TooltipContent align="center">
        {isoDateTime}
      </TooltipContent>
    </Tooltip>
  )
}
