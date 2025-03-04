
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, GraduationCap, Users } from "lucide-react";

const LearningPaths = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-masqot-dark mb-4">
          Öğrenme Yolculuğunuz
        </h2>
        <p className="text-masqot-secondary max-w-2xl mx-auto">
          MASQOT ekosistemi ile dijital dönüşüm yolculuğunuzda size eşlik ediyoruz
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-masqot-soft/50">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-masqot-soft p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-masqot-primary" />
            </div>
            <h3 className="text-xl font-serif font-bold text-masqot-dark">E-Kitaplar</h3>
            <p className="text-masqot-secondary">
              Kapsamlı ve pratik içeriklerle dolu e-kitaplarımızla başlayın
            </p>
            <Link to="/catalog">
              <Button
                variant="outline"
                className="border-masqot-primary text-masqot-primary hover:bg-masqot-soft mt-2 text-sm"
              >
                Kitapları Keşfet
              </Button>
            </Link>
          </div>
        </Card>
        
        <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-masqot-soft/50">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-masqot-soft p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-masqot-primary" />
            </div>
            <h3 className="text-xl font-serif font-bold text-masqot-dark">Academy</h3>
            <p className="text-masqot-secondary">
              Video dersler ve interaktif içeriklerle öğrenmeye devam edin
            </p>
            <a href="https://academy.masqot.co" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-masqot-primary text-masqot-primary hover:bg-masqot-soft mt-2 text-sm"
              >
                Academy'yi Ziyaret Et
              </Button>
            </a>
          </div>
        </Card>
        
        <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-masqot-soft/50">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-masqot-soft p-3 rounded-full">
              <Users className="h-6 w-6 text-masqot-primary" />
            </div>
            <h3 className="text-xl font-serif font-bold text-masqot-dark">Topluluk</h3>
            <p className="text-masqot-secondary">
              WhatsApp topluluğumuza katılarak destek alın ve güncel kalın
            </p>
            <a href="https://chat.whatsapp.com/G4tshtPS1RE64PEecc3QWc" target="_blank" rel="noopener noreferrer">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white mt-2 text-sm"
              >
                Topluluğa Katıl
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LearningPaths;
