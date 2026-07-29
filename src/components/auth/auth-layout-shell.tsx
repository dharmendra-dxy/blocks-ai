import Image from "next/image"

interface AuthLayoutShellProps {
  children: React.ReactNode
  title: string
  description: string
}

const features = [
  "Real-time collaborative canvas",
  "AI-powered system design",
  "Instant spec generation",
]

export function AuthLayoutShell({ children, title, description }: AuthLayoutShellProps) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-center px-16 lg:flex">
        <div className="max-w-sm">
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="Blocks AI"
              height={48}
              width={48}
            />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            Blocks AI
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Design systems visually. Generate specs instantly.
          </p>
          <ul className="mt-8 space-y-3">
            {features.map((feature) => (
              <li
                key={feature}
                className="text-sm text-muted-foreground"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h2 className="mb-1 text-xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            {description}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}
