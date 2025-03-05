import { DateTime } from "luxon";
import { useMemo } from "react";
import { classed } from "@tw-classed/react";
import { Tooltip } from "@/components/ui/Tooltips";
import { cn } from "@/lib/utils";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
type TimeSinceProps = {
  isoDateTime: string
  className?: string
}

const TimeSinceBase = classed.span(
  "italic leading-[10px] text-[10px] font-inter text-black-secondary",
);

export function TimeSince({ isoDateTime, className }: TimeSinceProps) {
  const timeSince = useMemo(() => {
    // TODO Server should return a more standardized (ISO 8601) date/time string
    const iso8601 = `${isoDateTime.substring(0, 10)}T${isoDateTime.substring(11).replace(" ", "")}`
    return DateTime.fromISO(iso8601).toRelativeCalendar()
  }, [isoDateTime])

  return (
    <Tooltip content={isoDateTime}>
      <TooltipTrigger asChild>
        <TimeSinceBase className={cn("italic", className)}>{timeSince}</TimeSinceBase>
      </TooltipTrigger>
    </Tooltip>
  )
}
