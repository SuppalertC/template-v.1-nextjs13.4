'use client ';
import { Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { FormContent, ItempFormProps } from 'src/components/common';

interface fieldProp {
  [key: string]: Array<ItempFormProps>;
}

const fields = (props: any): Array<fieldProp> => [
  {
    เข้าสู่ระบบ: [
      {
        label: 'อีเมล',
        name: 'email',
        input: <Input placeholder={'ระบุอีเมล'} style={{ paddingLeft: 20 }} minLength={13} maxLength={64} />,
        // rules: [
        //   {
        //     type: 'email',
        //     message: 'The input is not valid E-mail!',
        //   },
        //   {
        //     required: true,
        //     message: 'Please input your E-mail!',
        //   },
        // ],
      },
      {
        label: 'รหัสผา่น',
        name: 'password',
        input: <Input.Password placeholder={'รหัสผ่าน'} minLength={2} maxLength={64} color="red" />,
        // rules: [{ required: true, message: 'Please input your password' }],
      },
    ],
  },
];

export default function LoginFeature() {
  const router = useRouter();
  const [form] = Form.useForm<any>();
  const onSubmitForm = (values: unknown) => {
    router.replace('/dashboard');
  };
  return (
    <FormContent
      title="Login"
      form={form}
      onSubmitForm={onSubmitForm}
      fields={fields}
      supTitle={'ยินดีต้อนรับเข้าสู่ระบบใช้งาน Unai'}
      buttonCategory="register"
      showForgotPassword={true}
    />
  );
}
