import {
  Button,
  Card,
  CardBody,
  Tab,
  Tabs,
  Input,
  Link,
} from '@nextui-org/react';
import { useState } from 'react';
import SignUp from './SingUp';
import Login from './login';

const AuthorizationPanel = () => {
  const [selected, setSelected] = useState<string>('login');

  return (
    <Card shadow="lg" className="max-w-full w-[340px] h-[450px]">
      <CardBody className="overflow-hidden">
        <Tabs
          fullWidth
          color="secondary"
          size="lg"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={(key: any) => setSelected(key)}
        >
          <Tab key="login" title="Login" className="h-full">
            <Login onChangePage={setSelected} />
          </Tab>
          <Tab key="sign-up" title="Sign up" className="h-full">
            <SignUp onChangePage={setSelected}/>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default AuthorizationPanel;
