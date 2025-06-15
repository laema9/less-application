// src/components/calendar/CalendarComponent.tsx
import { useState } from 'react';
import Header from './Header';
import FilterAndAdd from './FilterAndAdd';
import CalendarGrid from './CalendarGrid';
import UpcomingEvents from './UpcomingEvents';
import { initialEvents } from './utils';
import type { Event } from './utils';
import MobileDayView from './MobileDayView';


const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1));
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [filter, setFilter] = useState<string>('All');

  return (
    <div className="space-y-6">
      <Header />
      <FilterAndAdd
        filter={filter}
        setFilter={setFilter}
        events={events}
        setEvents={setEvents}
      />
        <div className="hidden sm:block">
        <CalendarGrid
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            events={events}
            filter={filter}
        />
        </div>

        <div className="block sm:hidden">
        <MobileDayView events={events} />
        </div>

      <UpcomingEvents events={events} />
    </div>
  );
};

export default CalendarComponent;
