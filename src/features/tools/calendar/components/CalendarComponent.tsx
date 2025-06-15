import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, TrendingUp, Globe, Users, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

interface Event {
  id: number;
  type: 'Macro' | 'Crypto' | 'Politics';
  country: string;
  name: string;
  date: string;
  desc: string;
}

const initialEvents: Event[] = [
  { id: 1, type: 'Macro', country: 'USA', name: 'US Inflation Rate', date: '15/06', desc: 'Forecast: 2.4%' },
  { id: 2, type: 'Crypto', country: 'World', name: 'Bitcoin Halving', date: '18/06', desc: '7th Bitcoin halving' },
  { id: 3, type: 'Macro', country: 'USA', name: 'US Inflation Rate', date: '22/06', desc: 'Forecast: 2.4%' },
  { id: 4, type: 'Politics', country: 'USA', name: 'Trump VS Joe Biden FFA', date: '27/06', desc: 'Prediction: Joe Wins' },
];

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1));
  const [events, setEvents] = useState(initialEvents);
  const [filter, setFilter] = useState<string>('All');
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  const getEventTypeVariant = (type: string) => {
    switch (type) {
      case 'Macro': return 'default';
      case 'Crypto': return 'secondary';
      case 'Politics': return 'outline';
      default: return 'default';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Macro': return <TrendingUp className="w-3 h-3" />;
      case 'Crypto': return <Globe className="w-3 h-3" />;
      case 'Politics': return <Users className="w-3 h-3" />;
      default: return <CalendarIcon className="w-3 h-3" />;
    }
  };

  const getCountryFlag = (country: string) => {
    switch (country) {
      case 'USA': return '🇺🇸';
      case 'World': return '🌍';
      default: return '🏳️';
    }
  };

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

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

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.type || !newEvent.country || !newEvent.desc) return;
    const newId = Math.max(...events.map((e) => e.id)) + 1;
    setEvents([...events, { ...newEvent, id: newId } as Event]);
    setNewEvent({});
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Economic Calendar</h1>
          <p className="text-muted-foreground">Track key economic and political events</p>
        </div>

      </div>

      <div className='flex gap-4'>
        <Select onValueChange={setFilter}>
            <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Macro">Macro</SelectItem>
            <SelectItem value="Crypto">Crypto</SelectItem>
            <SelectItem value="Politics">Politics</SelectItem>
            </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" /> Add Event
            </Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-4 w-80">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={newEvent.name || ''} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={newEvent.desc || ''} onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input value={newEvent.country || ''} onChange={(e) => setNewEvent({ ...newEvent, country: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select onValueChange={(value) => setNewEvent({ ...newEvent, type: value as Event['type'] })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Macro">Macro</SelectItem>
                  <SelectItem value="Crypto">Crypto</SelectItem>
                  <SelectItem value="Politics">Politics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Calendar mode="single" selected={undefined} onSelect={(date) => {
                if (date) {
                  const d = date.getDate().toString().padStart(2, '0');
                  const m = (date.getMonth() + 1).toString().padStart(2, '0');
                  setNewEvent({ ...newEvent, date: `${d}/${m}` });
                }
              }} />
            </div>
            <Button onClick={handleAddEvent}>Add</Button>
          </PopoverContent>
        </Popover>
      </div>
      
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
            {/* Days of the week */}
            <div className="grid grid-cols-7 border-b">
            {dayNames.map((day) => (
                <div key={day} className="p-4 text-center text-sm font-medium text-muted-foreground bg-muted/50">
                {day}
                </div>
            ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
                const dayEvents = day ? getEventsForDate(day) : [];
                const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

                return (
                <div
                    key={index}
                    className={`min-h-[120px] border-r border-b p-2 ${
                    day ? 'hover:bg-muted/50' : 'bg-muted/20'
                    } transition-colors`}
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
                        {dayEvents.map((event) => (
                            <Card key={event.id} className="p-2 cursor-pointer hover:shadow-sm transition-shadow">
                            <div className="flex items-center gap-1 mb-1">
                                {getEventIcon(event.type)}
                                <span className="text-xs font-medium truncate flex-1">{event.name}</span>
                                <span className="text-sm">{getCountryFlag(event.country)}</span>
                            </div>
                            <Badge variant={getEventTypeVariant(event.type)} className="text-xs h-4">
                                {event.type}
                            </Badge>
                            </Card>
                        ))}
                        </div>
                    </>
                    )}
                </div>
                );
            })}
            </div>
        </CardContent>
        </Card>

        <Card>
        <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
            <CardDescription>Full list of upcoming events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {events.map((event, index) => (
            <div key={event.id}>
                <Card className="p-4 hover:shadow-sm transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg border">
                    {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <h4 className="font-medium">{event.name}</h4>
                        <span className="text-lg">{getCountryFlag(event.country)}</span>
                        <Badge variant={getEventTypeVariant(event.type)}>{event.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.desc}</p>
                    </div>
                    <div className="text-sm font-medium">
                    {event.date}
                    </div>
                </div>
                </Card>
                {index < events.length - 1 && <Separator className="my-2" />}
            </div>
            ))}
        </CardContent>
        </Card>


    </div>
  );
};

export default CalendarComponent;
