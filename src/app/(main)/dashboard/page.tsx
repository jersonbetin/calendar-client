'use client';
import {
  Calendar,
  CalendarProps,
  momentLocalizer,
  View,
} from 'react-big-calendar';
import moment from 'moment';
import { useState } from 'react';
import 'moment/locale/es';
import { IEvent } from '@interfaces/event.interface';
import EventModal from '@/components/dashboard/EventModal';
import { useDisclosure } from '@nextui-org/react';

const localizer = momentLocalizer(moment);

interface ICalendarState {
  view: View;
  date: any;
  events: Array<IEvent>;
}

const controls = {
  week: 'Semana',
  work_week: 'Semana de trabajo',
  day: 'Día',
  month: 'Mes',
  previous: 'Atrás',
  next: 'Después',
  today: 'Hoy',
  agenda: 'El Diario',

  showMore: (total: any) => `+${total} más`,
};
// const initEvent: IEvent = {
//   title: '',
//   description: '',
// };

const Page = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [current, setCurrent] = useState<IEvent | undefined>(undefined);
  const [config, setConfig] = useState<ICalendarState>({
    view: 'month',
    date: moment(),
    events: [
      {
        title: 'Calendar 1',
        start: new Date(2024, 2, 20, 15, 0, 0), //03:00 PM
        end: new Date(2024, 2, 20, 16, 30, 0), //04:30 PM
        description: '123', 
      },
      {
        title: 'Calendar 2 ',
        start: new Date(2024, 2, 21, 12, 30, 0), //08:30 AM
        end: new Date(2024, 2, 21, 18, 0, 0), //18:00 PM
        description: 'dddd', 
      },
      {
        title: 'Calendar 3 ',
        start: new Date(2024, 2, 22, 10, 30, 0), //10:30 AM
        end: new Date(2024, 2, 22, 19, 0, 0), //07:00 PM
        description: '3333', 
      },
      {
        title: 'Calendar 4 ',
        start: new Date(2024, 2, 23, 7, 30, 0), //08:30 AM
        end: new Date(2024, 2, 23, 11, 0, 0), //11:00 AM
        description: 'xxxx', 
      },
    ],
  });

  const onHandleDate = (value: Date) => {
    setConfig({
      ...config,
      date: moment(value),
    });
  };

  const onSelectSlot = (event: any) => {
    const { start, end } = event;
    console.log(event);
    
    setCurrent({
      title: event?.title || '',
      description: event?.description || '',
      start: new Date(start),
      end: moment(end).add(30, 'minutes').toDate(),
    });
    onOpen();
  };

  return (
    <div className="w-full p-12">
      <h1 className="mb-2 text-2xl font-bold">Calendario</h1>
      <Calendar
        culture="es"
        localizer={localizer}
        defaultDate={new Date()}
        view={config.view}
        defaultView={config.view}
        onView={(view) => setConfig({ ...config, view })}
        events={config.events}
        startAccessor="start"
        endAccessor="end"
        className="w-full h-full"
        messages={controls}
        date={config.date}
        onNavigate={onHandleDate}
        onDoubleClickEvent={onSelectSlot}
        onSelectSlot={onSelectSlot}
        selectable
      />
      <EventModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        event={current}
      />
    </div>
  );
};

export default Page;
