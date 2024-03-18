'use client';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import moment from 'moment';
import {
  Calendar,
  CalendarProps,
  momentLocalizer,
  View,
} from 'react-big-calendar';

import 'moment/locale/es';
import { IEvent } from '@interfaces/event.interface';
import EventModal from '@components/dashboard/EventModal';
import { eventService } from '@/services';
import toast from 'react-hot-toast';

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

const Page = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [saving, setSaving] = useState<boolean>();
  const [deleting, setDeleting] = useState<boolean>();
  const [current, setCurrent] = useState<IEvent | undefined>(undefined);
  const [config, setConfig] = useState<ICalendarState>({
    view: 'month',
    date: moment(),
    events: [],
  });

  const onHandleDate = async (value: Date, view: View) => {
    try {
      const response = await eventService.getEvents({
        start: moment(value).startOf('month').toDate(),
        end: moment(value).endOf('month').toDate(),
      });
      setConfig({
        ...config,
        events: response,
        date: moment(value),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onSelectSlot = (event: any) => {
    const { start } = event;

    setCurrent({
      id: event.id,
      title: event?.title || '',
      description: event?.description || '',
      startDate: new Date(start),
      endDate: moment(start).add(30, 'minutes').toDate(),
    });
    onOpen();
  };

  const getEvents = async (
    start = moment().startOf('month').toDate(),
    end = moment().endOf('month').toDate(),
  ) => {
    try {
      const response = await eventService.getEvents({ start, end });
      setConfig({
        ...config,
        events: response,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onHandleSave = async (event: IEvent) => {
    setSaving(true);
    try {
      const response = await eventService.saveEvents(event);
      setConfig({
        ...config,
        events: [...config.events, response],
      });

      onClose();
      toast.success('Evento guardado con exito');
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };

  const onHandleUpdate = async (event: IEvent) => {
    setSaving(true);
    try {
      const response = await eventService.updateEvents(event);
      setConfig({
        ...config,
        events: [
          ...config.events.filter((item) => item.id !== event.id),
          response,
        ],
      });

      onClose();
      toast.success('Evento actualizado con exito');
    } catch (e) {
      console.log(e);
    } finally {
      setSaving(false);
    }
  };

  const onHandleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await eventService.deleteEvent(id);
      setConfig({
        ...config,
        events: config.events.filter((event) => event.id !== id),
      });
      onClose();
      toast.success('Evento eliminado con exito');
    } catch (e) {
      console.log(e);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="w-full p-12">
      <h1 className="mb-2 text-2xl font-bold">Calendario</h1>
      <Calendar
        culture="es"
        localizer={localizer}
        defaultDate={new Date()}
        view={config.view}
        defaultView={config.view}
        onView={(view) => {
          setConfig({ ...config, view });
        }}
        events={config.events.map((event: IEvent) => ({
          ...event,
          start: moment(event.startDate).toDate(),
          end: moment(event.endDate).toDate(),
        }))}
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
        onSave={onHandleSave}
        saveLoading={saving}
        onDelete={onHandleDelete}
        deleteLoading={deleting}
        onUpdate={onHandleUpdate}
      />
    </div>
  );
};

export default Page;
