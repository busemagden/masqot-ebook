
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="container mx-auto px-4 py-16 mb-8">
      <div className="glass-card rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-serif font-bold text-masqot-dark mb-6">
          Hemen Başlayın
        </h2>
        <p className="text-lg text-masqot-secondary mb-8 max-w-2xl mx-auto">
          E-kitaplarımıza erişmek için hesap oluşturun ve yapay zeka dünyasını keşfetmeye başlayın.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login">
            <Button
              className="bg-masqot-primary hover:bg-masqot-secondary text-white px-6 py-2 text-sm rounded-md transition-all duration-300 w-full sm:w-auto"
            >
              <User className="mr-2 h-4 w-4" />
              Hesap Oluştur
            </Button>
          </Link>
          <a href="https://chat.whatsapp.com/G4tshtPS1RE64PEecc3QWc" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-50 px-6 py-2 text-sm rounded-md transition-all duration-300 w-full sm:w-auto"
            >
              <Users className="mr-2 h-4 w-4" />
              WhatsApp Grubuna Katıl
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
