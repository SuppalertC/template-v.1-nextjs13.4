/**
 *  InputSearch - Content
 */

import { type ReactElement, Fragment } from 'react';
import {
  Row,
  Col,
  Input,
  Checkbox,
  Popover,
  Button,
  Badge
} from 'antd';

import type { InputSearchProps } from './input-search.model';
import presets from './input-search.module.css';

const InputSearchContent = (props: InputSearchProps.Content): ReactElement => {
  return (
    <Input
      id={ props.id || undefined }
      value={ props.searchKeyword }
      size={'large'}
      placeholder={ props.placeholder?.input || 'Search' }
      addonBefore={<i className={'fa-solid fa-magnifying-glass'}></i>}
      addonAfter={ renderSuffixOption(props) }
      onChange={ props.onChangeText }
      onPressEnter={ props.onSubmit }
    />
  );
}

const renderSuffixOption = (props: InputSearchProps.Content): ReactElement | undefined => {
  if(props.scopes && props.scopes.length > 0) {
    return (
      <div style={{ position: 'relative' }}>
        <Popover
          placement={'bottom'}
          open={ props.optionVisible }
          onOpenChange={ props.onTriggerFilterPopover }
          title={ props.placeholder?.scope || 'Scope' }
          content={ renderScopeSelection(props) }
          overlayStyle={{ maxWidth: '250px', overflowWrap: 'anywhere' }}
        >
          <Badge
            status={'success'}
            size={'small'}
            count={props.selectedScopes.length}
            overflowCount={10}
          >
            <i className={'fa-solid fa-filter'}></i>
          </Badge>
        </Popover>
        { (props.searchKeyword.length > 0) && renderCustomClearButton(props) }
      </div>
    );
  }
  
  return undefined;
}

const renderScopeSelection = (props: InputSearchProps.Content): ReactElement => {
  if(props.scopes && props.scopes.length > 0) {
    return (
      <Row gutter={[ 8, 8 ]}>
        <Col key={'scope-checkboxes'} span={24}>
          <Checkbox.Group
            style={{ display: 'flex', flexDirection: 'column' }}
            options={
              props.scopes.map((opt) => ({
                ...opt,
                style: { userSelect: 'none', marginInlineStart: 0 }
              }))
            }
            value={ props.selectedScopes }
            onChange={ props.onChangeScopes }
          />
        </Col>
        <Col key={'scope-action'} span={24}>
          <Button block type={'ghost'} onClick={ props.onSubmit }>
            APPLY
          </Button>
        </Col>
        {
        (props.onClickAdvanceSearch) && (
          <Col span={24}>
            <Button 
              id={ props.id + '_advance_search' }
              block
              type={'ghost'}
              onClick={() => {
                props.onClickAdvanceSearchExt();
                if(props.onClickAdvanceSearch) {
                  props.onClickAdvanceSearch();
                }
              }}
            >
              ADVANCE SEARCH
            </Button>
          </Col>
        )
      }
      </Row>
    );
  }
  else {
    return (<Fragment />);
  }
};

const renderCustomClearButton = (props: InputSearchProps.Content): ReactElement => (
  <span className={ presets.iconWrapper } onClick={ props.onClickClearIcon }>
    <span className={ presets.clearIcon }>
      <svg
        viewBox={'64 64 896 896'}
        focusable={false}
        data-icon={'close-circle'}
        width={'1em'} height={'1em'}
        fill={'currentColor'} aria-hidden={true}
      >
        <path d={'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z'} />
      </svg>
    </span>
  </span>
);

export default InputSearchContent;