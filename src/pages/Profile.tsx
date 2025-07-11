import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Camera, 
  Target, 
  Settings,
  Calendar,
  Trophy,
  Heart,
  Scale
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import DashboardLayout from "@/components/DashboardLayout";

const Profile = () => {
  const { t } = useLanguage();

  const fitnessGoals = [
    { name: "Weight Loss", target: "5kg", current: "2.9kg", progress: 58 },
    { name: "Muscle Gain", target: "3kg", current: "1.2kg", progress: 40 },
    { name: "Cardio Endurance", target: "10km run", current: "6km", progress: 60 },
  ];

  const achievements = [
    { name: "First Month", icon: Calendar, earned: true },
    { name: "Consistency", icon: Trophy, earned: true },
    { name: "Strength Milestone", icon: Target, earned: true },
    { name: "Cardio Champion", icon: Heart, earned: false },
    { name: "Weight Goal", icon: Scale, earned: false },
  ];

  const healthMetrics = [
    { label: "Age", value: "28 years" },
    { label: "Height", value: "175 cm" },
    { label: "Current Weight", value: "72.1 kg" },
    { label: "Target Weight", value: "70 kg" },
    { label: "Body Fat", value: "18.2%" },
    { label: "Muscle Mass", value: "58.9 kg" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t('profile')}</h1>
            <p className="text-muted-foreground">Manage your account and fitness profile</p>
          </div>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="goals">Goals & Metrics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-muted-foreground">john.doe@email.com</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">Premium Member</Badge>
                      <Badge variant="outline">Active since Jan 2024</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself and your fitness journey..."
                      defaultValue="Passionate about fitness and healthy living. Looking to build strength and improve overall wellness."
                    />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Health Metrics</CardTitle>
                  <CardDescription>Your current health and fitness metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {healthMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="text-lg font-semibold">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            {/* Current Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Current Fitness Goals</span>
                </CardTitle>
                <CardDescription>Track your progress towards your fitness objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {fitnessGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{goal.name}</h4>
                        <span className="text-sm text-muted-foreground">
                          {goal.current} / {goal.target}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{goal.progress}% complete</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Goal Management */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Goals</CardTitle>
                <CardDescription>Update or add new fitness goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="goalType">Goal Type</Label>
                  <Input id="goalType" placeholder="e.g., Weight Loss, Muscle Gain" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentValue">Current Value</Label>
                    <Input id="currentValue" placeholder="e.g., 72kg" />
                  </div>
                  <div>
                    <Label htmlFor="targetValue">Target Value</Label>
                    <Input id="targetValue" placeholder="e.g., 70kg" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input id="timeline" placeholder="e.g., 3 months" />
                </div>
                <Button className="w-full">Add Goal</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Your Achievements</span>
                </CardTitle>
                <CardDescription>Badges and milestones you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div 
                        key={index} 
                        className={`text-center p-4 border rounded-lg ${
                          achievement.earned 
                            ? 'bg-primary/5 border-primary/20' 
                            : 'bg-muted/50 border-muted opacity-50'
                        }`}
                      >
                        <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          achievement.earned 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h4 className="font-medium text-sm">{achievement.name}</h4>
                        {achievement.earned && (
                          <Badge variant="secondary" className="mt-1 text-xs">Earned</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Privacy Settings</h4>
                      <p className="text-sm text-muted-foreground">Control your data visibility</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Connected Apps</h4>
                      <p className="text-sm text-muted-foreground">Google Calendar, Gmail integration</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" size="sm">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;