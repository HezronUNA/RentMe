import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        // Botón verde: empieza solo con borde y texto verde
        green: "border border-[#52655B] text-[#52655B] bg-transparent",
        // Botón borde blanco: empieza transparente con borde y texto blanco
        whiteBorder: "border border-white text-white bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
      revealed: {
        false: "",
        true: "",
      },
    },
    compoundVariants: [
      {
        variant: "green",
        revealed: true,
        class: "bg-[#52655B] text-white border-[#52655B]",
      },
      {
        variant: "whiteBorder",
        revealed: true,
        class: "bg-white text-[#52655B] border-white",
      },
    ],
    defaultVariants: {
      variant: "green",
      size: "default",
      revealed: false,
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    revealOnView?: boolean
    revealDelay?: number
  }

export function Button({
  className,
  variant,
  size,
  asChild = false,
  revealOnView = true,
  revealDelay = 200,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  const ref = React.useRef<HTMLButtonElement | null>(null)
  const [revealed, setRevealed] = React.useState(false)

  React.useEffect(() => {
    if (!revealOnView || revealed) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setRevealed(true), revealDelay)
          return () => clearTimeout(t)
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [revealOnView, revealDelay, revealed])

  return (
    <Comp
      ref={ref as any}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, revealed, className }))}
      {...props}
    />
  )
}

export { buttonVariants }
