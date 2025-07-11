import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { 
  TrendingUp, 
  Calendar, 
  Camera, 
  Trophy, 
  Target,
  Activity,
  Heart,
  Zap
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import DashboardLayout from "@/components/DashboardLayout";

const Progress = () => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  const weightData = [
    { date: "Week 1", weight: 75, goal: 70 },
    { date: "Week 2", weight: 74.5, goal: 70 },
    { date: "Week 3", weight: 74, goal: 70 },
    { date: "Week 4", weight: 73.2, goal: 70 },
    { date: "Week 5", weight: 72.8, goal: 70 },
    { date: "Week 6", weight: 72.1, goal: 70 },
  ];

  const workoutData = [
    { name: "Strength", sessions: 12, color: "#3b82f6" },
    { name: "Cardio", sessions: 8, color: "#10b981" },
    { name: "Yoga", sessions: 6, color: "#f59e0b" },
    { name: "HIIT", sessions: 4, color: "#ef4444" },
  ];

  const performanceData = [
    { exercise: "Push-ups", week1: 15, week4: 25, week8: 35 },
    { exercise: "Squats", week1: 20, week4: 35, week8: 50 },
    { exercise: "Plank (sec)", week1: 30, week4: 45, week8: 60 },
    { exercise: "Run (km)", week1: 2, week4: 3.5, week8: 5 },
  ];

  const achievements = [
    {
      title: "First Month Complete",
      description: "Completed your first 30 days",
      date: "2 weeks ago",
      icon: Trophy,
      color: "text-yellow-600"
    },
    {
      title: "Consistency King",
      description: "10 workouts in a row",
      date: "1 week ago",
      icon: Target,
      color: "text-blue-600"
    },
    {
      title: "Strength Milestone",
      description: "Lifted 100kg total",
      date: "3 days ago",
      icon: Zap,
      color: "text-orange-600"
    }
  ];

  const progressPhotos = [
    { date: "Start", src: "/placeholder.svg", label: "Day 1" },
    { date: "Month 1", src: "/placeholder.svg", label: "30 Days" },
    { date: "Month 2", src: "/placeholder.svg", label: "60 Days" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t('progressTracking')}</h1>
            <p className="text-muted-foreground">Track your fitness journey and celebrate milestones</p>
          </div>
          <div className="flex items-center space-x-2">
            {["7d", "30d", "90d", "1y"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="body">Body Metrics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="photos">Progress Photos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weight Lost</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.9 kg</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">-8.2%</span> from start
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Workouts Completed</CardTitle>
                  <Activity className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">30</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-blue-600">+25%</span> vs last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Heart Rate</CardTitle>
                  <Heart className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">145 bpm</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">Optimal zone</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Weight Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
                <CardDescription>Your weight journey over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Current Weight"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="goal" 
                      stroke="#10b981" 
                      strokeDasharray="5 5"
                      name="Goal Weight"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Workout Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Workout Distribution</CardTitle>
                <CardDescription>Breakdown of your training sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={workoutData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="sessions"
                      >
                        {workoutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col justify-center space-y-3">
                    {workoutData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-semibold ml-auto">{item.sessions} sessions</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="body" className="space-y-6">
            {/* Body Measurements */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Weight</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold">72.1 kg</div>
                  <p className="text-sm text-green-600">-2.9 kg from start</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Body Fat</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold">18.2%</div>
                  <p className="text-sm text-green-600">-3.1% from start</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Muscle Mass</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold">58.9 kg</div>
                  <p className="text-sm text-blue-600">+1.2 kg from start</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">BMI</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold">22.4</div>
                  <p className="text-sm text-green-600">Normal range</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Improvements */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Improvements</CardTitle>
                <CardDescription>Track your strength and endurance gains</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="exercise" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="week1" fill="#ef4444" name="Week 1" />
                    <Bar dataKey="week4" fill="#f59e0b" name="Week 4" />
                    <Bar dataKey="week8" fill="#10b981" name="Week 8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Recent Achievements</span>
                </CardTitle>
                <CardDescription>Celebrate your fitness milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className={`p-2 rounded-full bg-muted ${achievement.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        <Badge variant="secondary">{achievement.date}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            {/* Progress Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Progress Photos</span>
                </CardTitle>
                <CardDescription>Visual documentation of your transformation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {progressPhotos.map((photo, index) => (
                    <div key={index} className="text-center">
                      <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center">
                        <Camera className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold">{photo.label}</h4>
                      <p className="text-sm text-muted-foreground">{photo.date}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button>
                    <Camera className="h-4 w-4 mr-2" />
                    Add New Photo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Progress;