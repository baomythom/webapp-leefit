import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Star, 
  Send, 
  Bell,
  CheckCircle,
  Clock,
  Plus
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import DashboardLayout from "@/components/DashboardLayout";

const Feedback = () => {
  const { t } = useLanguage();
  const [newFeedback, setNewFeedback] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const recentFeedback = [
    {
      id: 1,
      trainer: "Sarah Johnson",
      session: "Full Body Strength Training",
      date: "2 days ago",
      rating: 5,
      comment: "Great session! Sarah pushed me to my limits and I felt really accomplished afterwards. The form corrections were very helpful.",
      trainerResponse: "Thank you John! You did amazing today. Keep up the great work and focus on progressive overload.",
      status: "responded"
    },
    {
      id: 2,
      trainer: "Mike Chen",
      session: "Cardio & HIIT Session",
      date: "1 week ago",
      rating: 4,
      comment: "Intense workout! Could use a bit more warm-up time but overall very effective. Mike's energy is contagious.",
      trainerResponse: null,
      status: "pending"
    },
    {
      id: 3,
      trainer: "Emma Davis",
      session: "Yoga & Flexibility",
      date: "2 weeks ago",
      rating: 5,
      comment: "Perfect for recovery day. Emma's guidance on breathing techniques was excellent. Feeling much more flexible.",
      trainerResponse: "So glad you enjoyed it! Breathing is key to good yoga practice. See you next week!",
      status: "responded"
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "feedback_request",
      message: "Please rate your session with Sarah Johnson",
      time: "2 hours ago",
      status: "unread"
    },
    {
      id: 2,
      type: "trainer_response",
      message: "Mike Chen responded to your feedback",
      time: "1 day ago",
      status: "read"
    },
    {
      id: 3,
      type: "goal_update",
      message: "Weekly progress summary is ready",
      time: "3 days ago",
      status: "read"
    },
    {
      id: 4,
      type: "session_reminder",
      message: "Upcoming session tomorrow at 2:00 PM",
      time: "1 week ago",
      status: "read"
    }
  ];

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'feedback_request': return <MessageSquare className="h-4 w-4" />;
      case 'trainer_response': return <CheckCircle className="h-4 w-4" />;
      case 'goal_update': return <Bell className="h-4 w-4" />;
      case 'session_reminder': return <Clock className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t('feedback')}</h1>
            <p className="text-muted-foreground">Share feedback and stay connected with your trainers</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Feedback
          </Button>
        </div>

        <Tabs defaultValue="feedback" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="feedback">Session Feedback</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="feedback" className="space-y-6">
            {/* New Feedback Form */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Last Session</CardTitle>
                <CardDescription>How was your session with Sarah Johnson today?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Rating</label>
                  {renderStars(selectedRating, true, setSelectedRating)}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Comments</label>
                  <Textarea
                    placeholder="Share your thoughts about the session..."
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Previous Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Previous Feedback</CardTitle>
                <CardDescription>Your session ratings and trainer responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{feedback.trainer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{feedback.session}</h4>
                            <p className="text-sm text-muted-foreground">with {feedback.trainer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {renderStars(feedback.rating)}
                          <p className="text-xs text-muted-foreground mt-1">{feedback.date}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm">{feedback.comment}</p>
                        </div>

                        {feedback.trainerResponse ? (
                          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                            <div className="flex items-center space-x-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="text-xs">{feedback.trainer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{feedback.trainer}</span>
                              <Badge variant="secondary" className="ml-auto">Response</Badge>
                            </div>
                            <p className="text-sm">{feedback.trainerResponse}</p>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Waiting for trainer response</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Recent Notifications</span>
                </CardTitle>
                <CardDescription>Stay updated with your fitness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start space-x-3 p-3 rounded-lg border ${
                        notification.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-background'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        notification.status === 'unread' ? 'bg-blue-100 text-blue-600' : 'bg-muted text-muted-foreground'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                      {notification.status === 'unread' && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Communication Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
                <CardDescription>Manage how you receive updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Session Reminders</h4>
                      <p className="text-sm text-muted-foreground">Get notified before your sessions</p>
                    </div>
                    <Badge variant="secondary">Email + Push</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Trainer Responses</h4>
                      <p className="text-sm text-muted-foreground">When trainers reply to your feedback</p>
                    </div>
                    <Badge variant="secondary">Push Only</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Progress Updates</h4>
                      <p className="text-sm text-muted-foreground">Weekly progress summaries</p>
                    </div>
                    <Badge variant="secondary">Email</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;