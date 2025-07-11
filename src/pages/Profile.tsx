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
    { label: "Body Fat", value: "18.2%" },
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">{t('fullName')}</Label>
                      <Input id="fullName" defaultValue="John Doe" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="age">{t('age')}</Label>
                      <Input id="age" type="number" defaultValue="30" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="height">{t('height')}</Label>
                      <Input id="height" defaultValue="175 cm" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="weight">{t('currentWeight')}</Label>
                      <Input id="weight" defaultValue="70 kg" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="bodyFat">{t('bodyFatPercentage')}</Label>
                      <Input id="bodyFat" defaultValue="15%" className="mt-1" />
                    </div>
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Training Package</CardTitle>
                    <CardDescription>Your current training package information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Premium Strength Training</h4>
                        <p className="text-sm text-muted-foreground">Selected Package</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Milestones</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>Week 4: Strength Assessment</span>
                            <Badge variant="secondary" className="text-xs">Completed</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Week 8: Body Composition</span>
                            <Badge variant="outline" className="text-xs">Upcoming</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Week 12: Final Evaluation</span>
                            <Badge variant="outline" className="text-xs">Pending</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Package Validity</p>
                        <p className="text-lg font-semibold mt-1">March 15, 2025</p>
                        <p className="text-sm text-green-600">67 days remaining</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Timezone Settings</CardTitle>
                    <CardDescription>Set your preferred timezone</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <select 
                        id="timezone" 
                        className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md"
                        defaultValue="America/New_York"
                      >
                        <option value="America/New_York">Eastern Time (UTC-5)</option>
                        <option value="America/Chicago">Central Time (UTC-6)</option>
                        <option value="America/Denver">Mountain Time (UTC-7)</option>
                        <option value="America/Los_Angeles">Pacific Time (UTC-8)</option>
                        <option value="UTC">UTC (UTC+0)</option>
                        <option value="Europe/London">London (UTC+0)</option>
                        <option value="Europe/Paris">Paris (UTC+1)</option>
                        <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                        <option value="Asia/Shanghai">Shanghai (UTC+8)</option>
                        <option value="Australia/Sydney">Sydney (UTC+11)</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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