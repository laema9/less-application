// src/components/calendar/CalendarGrid.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { getEventIcon, getEventTypeVariant, getCountryFlag } from './utils';
import type { Event } from './utils';
 
interface Props {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  events: Event[];
  filter: string;
}

const CalendarGrid = ({ currentDate, setCurrentDate, events, filter }: Props) => {
  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const getEventsForDate = (day: number) => {
    const dayStr = String(day).padStart(2, '0');
    const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dateStr = `${dayStr}/${monthStr}`;
    return events.filter(
      (event) => event.date === dateStr && (filter === 'All' || event.type === filter)
    );
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="hidden sm:grid grid-cols-7 border-b">
          {dayNames.map((day) => (
            <div key={day} className="p-4 text-center text-sm font-medium text-muted-foreground bg-muted/50">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-7">
          {calendarDays.map((day, index) => {
            const dayEvents = day ? getEventsForDate(day) : [];
            const isToday =
              day === new Date().getDate() &&
              currentDate.getMonth() === new Date().getMonth() &&
              currentDate.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={index}
                className={`min-h-[120px] border-r border-b p-2 ${day ? 'hover:bg-muted/50' : 'bg-muted/20'} transition-colors`}
              >
                {day && (
                  <>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                        isToday ? 'bg-primary text-primary-foreground' : 'text-foreground'
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.map((event) => {
                        const Icon = getEventIcon(event.type);
                        return (
                          <Card key={event.id} className="p-2 cursor-pointer hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-1 mb-1">
                              <Icon className="w-3 h-3" />
                              <span className="text-xs font-medium truncate flex-1">{event.name}</span>
                              <span className="text-sm">{getCountryFlag(event.country)}</span>
                            </div>
                            <Badge variant={getEventTypeVariant(event.type)} className="text-xs h-4">
                              {event.type}
                            </Badge>
                          </Card>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarGrid;
