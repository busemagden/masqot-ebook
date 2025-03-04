
import { SignUp } from "@clerk/clerk-react";
import { CardContent } from "@/components/ui/card";

const RegisterForm = () => {
  return (
    <CardContent className="p-0">
      <SignUp 
        routing="path" 
        path="/sign-up"
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

export default RegisterForm;
