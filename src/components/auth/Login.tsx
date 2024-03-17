import { Dispatch, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Link } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import Cookie from 'js-cookie';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { IAuthData, ILoginData } from '@interfaces/auth.interface';
import { authService } from '@services/index';
import { TOKEN_COOKIE } from '@utils/constants';

interface LoginProps {
  onChangePage: Dispatch<string>;
}

const Login = ({ onChangePage }: LoginProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthData>({
    defaultValues: { email: '', password: '' },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { push } = useRouter();

  const onLogin = async (data: IAuthData) => {
    setLoading(true);
    try {
      const response: ILoginData = await authService.login(data);
      Cookie.set(TOKEN_COOKIE, response.token);

      push('/dashboard');
      toast.success('Bienvenido!!');
    } catch (error: any) {
      toast.error('Usuario o contraseña invalidos');
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
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              name="email-123"
              label="Email"
              placeholder="Ingrese su correo"
              autoComplete="off"
              classNames={{ input: 'bg-[inherit]' }}
              startContent={
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-sm w-[14px] h-[14px] leading-3 mb-0.5"
                />
              }
              isInvalid={errors.email !== undefined}
              errorMessage={errors.email?.message}
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
              type={isVisible ? 'text' : 'password'}
              label="Contraseña"
              autoComplete="new-password"
              placeholder="Ingrese su contraseña"
              classNames={{ input: 'bg-[inherit]' }}
              startContent={
                <FontAwesomeIcon
                  icon={faLock}
                  className="text-sm w-[14px] h-[14px] leading-3 mb-0.5"
                />
              }
              endContent={
                <FontAwesomeIcon
                  icon={isVisible ? faEyeSlash : faEye}
                  className="text-sm w-[14px] h-[14px] leading-3 mb-0.5 cursor-pointer"
                  onClick={() => setIsVisible((val: boolean) => !val)}
                />
              }
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
            />
          )}
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-center text-small">
          No tienes contraseña?
          <Link
            size="sm"
            className="ml-2 cursor-pointer"
            onPress={() => onChangePage('sign-up')}
          >
            Sign up
          </Link>
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            fullWidth
            color="secondary"
            onClick={handleSubmit(onLogin)}
            isLoading={loading}
          >
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Login;
