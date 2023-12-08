/**
 *  Table - Container
 */

import { useEffect, useState, type Key, type ReactElement } from 'react';

import Content from './table.content';
import type { ITableProps } from './table.model';

const TableContainer = <RecordType extends object>(props: ITableProps.Container<RecordType>): ReactElement => {
  /** Hook section */
  const [ctrPageSize, setCtrPageSize] = useState(() => props.pageSize || 10);

  useEffect(() => {}, []);

  /** Functionality section */
  const resolveRowExpandable = (record: RecordType) => {
    if (props.resolveRowExpandable) {
      return props.resolveRowExpandable(record);
    }

    return false;
  };

  const resolveExpansionContent = (record: RecordType) => {
    if (props.resolveExpansionContent) {
      return props.resolveExpansionContent(record);
    }

    return <div />;
  };

  const onRowSelectionChange = (selectedRowKeys: Array<Key>) => {
    if (props.onSelectChange) {
      props.onSelectChange(selectedRowKeys);
    }
  };

  const onTableSort = (sorter: ITableProps.Sorter<RecordType>) => {
    if (props.onSortChange) {
      const { columnKey, field, order } = sorter;
      props.onSortChange({ columnKey: columnKey, field: field, order: order || null });
    }
  };

  const onPaginationChange = (changedPage: number, changedPageSize: number) => {
    if (changedPage !== props.page) {
      if (props.onChangePage) {
        props.onChangePage(changedPage);
      }
    } else if (changedPageSize !== props.pageSize) {
      setCtrPageSize(changedPageSize);
      if (props.onChangePageSize) {
        props.onChangePageSize(changedPageSize);
      }
    }
  };

  return (
    <Content
      rowKey={props.rowKey}
      columns={props.columns}
      dataSource={props.dataSource}
      tableLayout={props.tableLayout}
      size={props.size}
      loading={props.loading}
      title={props.title}
      footer={props.footer}
      scroll={props.scroll}
      page={props.page}
      pageSize={props.pageSize}
      total={props.total}
      rowExapandable={props.rowExapandable}
      rowSelectable={props.rowSelectable}
      selectedKeys={props.selectedKeys}
      ctrPageSize={ctrPageSize}
      resolveRowExpandable={resolveRowExpandable}
      resolveExpansionContent={resolveExpansionContent}
      onRowSelectionChange={onRowSelectionChange}
      onTableSort={onTableSort}
      onPaginationChange={onPaginationChange}
    />
  );
};

export default TableContainer;
