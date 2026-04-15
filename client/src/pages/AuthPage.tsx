import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, isLoginPending, isRegisterPending } = useAuth();
  const { toast } = useToast();

  const isPending = isLoginPending || isRegisterPending;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (mode === "login") {
        await login({ email, password });
        toast({ title: "Welcome back!" });
      } else {
        await register({ email, password });
        toast({ title: "Account created!", description: "You're now logged in." });
      }
    } catch (err: any) {
      toast({
        title: mode === "login" ? "Login failed" : "Registration failed",
        description: err?.message ?? "Something went wrong",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <svg aria-label="Year Ahead" viewBox="0 0 32 32" width="32" height="32" fill="none">
              <rect x="2" y="6" width="28" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
              <path d="M2 12h28" stroke="currentColor" strokeWidth="2" />
              <rect x="8" y="2" width="2" height="6" rx="1" fill="currentColor" />
              <rect x="22" y="2" width="2" height="6" rx="1" fill="currentColor" />
            </svg>
          </div>
          <CardTitle className="text-xl">Year Ahead</CardTitle>
          <CardDescription>
            {mode === "login" ? "Sign in to your account" : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder={mode === "register" ? "At least 8 characters" : ""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                minLength={mode === "register" ? 8 : undefined}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <a href="/api/auth/google" className="block w-full">
            <Button type="button" variant="outline" className="w-full gap-2">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>
          </a>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>Don&apos;t have an account?{" "}
                <button onClick={() => setMode("register")} className="underline text-foreground hover:text-primary">
                  Sign up
                </button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => setMode("login")} className="underline text-foreground hover:text-primary">
                  Sign in
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
