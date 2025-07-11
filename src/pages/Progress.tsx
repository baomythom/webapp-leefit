import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { 
  TrendingUp, 
  Camera, 
  Plus
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import DashboardLayout from "@/components/DashboardLayout";

const Progress = () => {
  const { t } = useLanguage();
  const [newWeight, setNewWeight] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [weightData, setWeightData] = useState([
    { date: "2024-01-01", weight: 75 },
    { date: "2024-01-08", weight: 74.5 },
    { date: "2024-01-15", weight: 74 },
    { date: "2024-01-22", weight: 73.2 },
    { date: "2024-01-29", weight: 72.8 },
    { date: "2024-02-05", weight: 72.1 },
  ]);

  const handleAddWeight = () => {
    if (newWeight && selectedDate) {
      const newEntry = {
        date: selectedDate,
        weight: parseFloat(newWeight)
      };
      setWeightData([...weightData, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      setNewWeight("");
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  };


  const progressPhotos = [
    { date: "Start", src: "/placeholder.svg", label: "Day 1" },
    { date: "Month 1", src: "/placeholder.svg", label: "30 Days" },
    { date: "Month 2", src: "/placeholder.svg", label: "60 Days" },
  ];

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t('progressTracking')}</h1>
            <p className="text-muted-foreground">Track your fitness journey and celebrate milestones</p>
          </div>
        </div>

        <Tabs defaultValue="weight-tracking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weight-tracking">Weight Tracking</TabsTrigger>
            <TabsTrigger value="photos">Progress Photos</TabsTrigger>
          </TabsList>

          <TabsContent value="weight-tracking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weight Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {t('weightProgress')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="weight" stroke="#2563eb" name={t('weight')} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Manual Weight Entry */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {t('addWeightEntry')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="weight">{t('weight')} (kg)</Label>
                    <Input 
                      id="weight" 
                      type="number" 
                      placeholder="Enter weight"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">{t('date')}</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddWeight} className="w-full">
                    {t('addEntry')}
                  </Button>
                </CardContent>
              </Card>
            </div>
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