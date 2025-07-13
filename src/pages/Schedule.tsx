import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import DashboardLayout from "@/components/DashboardLayout";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";
import { vi } from "date-fns/locale";

const Schedule = () => {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<string>("monthly");
  const [selectedSlots, setSelectedSlots] = useState<{[key: string]: string[]}>({});
  const [selectedDayForModal, setSelectedDayForModal] = useState<Date | null>(null);

  const timeSlots = ["Sáng", "Chiều", "Tối"];

  const handleDateClick = (date: Date) => {
    if (calendarView === "monthly") {
      setSelectedDayForModal(date);
    }
  };

  const handleTimeSlotSelect = (date: Date, timeSlot: string) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const currentSlots = selectedSlots[dateKey] || [];
    
    if (currentSlots.includes(timeSlot)) {
      // Remove the time slot
      setSelectedSlots(prev => ({
        ...prev,
        [dateKey]: currentSlots.filter(slot => slot !== timeSlot)
      }));
    } else {
      // Add the time slot
      setSelectedSlots(prev => ({
        ...prev,
        [dateKey]: [...currentSlots, timeSlot]
      }));
    }
  };

  const handleModalTimeSelect = (timeSlot: string) => {
    if (selectedDayForModal) {
      handleTimeSlotSelect(selectedDayForModal, timeSlot);
    }
  };

  const clearAllSelections = () => {
    setSelectedSlots({});
  };

  const confirmSchedule = () => {
    // Handle schedule confirmation
    console.log("Confirmed schedule:", selectedSlots);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => direction === 'prev' ? subWeeks(prev, 1) : addWeeks(prev, 1));
  };

  const getDaySlots = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return selectedSlots[dateKey] || [];
  };

  const hasSlots = (date: Date) => {
    return getDaySlots(date).length > 0;
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const weekDays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    return (
      <div className="w-full">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy', { locale: vi })}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Week day headers */}
          {weekDays.map(day => (
            <div key={day} className="p-2 text-center font-medium text-sm bg-muted rounded-lg">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map(day => {
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const daySlots = getDaySlots(day);
            const hasBookings = daySlots.length > 0;

            return (
              <Dialog key={day.toString()}>
                <DialogTrigger asChild>
                  <div
                    className={`
                      p-2 h-16 border rounded-lg cursor-pointer transition-all
                      ${isCurrentMonth ? 'bg-background hover:bg-accent' : 'bg-muted text-muted-foreground'}
                      ${isToday ? 'ring-2 ring-primary' : ''}
                      ${hasBookings ? 'bg-primary/10 border-primary' : ''}
                    `}
                    onClick={() => handleDateClick(day)}
                  >
                    <div className="text-sm font-medium">
                      {format(day, 'd')}
                    </div>
                    {hasBookings && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {daySlots.map(slot => (
                          <div key={slot} className="w-2 h-2 bg-primary rounded-full"></div>
                        ))}
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      Chọn thời gian tập - {format(day, 'dd/MM/yyyy')}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-3 py-4">
                    {timeSlots.map(slot => {
                      const isSelected = getDaySlots(day).includes(slot);
                      return (
                        <Button
                          key={slot}
                          variant={isSelected ? "default" : "outline"}
                          className="h-12 text-lg"
                          onClick={() => {
                            handleModalTimeSelect(slot);
                            setSelectedDayForModal(day);
                          }}
                        >
                          {slot}
                        </Button>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="w-full">
        {/* Week navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek('prev')}
            className="p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {format(weekStart, 'dd/MM', { locale: vi })} - {format(weekEnd, 'dd/MM/yyyy', { locale: vi })}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateWeek('next')}
            className="p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Week grid */}
        <div className="grid grid-cols-7 gap-4">
          {days.map(day => {
            const isToday = isSameDay(day, new Date());
            const daySlots = getDaySlots(day);

            return (
              <div key={day.toString()} className="flex flex-col">
                {/* Day header */}
                <div className={`text-center p-2 rounded-lg mb-2 ${isToday ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <div className="text-xs font-medium">
                    {format(day, 'EEE', { locale: vi })}
                  </div>
                  <div className="text-lg font-bold">
                    {format(day, 'd')}
                  </div>
                </div>

                {/* Time slots */}
                <div className="space-y-2 flex-1">
                  {timeSlots.map(slot => {
                    const isSelected = daySlots.includes(slot);
                    return (
                      <Button
                        key={slot}
                        variant={isSelected ? "default" : "outline"}
                        className="w-full h-16 text-sm"
                        onClick={() => handleTimeSlotSelect(day, slot)}
                      >
                        {slot}
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Lịch tập</h1>
          <p className="text-muted-foreground">Lập kế hoạch tập luyện của bạn</p>
        </div>

        {/* Calendar */}
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5" />
                <span>Lịch tập</span>
              </CardTitle>
              <ToggleGroup type="single" value={calendarView} onValueChange={setCalendarView}>
                <ToggleGroupItem value="weekly" size="sm">Tuần</ToggleGroupItem>
                <ToggleGroupItem value="monthly" size="sm">Tháng</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {calendarView === "monthly" ? renderMonthView() : renderWeekView()}
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={confirmSchedule} size="lg" className="px-8">
            Xác nhận lịch tập
          </Button>
          <Button onClick={clearAllSelections} variant="outline" size="lg" className="px-8">
            Hủy bỏ
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;