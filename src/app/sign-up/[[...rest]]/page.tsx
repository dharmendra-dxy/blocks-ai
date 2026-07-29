import { SignUp } from "@clerk/nextjs"
import { AuthLayoutShell } from "@/components/auth/auth-layout-shell"

export default function SignUpPage() {
  return (
    <AuthLayoutShell
      title="Create an account"
      description="Get started with Blocks AI."
    >
      <SignUp forceRedirectUrl="/editor" />
    </AuthLayoutShell>
  )
}
