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

interface EventModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onHandleConfirm?: Function;
  loading?: boolean;
  event?: IEvent;
}

interface FormEvent {
  title: string;
  end: Date;
  start: Date;
  description: string;
}

const EventModal = ({
  event,
  isOpen,
  onClose,
  onOpenChange,
}: EventModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormEvent>({
    defaultValues: {
      title: event?.title || '',
      end: event?.end,
      start: event?.start,
      description: event?.description || '',
    },
  });
  console.log(event);

  const onSave = (event: FormEvent) => {
    console.log(event);
  };

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onChange={onOpenChange}
      onClose={onClose}
      aria-label="modal-event"
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
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit(onSave)} color="secondary">
            Agregar
          </Button>
          <Button color="danger">Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
