
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const TrainerShowcase = () => {
  const { t } = useLanguage();

  const trainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/lovable-uploads/placeholder-avatar-1.jpg",
      experience: 8,
      rating: 4.9,
      specialties: ["Weight Loss", "Cardio", "Nutrition"],
      bio: "Certified personal trainer specializing in weight loss and cardiovascular health. Helped over 200 clients achieve their fitness goals.",
      available: true
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      avatar: "/lovable-uploads/placeholder-avatar-2.jpg",
      experience: 6,
      rating: 4.8,
      specialties: ["Strength Training", "Bodybuilding", "Sports"],
      bio: "Former competitive athlete turned trainer. Expert in muscle building and strength development.",
      available: true
    },
    {
      id: 3,
      name: "Emma Chen",
      avatar: "/lovable-uploads/placeholder-avatar-3.jpg",
      experience: 5,
      rating: 4.9,
      specialties: ["Yoga", "Flexibility", "Mindfulness"],
      bio: "Certified yoga instructor and wellness coach. Focuses on holistic health and mind-body connection.",
      available: false
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "/lovable-uploads/placeholder-avatar-4.jpg",
      experience: 10,
      rating: 5.0,
      specialties: ["CrossFit", "HIIT", "Functional"],
      bio: "CrossFit Level 3 trainer with a decade of experience in high-intensity functional movements.",
      available: true
    },
    {
      id: 5,
      name: "Lisa Wang",
      avatar: "/lovable-uploads/placeholder-avatar-5.jpg",
      experience: 7,
      rating: 4.7,
      specialties: ["Pilates", "Core", "Rehabilitation"],
      bio: "Physical therapist and Pilates instructor specializing in injury prevention and rehabilitation.",
      available: true
    },
    {
      id: 6,
      name: "Carlos Silva",
      avatar: "/lovable-uploads/placeholder-avatar-6.jpg",
      experience: 9,
      rating: 4.8,
      specialties: ["Boxing", "MMA", "Conditioning"],
      bio: "Former professional boxer teaching combat sports and conditioning for fitness and self-defense.",
      available: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainers.map((trainer) => (
        <Card key={trainer.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <CardHeader className="text-center pb-4">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {trainer.name.split(' ').map(n => n[0]).join('')}
              </div>
              {!trainer.available && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Busy
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{trainer.name}</h3>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span>{trainer.experience} {t('yearsExperience')}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{trainer.rating}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('specialties')}</h4>
              <div className="flex flex-wrap gap-1">
                {trainer.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-3">{trainer.bio}</p>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                {t('viewProfile')}
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
                disabled={!trainer.available}
              >
                <Calendar className="w-4 h-4 mr-1" />
                {t('bookSession')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
