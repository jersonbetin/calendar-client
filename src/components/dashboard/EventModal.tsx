import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Textarea,
} from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { IEvent } from '@interfaces/event.interface';
import { useEffect } from 'react';
import DatePicker from 'react-tailwindcss-datetimepicker';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faCancel, faTrash } from '@fortawesome/free-solid-svg-icons';

// import 'react-tailwindcss-datetimepicker/style.css';

// import moment from 'moment';

interface EventModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onHandleConfirm?: Function;
  event?: IEvent;
  onSave: Function;
  onUpdate?: Function;
  onDelete: Function;
  saveLoading?: boolean;
  deleteLoading?: boolean;
}

interface FormEvent {
  title: string;
  date: {
    end: Date;
    start: Date;
  };
  description: string;
}

const EventModal = ({
  event,
  isOpen,
  onClose,
  onOpenChange,
  onSave,
  saveLoading,
  deleteLoading,
  onDelete,
  onUpdate,
}: EventModalProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormEvent>({
    defaultValues: {
      title: event?.title || '',
      date: {
        end: event?.endDate,
        start: event?.startDate,
      },
      description: event?.description || '',
    },
  });
  const now = new Date();

  const onHandleSave = (current: FormEvent) => {
    const data: IEvent = {
      title: current?.title,
      startDate: current.date.start,
      endDate: current.date.end,
      description: current?.description,
    };
    if (event?.id) {
      onUpdate?.({ id: event.id, ...data });
    } else {
      onSave(data);
    }
  };

  useEffect(() => {
    setValue('title', event?.title || '');
    setValue('description', event?.description || '');
    setValue('date', {
      end: event?.endDate || new Date(),
      start: event?.startDate || new Date(),
    });
  }, [event]);

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      // onChange={onOpenChange}
      onClose={onClose}
      placement="top"
      aria-label="modal-event"
      backdrop="blur"
      classNames={{ base: 'overflow-y-visible' }}
    >
      <ModalContent className="p-3">
        <ModalHeader className="justify-center">Formulario Evento</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-6">
            <Controller
              name="title"
              control={control}
              rules={{
                required: { value: true, message: 'Debe ingresar un titulo' },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Titulo"
                  placeholder="Ingrese el titulo del evento"
                  classNames={{ input: 'bg-[inherit]' }}
                  isInvalid={errors.title !== undefined}
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  type="text"
                  label="Descripcion"
                  placeholder="Ingrese descripcion"
                  classNames={{ input: 'bg-[inherit]' }}
                  isInvalid={errors.description !== undefined}
                  errorMessage={errors.description?.message}
                />
              )}
            />
            <Controller
              name="date"
              control={control}
              rules={{
                required: { value: true, message: 'Debe ingresar un titulo' },
              }}
              render={({ field }) => (
                <DatePicker
                  ranges={{
                    Today: [
                      field.value?.start || new Date(),
                      field.value?.end || new Date(),
                    ],
                    'Last 30 Days': [
                      new Date(
                        now.getFullYear(),
                        now.getMonth() - 1,
                        now.getDate(),
                        0,
                        0,
                        0,
                        0,
                      ),
                      new Date(field.value?.end || ''),
                    ],
                  }}
                  twelveHoursClock
                  displayMaxDate
                  classNames={{ rootContainer: '!z-[1000000000]' }}
                  start={field.value?.start || new Date()}
                  end={field.value?.end || new Date()}
                  applyCallback={(startDate: Date, endDate: Date) => {
                    field.onChange({
                      end: endDate,
                      start: startDate,
                    });
                  }}
                >
                  <Input
                    label="Fecha"
                    type="text"
                    name="end-start"
                    isReadOnly
                    value={`${moment(field.value?.start).format(
                      'DD/MM/YYYY hh:mm:ss',
                    )} - ${moment(field.value?.end).format(
                      'DD/MM/YYYY hh:mm:ss',
                    )}`}
                  />
                </DatePicker>
              )}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSubmit(onHandleSave)}
            color="secondary"
            isLoading={saveLoading}
            startContent={<FontAwesomeIcon icon={faCalendar} />}
          >
            {event?.id ? 'Update' : 'Agregar'}
          </Button>
          {event?.id && (
            <Button
              color="danger"
              isLoading={deleteLoading}
              onClick={() => {
                onDelete(event.id);
              }}
              startContent={<FontAwesomeIcon icon={faTrash} />}
            >
              Eliminar
            </Button>
          )}
          <Button
            color="primary"
            onClick={onClose}
            startContent={<FontAwesomeIcon icon={faCancel} />}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
