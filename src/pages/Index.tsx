
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Users, TrendingUp, Globe, Award, CheckCircle } from "lucide-react";
import { OnboardingSurvey } from "@/components/OnboardingSurvey";
import { TrainerShowcase } from "@/components/TrainerShowcase";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const [showSurvey, setShowSurvey] = useState(false);
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t('expertTrainers'),
      description: t('expertTrainersDesc')
    },
    {
      icon: Calendar,
      title: t('smartScheduling'),
      description: t('smartSchedulingDesc')
    },
    {
      icon: TrendingUp,
      title: t('progressTracking'),
      description: t('progressTrackingDesc')
    },
    {
      icon: Award,
      title: t('personalizedPrograms'),
      description: t('personalizedProgramsDesc')
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: t('fitnessEnthusiast'),
      content: t('testimonial1'),
      rating: 5
    },
    {
      name: "Mike Chen",
      role: t('businessman'),
      content: t('testimonial2'),
      rating: 5
    },
    {
      name: "Emma Davis",
      role: t('personalTrainer'),
      content: t('testimonial3'),
      rating: 5
    }
  ];

  if (showSurvey) {
    return <OnboardingSurvey onComplete={() => setShowSurvey(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">FITTR</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">{t('features')}</a>
            <a href="#trainers" className="text-gray-600 hover:text-blue-600 transition-colors">{t('trainers')}</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">{t('testimonials')}</a>
            <LanguageToggle />
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageToggle className="md:hidden" />
            <Button variant="outline" className="hidden md:inline-flex">
              {t('signIn')}
            </Button>
            <Button 
              onClick={() => setShowSurvey(true)}
              className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
            >
              {t('getStarted')}
            </Button>
            <Button variant="outline" className="ml-2">
              <a href="/dashboard">Enter Dashboard</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Globe className="w-4 h-4 mr-2" />
            {t('globalPlatform')}
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {t('heroTitle')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
              {t('heroTitleHighlight')}
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {t('heroDescription')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => setShowSurvey(true)}
              className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-lg px-8 py-4"
            >
              {t('startYourJourney')}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              {t('watchDemo')}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-gray-600">{t('activeUsers')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">500+</div>
              <div className="text-gray-600">{t('certifiedTrainers')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-gray-600">{t('successRate')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whyChooseUs')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('whyChooseUsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('meetOurTrainers')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('meetOurTrainersDesc')}
            </p>
          </div>
          <TrainerShowcase />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('whatClientsSay')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('whatClientsSayDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t('readyToStart')}</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('readyToStartDesc')}
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowSurvey(true)}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
          >
            {t('beginAssessment')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-2xl font-bold">FITTR</span>
              </div>
              <p className="text-gray-400">{t('footerDescription')}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('platform')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{t('features')}</li>
                <li>{t('trainers')}</li>
                <li>{t('programs')}</li>
                <li>{t('pricing')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('support')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{t('helpCenter')}</li>
                <li>{t('contact')}</li>
                <li>{t('community')}</li>
                <li>{t('blog')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('legal')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{t('privacy')}</li>
                <li>{t('terms')}</li>
                <li>{t('cookies')}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FITTR. {t('allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
