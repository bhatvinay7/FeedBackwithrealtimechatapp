import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-cyan-400 selection:text-primary-foreground dark:bg-input/30 outline-0  border-b-[1px] border-t-slate-400 border-l-slate-400 border-r-slate-400 ease-in hover:border-[1px] focus:border-[1px] border-indigo-700 flex h-14 w-full min-w-0 rounded-sm  bg-transparent px-3 py-1 text-base  transition-[color,box-shadow,border] outline-none file:inline-flex file:h-7 file:border-b-[1px] file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
