
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

interface OnboardingSurveyProps {
  onComplete: () => void;
}

export const OnboardingSurvey = ({ onComplete }: OnboardingSurveyProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [answers, setAnswers] = useState({
    fitnessExperience: '',
    primaryGoal: '',
    preferredGender: '',
    weeklyCommitment: [2],
    healthConcerns: ''
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    console.log("Submitting survey answers:", answers);
    
    try {
      // Here you would typically send to your webhook
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsCompleted(true);
      toast.success(t('surveyCompleted'));
      
      setTimeout(() => {
        onComplete();
      }, 3000);
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error("Error submitting survey. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1: return answers.fitnessExperience !== '';
      case 2: return answers.primaryGoal !== '';
      case 3: return answers.preferredGender !== '';
      case 4: return true; // Slider always has a value
      case 5: return true; // Health concerns is optional
      default: return false;
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('surveyCompleted')}</h2>
            <p className="text-gray-600">Redirecting you back...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('surveyTitle')}</h1>
          <p className="text-gray-600">{t('surveyDescription')}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentStep === 1 && t('fitnessExperience')}
              {currentStep === 2 && t('primaryGoal')}
              {currentStep === 3 && t('preferredGender')}
              {currentStep === 4 && t('weeklyCommitment')}
              {currentStep === 5 && t('healthConcerns')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Fitness Experience */}
            {currentStep === 1 && (
              <RadioGroup
                value={answers.fitnessExperience}
                onValueChange={(value) => setAnswers({...answers, fitnessExperience: value})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new">{t('newToFitness')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="returning" id="returning" />
                  <Label htmlFor="returning">{t('returningToFitness')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">{t('currentlyActive')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enthusiast" id="enthusiast" />
                  <Label htmlFor="enthusiast">{t('fitnessEnthusiastLevel')}</Label>
                </div>
              </RadioGroup>
            )}

            {/* Step 2: Primary Goal */}
            {currentStep === 2 && (
              <RadioGroup
                value={answers.primaryGoal}
                onValueChange={(value) => setAnswers({...answers, primaryGoal: value})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lose_weight" id="lose_weight" />
                  <Label htmlFor="lose_weight">{t('loseWeight')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="build_muscle" id="build_muscle" />
                  <Label htmlFor="build_muscle">{t('buildMuscle')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="improve_cardio" id="improve_cardio" />
                  <Label htmlFor="improve_cardio">{t('improveCardio')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general_fitness" id="general_fitness" />
                  <Label htmlFor="general_fitness">{t('generalFitness')}</Label>
                </div>
              </RadioGroup>
            )}

            {/* Step 3: Preferred Gender */}
            {currentStep === 3 && (
              <RadioGroup
                value={answers.preferredGender}
                onValueChange={(value) => setAnswers({...answers, preferredGender: value})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">{t('male')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">{t('noPreference')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no_preference" id="no_preference" />
                  <Label htmlFor="no_preference">{t('noPreference')}</Label>
                </div>
              </RadioGroup>
            )}

            {/* Step 4: Weekly Commitment */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-blue-600">
                    {answers.weeklyCommitment[0]}
                  </span>
                  <span className="text-gray-600 ml-2">{t('sessions')}</span>
                </div>
                <Slider
                  value={answers.weeklyCommitment}
                  onValueChange={(value) => setAnswers({...answers, weeklyCommitment: value})}
                  max={7}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>1</span>
                  <span>7</span>
                </div>
              </div>
            )}

            {/* Step 5: Health Concerns */}
            {currentStep === 5 && (
              <Textarea
                placeholder={t('healthConcernsPlaceholder')}
                value={answers.healthConcerns}
                onChange={(e) => setAnswers({...answers, healthConcerns: e.target.value})}
                className="min-h-[100px]"
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isStepComplete() || isSubmitting}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600"
          >
            <span>{currentStep === totalSteps ? (isSubmitting ? 'Submitting...' : t('submitSurvey')) : 'Next'}</span>
            {currentStep < totalSteps && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
