import { Button, Input, Link } from '@nextui-org/react';
import { Dispatch, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { authService } from '@services/index';
import toast from 'react-hot-toast';

interface SignUpProps {
  onChangePage: Dispatch<string>;
}

interface InputForm {
  email: string;
  password: string;
  checkPassword: string;
}

const SignUp = ({ onChangePage }: SignUpProps) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<InputForm>({
    defaultValues: { email: '', password: '', checkPassword: '' },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const password = watch('password');

  const onSignUp = async (data: InputForm) => {
    setLoading(true);
    try {
      await authService.signUp(data);

      toast.success('Usuario creado con exito, ya puede hacer login');
      onChangePage('login');
    } catch (error: any) {
      if (error?.response?.data?.message?.indexOf('exist') > -1) {
        toast.error(`El email ${data.email} ya esta en uso`);
      } else {
        toast.error('Error al intentar crear el usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-3">
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'Debe ingresar un email' },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: 'Debe ser un email valido',
            },
            validate: () => {
              return errors?.email?.type !== 'manual';
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              label="Email"
              placeholder="Ingrese su correo"
              startContent={
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-sm w-[14px] h-[14px] leading-3 mb-0.5"
                />
              }
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
              classNames={{ input: 'bg-[inherit]' }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'Debe ingresar una contraseña' },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              startContent={
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-sm w-[14px] h-[14px] leading-3 mb-0.5"
                />
              }
              autoComplete="new-password"
              classNames={{ input: 'bg-[inherit]' }}
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          name="checkPassword"
          control={control}
          rules={{
            validate: (_, values) => {
              return (
                values?.checkPassword === password ||
                'las contraseñas no son iguales'
              );
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="Repita la contraseña"
              placeholder="Ingrese su contraseña"
              startContent={
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-sm w-[14px] h-[14px] leading-3 mb-0.5"
                />
              }
              classNames={{ input: 'bg-[inherit]' }}
              isInvalid={errors.checkPassword !== undefined}
              errorMessage={errors.checkPassword?.message}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-center text-small">
          Ya tienes un usuario?
          <Link
            size="sm"
            className="ml-2 cursor-pointer"
            onPress={() => onChangePage('login')}
          >
            Login
          </Link>
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            color="secondary"
            fullWidth
            onClick={handleSubmit(onSignUp)}
            isLoading={loading}
          >
            Sign up
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
