"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from '@/shared/ui/select';
import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose
} from '@/shared/ui/drawer';
import type { Event } from './utils';

interface Props {
  filter: string;
  setFilter: (value: string) => void;
  events: Event[];
  setEvents: (events: Event[]) => void;
}

const FilterAndAdd = ({ filter, setFilter, events, setEvents }: Props) => {
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.type || !newEvent.country || !newEvent.desc) return;
    const newId = Math.max(...events.map(e => e.id)) + 1;
    setEvents([...events, { ...newEvent, id: newId } as Event]);
    setNewEvent({});
  };

  const EventForm = (
    <>
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
        <Calendar
          mode="single"
          selected={undefined}
          onSelect={(date) => {
            if (date) {
              const d = date.getDate().toString().padStart(2, '0');
              const m = (date.getMonth() + 1).toString().padStart(2, '0');
              setNewEvent({ ...newEvent, date: `${d}/${m}` });
            }
          }}
        />
      </div>
    </>
  );

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {/* Filter Select */}
      <Select onValueChange={setFilter} value={filter}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Macro">Macro</SelectItem>
          <SelectItem value="Crypto">Crypto</SelectItem>
          <SelectItem value="Politics">Politics</SelectItem>
        </SelectContent>
      </Select>

      {/* Desktop: Popover */}
      <div className="hidden sm:block">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" /> Add Event
            </Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-4 w-80">
            {EventForm}
            <Button onClick={handleAddEvent}>Add</Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Mobile: Drawer */}
      <div className="sm:hidden block w-full">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="default" className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Add Event
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm p-4">
              <DrawerHeader>
                <DrawerTitle>Add New Event</DrawerTitle>
              </DrawerHeader>
              <div className="space-y-4">
                {EventForm}
              </div>
              <DrawerFooter className="mt-4">
                <Button onClick={handleAddEvent}>Add</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default FilterAndAdd;
