/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  ListTableProps - Model
 */

import { FormInstance } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { InputSearchProps } from '../input-search/input-search.model';

export namespace ListTableProps {
  export interface Container {}

  export interface Content<T> extends State {
    title: string;
    dataSource: Array<any>;
    columns: ColumnsType<any>;
    createLink: string;
    onSortChange?: any;
    rowSelectable?: boolean;
    selectedKeys?: Array<any>;
    loading?: any;
    total?: number;
    filters: Array<any>;
    scopes?: Array<InputSearchProps.FieldScope>;
    taps?: Array<any>;
    form: FormInstance<T>;
    turnOnTap?: boolean;
    onSelectChange?: (value: any) => void;
    onSubmitSearch: (values: T) => void;
    onClearSearch: () => void;
    onClickTaps?: (values: any) => void;
    setScopes: (selectedValue: Array<InputSearchProps.Scope>) => void;
    onSearch?: (params: InputSearchProps.Submission) => void;
    onClickAdd: () => void;
    onClickRemove: (id: number) => void;
    onChangePage: (changedPage: number) => void;
    onChangePageSize: (changedPageSize: number) => void;
    hiddenScopes?: boolean;
    hideCreateButton?: boolean;
    hiddenFilters?: boolean;
    //? info: new dashboard
    dashboardList?: Array<dashboardItemProps>;
    scroll?: scrollItemProps;
    datePicker?: DatePicker;
  }
  export interface DatePicker {
    showDatePicker: boolean;
    nameDatePicker: string;
  }
  export interface scrollItemProps {
    x?: number;
    y?: number;
  }
  export interface dashboardItemProps {
    title: string;
    value: string;
  }
  export interface State {
    page: number;
    pageSize: number;
  }
}
