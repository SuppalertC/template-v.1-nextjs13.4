/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  AnnouncementListProps - Model
 */

import { FormInstance } from 'antd';

export namespace AnnouncementListProps {
  export interface Container {}

  export interface Content extends State {
    createLink: string;

    filters: Array<any>;
    form: FormInstance<any>;
    onSubmitSearch: any;

    scopes: Array<any>;
    setScopes: (selectedValue: Array<any>) => void;

    onClickAdd: () => void;
    onClickRemove: (id: number) => void;
    onChangePage: (changedPage: number) => void;
    onChangePageSize: (changedPageSize: number) => void;
  }

  export interface State {
    page: number;
    pageSize: number;
  }
}
