import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin, 
  Plus,
  Phone,
  MessageSquare
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import DashboardLayout from "@/components/DashboardLayout";

const Schedule = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const upcomingSessions = [
    {
      id: 1,
      title: "Full Body Strength Training",
      trainer: "Sarah Johnson",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      type: "Virtual",
      status: "confirmed",
      meetLink: "https://meet.google.com/abc-def-ghi"
    },
    {
      id: 2,
      title: "Cardio & HIIT Session",
      trainer: "Mike Chen",
      date: "Tomorrow",
      time: "10:00 AM - 11:00 AM",
      type: "In-person",
      status: "confirmed",
      location: "Downtown Gym - Studio A"
    },
    {
      id: 3,
      title: "Yoga & Flexibility",
      trainer: "Emma Davis",
      date: "Friday",
      time: "6:00 PM - 7:00 PM",
      type: "Virtual",
      status: "pending",
      meetLink: "https://meet.google.com/xyz-uvw-rst"
    },
    {
      id: 4,
      title: "Nutrition Consultation",
      trainer: "David Wilson",
      date: "Saturday",
      time: "11:00 AM - 12:00 PM",
      type: "Virtual",
      status: "confirmed",
      meetLink: "https://meet.google.com/lmn-opq-rst"
    }
  ];

  const todaySchedule = [
    {
      time: "9:00 AM",
      title: "Morning Cardio",
      duration: "30 min",
      type: "personal"
    },
    {
      time: "2:00 PM",
      title: "Full Body Strength Training",
      duration: "60 min",
      type: "session",
      trainer: "Sarah Johnson"
    },
    {
      time: "7:00 PM",
      title: "Evening Stretching",
      duration: "15 min",
      type: "personal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t('schedule')}</h1>
            <p className="text-muted-foreground">Manage your training sessions and appointments</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Book Session
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Calendar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
              />
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Today's Schedule</span>
              </CardTitle>
              <CardDescription>Your activities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="text-sm font-medium w-20">{item.time}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      {item.trainer && (
                        <p className="text-sm text-muted-foreground">with {item.trainer}</p>
                      )}
                    </div>
                    <Badge variant={item.type === 'session' ? 'default' : 'secondary'}>
                      {item.duration}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled training sessions with trainers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{session.title}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {session.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {session.time}
                        </span>
                        {session.type === 'Virtual' ? (
                          <span className="flex items-center">
                            <Video className="h-4 w-4 mr-1" />
                            Virtual
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            In-person
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusColor(session.status)}>
                      {session.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{session.trainer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session.trainer}</p>
                        {session.location && (
                          <p className="text-sm text-muted-foreground">{session.location}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      {session.type === 'Virtual' && session.meetLink && (
                        <Button size="sm">
                          <Video className="h-4 w-4 mr-1" />
                          Join Meeting
                        </Button>
                      )}
                      {session.type === 'In-person' && (
                        <Button size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Call Trainer
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Book New Session</h3>
                <p className="text-sm text-muted-foreground">Schedule with a trainer</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-green-100 rounded-full">
                <CalendarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Reschedule Session</h3>
                <p className="text-sm text-muted-foreground">Change existing booking</p>
              </div>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center space-x-4 p-6">
              <div className="p-3 bg-orange-100 rounded-full">
                <Video className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Virtual Training</h3>
                <p className="text-sm text-muted-foreground">Join online session</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;