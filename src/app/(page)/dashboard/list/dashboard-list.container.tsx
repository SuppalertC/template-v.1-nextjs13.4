'use client';
import { Badge, Form, Popconfirm, Select, Space, Switch, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

import { MouseEvent, useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import ListTable from 'src/components/common/list-table';
import { AnnouncementListProps } from './dashboard-list.model';

const currentDate = dayjs().toISOString();
const taps: Array<any> = [
  {
    key: '1',
    label: `ALL`,
    badge: <Badge />,
  },
  {
    key: '2',
    label: `Schedule`,
    badge: <Badge />,
  },
  {
    key: '3',
    label: `Ongoing`,
    badge: <Badge />,
  },
  {
    key: '4',
    label: `End`,
    badge: <Badge />,
  },
  {
    key: '5',
    label: `Inactive`,
    badge: <Badge />,
  },
];

const filters = [
  {
    name: 'find',
    label: 'ค้นหา',
    input: <Select options={[{ value: '1', label: 'test' }]} style={{ width: '100%' }} />,
    span: 4,
  },
  {
    name: 'find',
    label: 'ค้นหา',
    input: <Select options={[{ value: '1', label: 'test' }]} style={{ width: '100%' }} />,
    span: 4,
  },
  {
    name: 'find',
    label: 'ค้นหา',
    input: <Select options={[{ value: '1', label: 'test' }]} style={{ width: '100%' }} />,
    span: 4,
  },
  {
    name: 'find',
    label: 'ค้นหา',
    input: <Select options={[{ value: '1', label: 'test' }]} style={{ width: '100%' }} />,
    span: 4,
  },
  {
    name: 'find',
    label: 'ค้นหา',
    input: <Select options={[{ value: '1', label: 'test' }]} style={{ width: '100%' }} />,
    span: 4,
  },
  {
    name: 'find',
    label: 'ค้นหา',
    input: <Select options={[{ value: '1', label: 'test' }]} style={{ width: '100%' }} />,
    span: 4,
  },
];

const filterScopes: Array<any> = [
  {
    label: 'id',
    value: 'id',
    valueType: 'number',
  },
  {
    label: 'type',
    value: 'type',
    valueType: 'string',
  },
];

const columns = (props: any): ColumnsType<any> => [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'Id',
    sorter: (a, b) => a.id - b.id,
    ellipsis: true,
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: 'Type',
  },
  {
    key: 'message',
    dataIndex: 'message',
    title: 'Message',
  },
  // {
  //   key: 'isDeleted',
  //   dataIndex: 'isDeleted',
  //   title: 'isDeleted',
  //   render: (text: string, record: any) => {
  //     return (<Switch checked={record.isDeleted} />)
  //   }
  // },
  {
    key: 'isActive',
    dataIndex: 'isActive',
    title: 'IsActive',
    render: (text: string, record: any) => {
      return <Switch checked={record.isActive} />;
    },
  },
  {
    key: 'startActiveAt',
    dataIndex: 'startActiveAt',
    title: 'StartActiveAt',
    render: (text: string, record: any) => {
      const localStartActiveAt = dayjs(record.startActiveAt).locale('th').format('DD/MM/YYYY | HH:mm:ss');
      return <span>{localStartActiveAt}</span>;
    },
  },
  {
    key: 'endActiveAt',
    dataIndex: 'endActiveAt',
    title: 'EndActiveAt',
    render: (text: string, record: any) => {
      const localEndActiveAt = dayjs(record.endActiveAt).locale('th').format('DD/MM/YYYY | HH:mm:ss');
      return <span>{localEndActiveAt}</span>;
    },
  },
  // {
  //   key: 'updatedAt',
  //   dataIndex: 'updatedAt',
  //   title: 'updatedAt',
  // },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    render: (text: string, record: any) => {
      return (
        <Space size={'middle'}>
          <Link href={`/announcement/view/${record?.id}`}>รายละเอียด</Link>
          <Link href={`/announcement/${record?.id}`}>แก้ไข</Link>
          <Popconfirm
            title={'ลบ'}
            description={'คุณแน่ใจที่จะลบหรือไหม'}
            onConfirm={() => props?.onClickRemove(record.id)}
            onCancel={props?.onCancelRemove}
            okText={'Yes'}
            cancelText={'No'}
          >
            <Link href={`/announcement}`}>ลบ</Link>
          </Popconfirm>
        </Space>
      );
    },
  },
];

const defaultCrudQuery: any = {
  orderBy: [{ createdAt: 'desc' }],
  where: { AND: [{ isDeleted: false }] },
};

const createLink = 'announcement/create';

const DashboardListContainer = (props: AnnouncementListProps.Container) => {
  /** Hook section */
  const router = useRouter();
  const [form] = Form.useForm();
  const [scopes, setScopes] = useState<Array<any>>([]);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  const [crudQuery, setCrudQuery] = useState<any>(defaultCrudQuery);
  const [dataSource, setDataSource] = useState<Array<any>>([]);

  useEffect(() => {
    setCrudQuery({ ...crudQuery, page: page, pageSize: pageSize });
  }, [page, pageSize]);

  const callService = async () => {
    setCrudQuery({ ...defaultCrudQuery });
  };

  /** Functionality section */

  const onSearch = async (args: any) => {
    //
    const conditions = args.scope.map((scope: any) => {
      return {
        [scope.toString()]:
          filterScopes.filter((s) => s.value === scope.toString())[0].valueType === 'number' ? parseInt(args.text) : args.text,
      };
    });
    let crudQuery: any = {};
    if (args.text) {
      crudQuery = {
        where: {
          OR: [...conditions],
          AND: [{ isDeleted: false }],
        },
      };
    }
    setCrudQuery({ ...crudQuery, ...defaultCrudQuery });
  };

  const onClickAdd = () => {
    //
  };

  const onClickEdit = (id: number) => {
    //
  };

  const onClickRemove = async (id: number) => {};

  const onCancelRemove = (e?: MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };

  const onChangePage = (changedPage: number) => {
    setPage(changedPage);
  };
  const onChangePageSize = (changedPageSize: number) => {
    setPageSize(changedPageSize);
  };

  const onClearSearch = () => {
    form?.resetFields();
    setCrudQuery({ ...defaultCrudQuery });
  };
  const onSubmitSearch = (values: any) => {};

  return (
    <ListTable
      title={'Announcement'}
      page={page}
      pageSize={pageSize}
      columns={columns({ onClickRemove, onCancelRemove })}
      dataSource={[]}
      createLink={createLink}
      filters={filters}
      form={form}
      turnOnTap={true}
      taps={taps}
      total={0}
      onSubmitSearch={onSubmitSearch}
      onClearSearch={onClearSearch}
      scopes={filterScopes}
      setScopes={setScopes}
      onSearch={onSearch}
      onClickAdd={onClickAdd}
      onClickRemove={onClickRemove}
      onChangePage={onChangePage}
      onChangePageSize={onChangePageSize}
      hiddenScopes={true}
    />
  );
};

export default DashboardListContainer;
