import { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { getEventIcon, getEventTypeVariant } from './utils';
import type { Event } from './utils';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { ScrollArea } from '@/shared/ui/scroll-area';

interface Props {
  events: Event[];
}

const MobileDayView = ({ events }: Props) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(today, { weekStartsOn: 1 }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const selectedDateStr = format(selectedDate, 'dd/MM');
  const dayEvents = events.filter(e => e.date === selectedDateStr);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeekStart = addDays(weekStart, direction === 'next' ? 7 : -7);
    setWeekStart(newWeekStart);

    const isSelectedInNewWeek = weekDays.some(day =>
      isSameDay(addDays(newWeekStart, weekDays.indexOf(day)), selectedDate)
    );
    if (!isSelectedInNewWeek) {
      setSelectedDate(newWeekStart);
    }
  };

  const goToToday = () => {
    const todayWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    setWeekStart(todayWeekStart);
    setSelectedDate(today);
  };

  return (
    <div className="sm:hidden flex flex-col bg-background">
      <div className="flex-shrink-0 bg-background border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            {format(selectedDate, 'MMMM yyyy')}
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-primary"
          >
            Today
          </Button>
        </div>

        <div className="flex items-center w-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateWeek('prev')}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex-1 flex gap-1">
            {weekDays.map((day) => {
              const isSelected = isSameDay(day, selectedDate);
              const isDayToday = isToday(day);
              const dayEvents = events.filter(e => e.date === format(day, 'dd/MM'));

              return (
                <button
                  key={day.toISOString()}
                  className={`flex-1 flex flex-col items-center py-2 px-1 rounded-lg transition-all ${
                    isSelected 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <span className={`text-xs font-medium uppercase ${
                    isDayToday && !isSelected ? 'text-primary' : ''
                  }`}>
                    {format(day, 'EEE')}
                  </span>
                  <span className={`text-lg font-semibold ${
                    isDayToday && !isSelected ? 'text-primary' : ''
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className={`w-1 h-1 rounded-full mt-1 ${
                      isSelected 
                        ? 'bg-primary-foreground' 
                        : isDayToday 
                          ? 'bg-primary' 
                          : 'bg-muted-foreground'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateWeek('next')}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">
                {format(selectedDate, 'EEEE d MMMM')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {dayEvents.length === 0 
                  ? 'No events' 
                  : `${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}`
                }
              </p>
            </div>

            {dayEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  No events scheduled for this day
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {dayEvents.map((event) => {
                  const Icon = getEventIcon(event.type);
                  return (
                    <Card 
                      key={event.id} 
                      className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground truncate">
                                {event.name}
                              </h3>
                              <Badge 
                                variant={getEventTypeVariant(event.type)} 
                                className="text-xs flex-shrink-0"
                              >
                                {event.type}
                              </Badge>
                            </div>

                            {event.desc && (
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {event.desc}
                              </p>
                            )}

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>All day</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MobileDayView;
