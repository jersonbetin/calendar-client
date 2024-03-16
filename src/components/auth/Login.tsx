import { Button, Input, Link } from "@nextui-org/react"
import { Dispatch } from "react";


interface LoginProps {
  onChangePage: Dispatch<string>;
}

const Login = ({onChangePage}:LoginProps) => {
  return (<form className="flex flex-col justify-between h-full">
  <div className="flex flex-col gap-3">
    <Input
      isRequired
      label="Email"
      placeholder="Enter your email"
      type="email"
    />
    <Input
      isRequired
      label="Contraseña"
      placeholder="Ingrese Contraseña"
      type="password"
    />
    <Input
      isRequired
      label="Confirmar contraseña"
      placeholder="Ingrese Contraseña"
      type="password"
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
      <Button fullWidth color="secondary">
        Login
      </Button>
    </div>
  </div>
</form>)
}

export default Login;