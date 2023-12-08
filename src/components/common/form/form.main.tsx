import { Button, Col, Form, FormInstance, Row, Typography, FormItemProps as fip } from 'antd';
import { BaseButtonProps } from 'antd/es/button/button';
import Link from 'next/link';
import React, { ReactElement } from 'react';

export interface ItempFormProps extends fip {
  label?: string;
  name: string;
  className?: string;
  hide?: boolean;
  boolean?: boolean;
  input: ReactElement;
  value?: string;
  colSpan?: number;
  wrapSpan?: number;
  dataPossessionList?: any;
}

interface FormContentProps {
  viewFull?: boolean;
  title: string;
  permissionTitle?: string;
  labelButton?: string;
  showButton?: boolean;
  form: FormInstance;
  modeEdit?: boolean;
  fields?: any; //any//Array<any>;
  onClickEditButton?: () => void;
  layoutFields?: any;
  permissionFields?: (props?: any) => Array<any>;
  disableFields?: Array<string>;
  hiddenFields?: Array<string>;
  hiddenButton?: boolean;
  generatedPdfList?: any;
  onSubmitForm?: (values: any) => void;
  onClickHiddenDeleteButton?: () => void;
  spanSize?: number;
  colSpanButton?: number;
  supTitle?: string;
  showForgotPassword?: boolean;
  buttonCategory?: 'register' | 'save';
}
interface mergeBaseButtonAntdProps extends BaseButtonProps {
  label: string;
  htmlType: 'button' | 'submit' | 'reset' | undefined;
}
const buttonList: { [key: string]: Array<mergeBaseButtonAntdProps> } = {
  ['save']: [
    {
      label: 'บันทึก',
      type: 'primary',
      htmlType: undefined,
      className: 'bg-bg-primary text-[#ffffff]',
      size: 'large',
    },
    {
      label: 'ยกเลิก',
      type: 'primary',
      htmlType: undefined,
      className: 'bg-bg-primary text-[#ffffff]',
      size: 'large',
    },
  ],
  ['register']: [
    {
      label: 'เข้าสู่ระบบ',
      type: 'primary',
      htmlType: 'submit',
      className: 'bg-bg-primary text-[#ffffff]',
      size: 'large',
    },
  ],
};

export const FormContent = (props: FormContentProps) => {
  return (
    <div className=" h-[auto] p-2">
      <InputFormContainer {...props} />
    </div>
  );
};

const InputFormContainer = (props: FormContentProps) => {
  let onSelectButtonStyle: Array<any> = props.buttonCategory ? buttonList[props.buttonCategory] : buttonList['save'];
  return (
    <Form
      form={props.form}
      layout={'horizontal'}
      onFinish={props.onSubmitForm}
      className="w-full"
      scrollToFirstError={{
        behavior: 'smooth',
        skipOverflowHiddenElements: true,
        block: 'center',
        scrollMode: 'always',
        inline: 'center',
      }}
      autoComplete="off"
    >
      <Row gutter={[0, 4]}>
        <Col>
          <Row>
            {props.fields({}).map((category: { [key: string]: any }, categoryIdx: number) => {
              const key: any = Object.keys(category);
              const formPropElement = category[key].map((f: ItempFormProps, formidx: number) => {
                let colSpan: number = f.colSpan || 24;
                let isDisabled = props.disableFields?.includes(f.name);
                let isHidden = props.hiddenFields?.includes(f.name);
                if (isHidden) return;
                return (
                  <>
                    <Col span={colSpan} key={`field-col${formidx}`}>
                      {renderformList(props, f, isDisabled, formidx)}
                    </Col>
                  </>
                );
              });
              return (
                <>
                  <Col key={`field-title${categoryIdx}`} span={24} className="flex flex-col">
                    <Typography.Text className="text-base text-title-pilot font-semibold text-black ">{key}</Typography.Text>

                    {props.supTitle && (
                      <Typography.Text className="text-[14px] text-title-pilot font-light mb-2 text-[#a1a1aa]">
                        {props.supTitle}
                      </Typography.Text>
                    )}
                  </Col>
                  {formPropElement}
                </>
              );
            })}
          </Row>

          <Row>
            <Col span={24} className="mb-5">
              {props.showForgotPassword && (
                <Link href={'/forgotted-password'} className=" text-[#1473e6]">
                  ลืมรหัสผ่าน
                </Link>
              )}
            </Col>
          </Row>
          {!props.showButton && (
            <Row align={'middle'} justify={'start'}>
              <Col span={props.colSpanButton || 24}>
                {onSelectButtonStyle.map((button: mergeBaseButtonAntdProps, idx) => (
                  <Form.Item key={`form${idx}`}>
                    <Button
                      type={button.type}
                      htmlType={button.htmlType}
                      className={button.className}
                      size={button.size}
                      key={`button${idx}`}
                      color="#6f2f83"
                      block
                    >
                      {button.label}
                    </Button>
                  </Form.Item>
                ))}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Form>
  );
};

const renderformList = (props: any, f: ItempFormProps, isDisabled?: boolean, index?: number) => {
  return (
    <>
      <Row>
        <Col span={24}>{!f.hide && <span className="text-[14px] text-font-primary font-medium">{f.label}</span>}</Col>
      </Row>
      <Form.Item
        wrapperCol={{ span: f.wrapSpan || 24 }}
        name={f.name}
        className={f.className}
        key={`roles${index}`}
        noStyle={f.hide}
        colon={false}
        rules={f.rules}
        getValueFromEvent={f.valuePropName === 'fileList' ? getValueFromEvent : f.getValueFromEvent}
        valuePropName={f.boolean ? 'checked' : f.valuePropName ? f.valuePropName : 'value'}
      >
        {React.cloneElement(f.input, { disabled: isDisabled })}
        {/* {f.input === 'status' ? <>true</> : <>false</>} */}
      </Form.Item>
    </>
  );
};

const getValueFromEvent = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
