import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Clock,
  Users,
  Award,
  Activity,
  Zap
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('totalSessions'),
      value: "24",
      change: "+12%",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: t('goalProgress'),
      value: "68%",
      change: "+8%",
      icon: Target,
      color: "text-green-600"
    },
    {
      title: t('activeStreak'),
      value: "12 days",
      change: "+3 days",
      icon: Zap,
      color: "text-orange-600"
    },
    {
      title: t('nextSession'),
      value: "Tomorrow",
      change: "2:00 PM",
      icon: Clock,
      color: "text-purple-600"
    }
  ];

  const recentActivities = [
    {
      type: "workout",
      title: "Full Body Strength Training",
      time: "2 hours ago",
      trainer: "Sarah Johnson",
      duration: "45 min"
    },
    {
      type: "goal",
      title: "Weight Loss Goal Updated",
      time: "1 day ago",
      target: "5kg in 3 months"
    },
    {
      type: "achievement",
      title: "Consistency Badge Earned",
      time: "2 days ago",
      description: "Completed 10 sessions in a row"
    }
  ];

  const upcomingSessions = [
    {
      time: "Tomorrow 2:00 PM",
      title: "Cardio & HIIT",
      trainer: "Mike Chen",
      type: "Virtual"
    },
    {
      time: "Friday 10:00 AM",
      title: "Yoga & Flexibility",
      trainer: "Emma Davis",
      type: "In-person"
    },
    {
      time: "Saturday 9:00 AM",
      title: "Strength Training",
      trainer: "Sarah Johnson",
      type: "Virtual"
    }
  ];

  return (
    <DashboardLayout>
      <div>
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-primary-foreground">
          <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-primary-foreground/80">Ready for your next workout? You're doing great this week!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last week
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>{t('recentActivity')}</span>
              </CardTitle>
              <CardDescription>Your latest fitness activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 border-b pb-3 last:border-b-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'workout' ? 'bg-blue-500' :
                      activity.type === 'goal' ? 'bg-green-500' : 'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      {activity.trainer && (
                        <p className="text-xs text-muted-foreground">with {activity.trainer}</p>
                      )}
                    </div>
                    {activity.duration && (
                      <Badge variant="secondary">{activity.duration}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{t('upcomingSessions')}</span>
              </CardTitle>
              <CardDescription>Your scheduled training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{session.title}</p>
                      <p className="text-xs text-muted-foreground">{session.time}</p>
                      <p className="text-xs text-muted-foreground">with {session.trainer}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={session.type === 'Virtual' ? 'default' : 'secondary'}>
                        {session.type}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Goal Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>{t('weeklyGoals')}</span>
            </CardTitle>
            <CardDescription>Track your weekly fitness goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Workout Sessions</span>
                  <span>3/5 completed</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Calories Burned</span>
                  <span>1,800/2,500 kcal</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Active Minutes</span>
                  <span>240/300 min</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;