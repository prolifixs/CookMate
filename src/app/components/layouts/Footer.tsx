import { ReactNode } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from 'lucide-react';

type FooterProps = {
  children?: ReactNode;
};

export function Footer({ children }: FooterProps) {
  return (
    <div className="flex items-center">
      <Input
        className="flex-1 mr-2"
        placeholder="What would you like to cook today?"
      />
      <Button size="sm">
        <Send className="h-4 w-4" />
      </Button>
      {children}
    </div>
  );
}