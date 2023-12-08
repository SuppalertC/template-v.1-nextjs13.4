/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  ListTable - Content
 */

import { Button, Card, Col, Form, Row, Space, Tabs } from 'antd';
import Link from 'next/link';
import { ReactElement } from 'react';

import { InputSearch } from '../input-search';
import { Table } from '../table';
import { ListTableProps } from './list-table.model';

const ListTable = <T extends unknown>(props: ListTableProps.Content<T>): ReactElement => {
  return (
    <>
      <div>
        <div className="w-[100vw] h-full bg-white relative bottom-[21px] right-[18px]">
          <Row>
            <Col span={24} className=" pl-4 flex justify-start">
              <span className="text-[32px]"> router back section </span>
            </Col>
            <Col span={24}>
              <Tabs defaultActiveKey="1" onTabClick={props.onClickTaps} className="pb-0 pl-4 pr-4">
                {props.turnOnTap &&
                  props.taps?.map((tap) => {
                    return (
                      <Tabs.TabPane
                        tab={
                          <Space>
                            {tap.label}
                            {tap.badge}
                          </Space>
                        }
                        key={tap.key}
                      ></Tabs.TabPane>
                    );
                  })}
              </Tabs>
            </Col>
          </Row>
        </div>
        <Card title={props.title} headStyle={{ textAlign: 'start' }}>
          {renderFilters(props)}
        </Card>
      </div>

      <div className="m-4 p-2 bg-white rounded-sm shadow-md overflow-x-auto">
        <Row gutter={[8, 8]} align={'middle'} justify={'center'}>
          <Col span={24}>{renderTable(props)}</Col>
        </Row>
      </div>
    </>
  );
};
const renderLabeldashboard = <T extends unknown>(props: ListTableProps.Content<T>): ReactElement => {
  return (
    <Row justify={'space-between'}>
      <Col>
        <Row gutter={[12, 8]} className="pb-4">
          {props.dashboardList &&
            props.dashboardList.map((dashboard: any, idx: number) => {
              return (
                <Col span={dashboard.span} key={idx}>
                  <div
                    className=" w-[fit-content] h-[110px] border-[#BFBFBF]
               rounded-lg border-[0.5px] border-solid border-4
               flex p-6 items-center"
                  >
                    <ul>
                      <p className="text-[#8F8F8F] font-normal text-[14px] text-left">{dashboard.title}</p>
                      <p className="font-bold text-black text-[30px] text-left">{dashboard.value}</p>
                    </ul>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Col>
    </Row>
  );
};
const renderFilters = <T extends unknown>(props: ListTableProps.Content<T>): ReactElement => {
  return (
    <Form name="filter" form={props.form} layout="vertical" onFinish={props.onSubmitSearch} className="mb-4">
      {renderLabeldashboard(props)}
      <Row align={'middle'} justify={'start'} gutter={[4, 4]}>
        {props.filters.map((filter, index) => {
          return (
            <Col span={filter.span ? filter.span : 8} key={index}>
              <Form.Item name={filter.name} label={filter.label} className="mb-0">
                {filter.input}
              </Form.Item>
            </Col>
          );
        })}
        <Col span={12}>
          <Form.Item name={'q'} label={'-'} className="[&>.ant-form-item-row>.ant-form-item-label]:opacity-0 mb-0">
            {props.hiddenScopes ? <></> : <InputSearch scopes={props.scopes} setScopes={props.setScopes} onSubmit={props.onSearch} />}
          </Form.Item>
        </Col>
        {!props.hiddenFilters && (
          <Col flex="auto" className="text-right">
            <Form.Item label={'-'} className="[&>.ant-form-item-row>.ant-form-item-label]:opacity-0 mb-0">
              <Button htmlType="submit">Search</Button>
              <Button type="link" onClick={props?.onClearSearch}>
                Clear
              </Button>
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};

const renderAction = <T extends unknown>(props: ListTableProps.Content<T>) => {
  return (
    <Row align={'middle'} justify={'end'} gutter={[8, 8]}>
      <Col>
        {props.hideCreateButton ? null : (
          <Button onClick={(e) => e.stopPropagation()}>
            <Link href={'/dashboard'}>Create</Link>
          </Button>
        )}
      </Col>
    </Row>
  );
};

const renderTable = <T extends unknown>(props: ListTableProps.Content<T>): ReactElement => {
  return (
    <Table
      rowKey={'id'} /// selected key  collect
      columns={props.columns || []}
      dataSource={props.dataSource || []}
      scroll={props.scroll}
      page={props.page}
      pageSize={props.pageSize}
      total={props.total}
      loading={props.loading}
      onChangePage={props.onChangePage}
      onChangePageSize={props.onChangePageSize}
      onSortChange={props.onSortChange}
      rowSelectable={props?.rowSelectable} // open mode row select
      selectedKeys={props?.selectedKeys} // array key
      onSelectChange={props?.onSelectChange} // onchange to set collect data
    />
  );
};

export default ListTable;
