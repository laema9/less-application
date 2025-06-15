import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Badge } from '@/shared/ui/badge';
import { getEventIcon, getEventTypeVariant, getCountryFlag } from './utils';
import type { Event } from './utils';

interface Props {
  events: Event[];
}

const UpcomingEvents = ({ events }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Events</CardTitle>
        <CardDescription>Full list of upcoming events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event, index) => {
          const Icon = getEventIcon(event.type);

          return (
            <div key={event.id}>
              {/* Desktop version */}
              <div className="hidden sm:block">
                <Card className="p-4 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg border">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{event.name}</h4>
                        <span className="text-lg">{getCountryFlag(event.country)}</span>
                        <Badge variant={getEventTypeVariant(event.type)}>{event.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.desc}</p>
                    </div>
                    <div className="text-sm font-medium">{event.date}</div>
                  </div>
                </Card>
              </div>

              {/* Mobile version */}
              <div className="block sm:hidden">
                <Card className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg border">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between w-full">
                        <h4 className="text-sm font-medium truncate">{event.name}</h4>
                        <span className="text-xs">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getEventTypeVariant(event.type)} className="text-[10px]">
                          {event.type}
                        </Badge>
                        <span className="text-xs">{getCountryFlag(event.country)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {index < events.length - 1 && <Separator className="my-2" />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
