/**
 *  InputSearch - Model
 */

import type { ChangeEvent } from 'react';

export namespace InputSearchProps {
  export interface Container {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: FieldOption;
    scopes?: Array<FieldScope>;

    onSubmit?: (values: Submission) => void;
    onClear?: () => void;
    setScopes?: (selectedValue: Array<Scope>) => void;
    onChange?: (_value: string) => void;
  }
  
  export interface Content extends State {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: FieldOption;
    scopes?: Array<FieldScope>;
  
    onTriggerFilterPopover: (visible: boolean) => void;
    onChangeText: (evt: ChangeEvent<HTMLInputElement>) => void;
    onChangeScopes: (selectedValue: Array<Scope>) => void;
    onClickClearIcon: () => void;
    onClickAdvanceSearch?: () => void;
    onClickAdvanceSearchExt: () => void;
    onSubmit: () => void;
  }
  
  interface State {
    searchKeyword: string;
    selectedScopes: Array<Scope>;
    optionVisible: boolean;
  }
  
  interface FieldOption {
    input: string;
    scope: string;
  }
  
  export interface FieldScope {
    value: Scope;
    label: string;
    disabled?: boolean;
    valueType: string;
  }
  
  export interface Submission {
    text: string;
    scope: Array<Scope>;
  }
  
  export type Scope = string | number | boolean;
}