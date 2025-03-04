
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

interface SocialLoginProps {
  title: string;
}

const SocialLogin = ({ title }: SocialLoginProps) => {
  return (
    <CardContent className="space-y-4">
      <h2 className="text-center text-lg font-medium text-gray-700">{title}</h2>
      <div className="flex flex-col space-y-2">
        <Button variant="outline" className="w-full flex justify-center items-center gap-2">
          <img src="/lovable-uploads/fea74a2b-4ab4-4aeb-8974-b8c5e20a4be3.png" alt="Google" className="w-5 h-5" />
          Google ile devam et
        </Button>
        <Button variant="outline" className="w-full flex justify-center items-center gap-2">
          <img src="/lovable-uploads/b961a2e3-a6b6-467c-b8db-cd837d753cd6.png" alt="Apple" className="w-5 h-5" />
          Apple ile devam et
        </Button>
      </div>
    </CardContent>
  );
};

export default SocialLogin;
