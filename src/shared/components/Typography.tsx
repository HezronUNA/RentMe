// src/components/ui/typography.tsx
import { cn } from "@/lib/utils" // si no tienes esta utilidad, reemplaza cn(...) por className strings
import * as React from "react"

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
    style={{ fontFamily: 'Playfair Display, serif' }}
      className={cn("scroll-m-20 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-luxury font-light text-white leading-tight uppercase tracking-widest text-center drop-shadow-2xl", className)}
      {...props}
    />
  )
}

export function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
    style={{ fontFamily: 'Playfair Display, serif' }}
      className={cn("text-2xl sm:text-4xl font-semibold tracking-[0.14em] uppercase text-zinc-800 mb-4", className)}
      {...props}
    />
  )
}

export function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight uppercase tracking-wide", className)}
      {...props}
    />
  )
}

export function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

export function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  )
}

export function Blockquote({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props} />
  )
}

export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm", className)}
      {...props}
    />
  )
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props} />
  )
}

export function Large({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props} />
  )
}

export function Small({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm font-medium leading-none", className)} {...props} />
  )
}

export function Muted({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}
