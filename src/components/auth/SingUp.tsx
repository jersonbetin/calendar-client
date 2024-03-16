import { Button, Input, Link } from '@nextui-org/react';
import { Dispatch } from 'react';

interface SignUpProps {
  onChangePage: Dispatch<string>;
}

const SignUp = ({ onChangePage }: SignUpProps) => {
  return (
    <form className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-3">
        <Input
          isRequired
          label="Email"
          placeholder="Enter your email"
          type="email"
        />
        <Input
          isRequired
          label="Password"
          placeholder="Enter your password"
          type="password"
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
          <Button color="secondary" fullWidth>
            Sign up
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
