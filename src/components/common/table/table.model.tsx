/**
 *  Table - Model
 */

import type { TableProps } from 'antd';
import type { SortOrder, SorterResult } from 'antd/lib/table/interface';
import type { Key, ReactNode } from 'react';

export namespace ITableProps {
  export interface Container<DataRecordType>
    extends EssentialDefinition<DataRecordType> {
    page?: number;
    pageSize?: number;
    total?: number;

    paginationPosition?: Array<EssentialPaginationPosition>;
    rowExapandable?: boolean;
    rowSelectable?: boolean;
    selectedKeys?: Array<Key>;
    loading?: any;
    resolveRowExpandable?: (record: DataRecordType) => boolean;
    resolveExpansionContent?: (record: DataRecordType) => ReactNode;
    onSortChange?: (params: SortEventArgument) => void;
    onSelectChange?: (selectedRowKeys: Array<Key>) => void;
    onChangePage?: (changedPage: number) => void;
    onChangePageSize?: (changedPageSize: number) => void;
  }

  export interface Content<DataRecordType>
    extends EssentialDefinition<DataRecordType>,
      TableState {
    page?: number;
    pageSize?: number;
    total?: number;

    paginationPosition?: Array<EssentialPaginationPosition>;
    rowExapandable?: boolean;
    rowSelectable?: boolean;
    selectedKeys?: Array<Key>;
    loading?: any;
    resolveRowExpandable: (record: DataRecordType) => boolean;
    resolveExpansionContent: (record: DataRecordType) => ReactNode;
    onRowSelectionChange: (selectedRowKeys: Array<Key>) => void;
    onTableSort: (sorter: Sorter<DataRecordType>) => void;
    onPaginationChange: (changedPage: number, changedPageSize: number) => void;
  }

  export interface TableState {
    ctrPageSize: number;
  }

  export interface EssentialDefinition<DataRecordType>
    extends EssentialRowKey<DataRecordType>,
      EssentialColumn<DataRecordType>,
      EssentialDataSource<DataRecordType>,
      EssentialLayout<DataRecordType>,
      EssentialSize<DataRecordType>,
      EssentialLoading<DataRecordType>,
      EssentialTitle<DataRecordType>,
      EssentialFooter<DataRecordType>,
      EssentialScroll<DataRecordType> {
    /** Table Definition */
  }

  export type Sorter<DataRecordType> = SorterResult<DataRecordType>;

  export interface SortEventArgument {
    order: SortOrder;
    field?: string | number | readonly Key[];
    columnKey?: string | number;
  }

  export type EssentialRowKey<DataRecordType = unknown> = Pick<
    TableProps<DataRecordType>,
    'rowKey'
  >;
  export type EssentialColumn<DataRecordType = unknown> = Pick<
    TableProps<DataRecordType>,
    'columns'
  >;
  export type EssentialDataSource<DataRecordType = unknown> = Pick<
    TableProps<DataRecordType>,
    'dataSource'
  >;
  export type EssentialLayout<DataRecordType = unknown> = Pick<
    TableProps<DataRecordType>,
    'tableLayout'
  >;
  export type EssentialSize<DataRecordType = unknown> = Pick<
    TableProps<DataRecordType>,
    'size'
  >;
  export type EssentialLoading<DataRecordType = unknown> = Pick<
    TableProps<DataRecordType>,
    'loading'
  >;
  export type EssentialTitle<DataRecordType = unknown> = Pick<
    TableProps<DataRecordType>,
    'title'
  >;
  export type EssentialFooter<DataRecordType = unknown> = Pick<
    TableProps<DataRecordType>,
    'footer'
  >;
  export type EssentialScroll<DataRecordType = unknown> = Pick<
    TableProps<DataRecordType>,
    'scroll'
  >;
  export type EssentialPaginationPosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';
}
