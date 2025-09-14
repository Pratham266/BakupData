import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";
import { Card, CardContent } from "@/components/ui/card";
import { apiService } from "@/services/api";

interface AuthFormData {
  fullName?: string;
  companyName?: string;
  businessEmail: string;
  password: string;
  phoneNumber?: string;
  acceptedTerms?: boolean;
}

interface AuthPageProps {
  onLogin: () => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      const response = await apiService.signup({
        fullName: data.fullName!,
        companyName: data.companyName!,
        businessEmail: data.businessEmail,
        password: data.password,
        phoneNumber: data.phoneNumber,
        acceptedTerms: data.acceptedTerms!,
      });

      if (response.success) {
        alert("Account created successfully! Please sign in.");
        setIsLogin(true); // Switch to login after successful signup
      } else {
        alert(response.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      const response = await apiService.login({
        businessEmail: data.businessEmail,
        password: data.password,
      });

      if (response.success && response.data) {
        // Store the token in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Call the onLogin prop to trigger navigation to dashboard
        onLogin();
      } else {
        alert(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {isLogin ? "Welcome Back" : "Get Started"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? "Sign in to your business account"
              : "Create your business account to get started"}
          </p>
        </div>

        {/* Auth Form */}
        {isLogin ? (
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        ) : (
          <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
        )}

        {/* Toggle Form */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Button
                variant="outline"
                onClick={() => setIsLogin(!isLogin)}
                disabled={isLoading}
              >
                {isLogin ? "Create Account" : "Sign In"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
