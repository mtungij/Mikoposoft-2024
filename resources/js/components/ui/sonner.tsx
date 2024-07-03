import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-blue-950 group-[.toaster]:border-blue-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-blue-950 dark:group-[.toaster]:text-blue-50 dark:group-[.toaster]:border-blue-800",
          description: "group-[.toast]:text-blue-500 dark:group-[.toast]:text-blue-400",
          actionButton:
            "group-[.toast]:bg-blue-900 group-[.toast]:text-blue-50 dark:group-[.toast]:bg-blue-50 dark:group-[.toast]:text-blue-900",
          cancelButton:
            "group-[.toast]:bg-blue-100 group-[.toast]:text-blue-500 dark:group-[.toast]:bg-blue-800 dark:group-[.toast]:text-blue-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
