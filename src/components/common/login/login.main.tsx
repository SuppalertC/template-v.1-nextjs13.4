import { Card } from 'antd';
import { ReactElement } from 'react';

interface LoginFormProps {
  email: string;
  password: string;
}

const Login = (props: LoginFormProps): ReactElement => {
  return (
    <>
      <Card></Card>
    </>
  );
};

export default Login;
