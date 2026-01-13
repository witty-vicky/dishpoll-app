"use client";

import users from "./data/users.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "./providers/app-provider";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser, currentUser, isHydrated } = useApp();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isHydrated) return;
    if (currentUser) {
      router.replace("/dashboard");
    }
  }, [currentUser, isHydrated, router]);

  function handleSubmit(e) {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      toast.error("Login Failed", {
        description: "Invalid username or password",
      });
      return;
    }

    setCurrentUser({
      id: user.id,
      username: user.username,
    });

    toast.success("Login Successful 🎉", {
      description: `Welcome back, ${user.username.charAt(0).toUpperCase()}${user.username.slice(1)}!`,
    });

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
