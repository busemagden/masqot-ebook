
import { useState } from "react";
import { SignIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const LoginForm = () => {
  return (
    <CardContent className="p-0">
      <SignIn 
        routing="path" 
        path="/login"
        redirectUrl="/my-books"
        appearance={{
          elements: {
            rootBox: "w-full mx-auto",
            card: "shadow-none bg-transparent",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton: "bg-white hover:bg-gray-50",
            formButtonPrimary: "bg-masqot-primary hover:bg-masqot-secondary",
            footerAction: "text-masqot-primary hover:text-masqot-secondary"
          }
        }}
      />
    </CardContent>
  );
};

export default LoginForm;
