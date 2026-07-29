import { SignIn } from "@clerk/nextjs"
import { AuthLayoutShell } from "@/components/auth/auth-layout-shell"

export default function SignInPage() {
  return (
    <AuthLayoutShell
      title="Welcome back"
      description="Sign in to your account to continue."
    >
      <SignIn forceRedirectUrl="/editor" />
    </AuthLayoutShell>
  )
}
