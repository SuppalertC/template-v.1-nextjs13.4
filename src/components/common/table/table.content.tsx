/**
 *  Table - Content
 */

import { Table } from 'antd';
import type { ReactElement } from 'react';

import type { ITableProps } from './table.model';

const TableContent = <RecordType extends object>(
  props: ITableProps.Content<RecordType>
): ReactElement => {
  return (
    <Table<RecordType>
      rowKey={props.rowKey}
      bordered={false}
      showSorterTooltip
      // style={{ overflow: 'hidden' }}
      // className={''}
      tableLayout={'auto'}
      size={'middle'}
      // title={() => ''}
      // footer={undefined}
      scroll={props.scroll}
      loading={props.loading}
      columns={props.columns}
      dataSource={props.dataSource}
      expandable={
        props.rowExapandable
          ? {
              rowExpandable: props.resolveRowExpandable,
              expandedRowRender: props.resolveExpansionContent,
            }
          : undefined
      }
      rowSelection={
        props.rowSelectable
          ? {
              selectedRowKeys: props.selectedKeys || [],
              onChange: props.onRowSelectionChange,
            }
          : undefined
      }
      onChange={(_pagination, _filter, sorter, { action }) => {
        if (action === 'sort') {
          if (!Array.isArray(sorter)) {
            /** Only 1 column sort at a time */
            props.onTableSort(sorter);
          }
        }
      }}
      pagination={{
        hideOnSinglePage: false,
        current: props.page || 1,
        pageSize: props.pageSize || 10,
        pageSizeOptions: [10, 25, 50, 100],
        total: props.total || 0,
        position: props.paginationPosition || ['bottomRight'],
        showTitle: false,
        showTotal: (total, [start, end]) => {
          return `${start}-${end} จาก ${total}`;
        },
        showQuickJumper: false,
        showSizeChanger: false,
        simple: false,
        size: 'default',
        onChange: props.onPaginationChange,
      }}
    />
  );
};

export default TableContent;
