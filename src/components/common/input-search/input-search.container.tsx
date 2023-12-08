/**
 *  InputSearch - Container
 */

import {
  type FC,
  type ReactElement,
  type ChangeEvent,
  useEffect,
  useState
} from 'react';

import Content from './input-search.content';
import type { InputSearchProps } from './input-search.model';

const InputSearchContainer: FC<InputSearchProps.Container> = (props: InputSearchProps.Container): ReactElement => {
   /** Hook section */
   const [ searchKeyword, setSearchKeyword ] = useState<string>('');
   const [ selectedScopes, setSelectedScopes ] = useState<Array<InputSearchProps.Scope>>([]);
   const [ optionVisible, setOptionVisible ] = useState(false);
   const [ isMounted, setIsMounted ] = useState(false);
 

   useEffect(() => {
     const { scopes } = props;
     if(scopes && scopes.length > 0 && !isMounted) {
       let _scopes: Array<InputSearchProps.Scope> = [];
       for(const { value } of scopes) {
         _scopes.push(value);
       }
 
       setSelectedScopes(_scopes.slice(0));
       setIsMounted(true);
     }
   }, [ props ]);

   useEffect(() => {
    props?.setScopes?.([...selectedScopes]);
   }, [selectedScopes])
 
   /** Functionality section */
   const onTriggerFilterPopover = (visible: boolean) => { setOptionVisible(visible); }
 
   const onChangeText = (evt: ChangeEvent<HTMLInputElement>) => {
     const _value = evt.target.value || '';
     setSearchKeyword(_value);
     props?.onChange?.(_value)
   }
 
   const onChangeScopes = (selectedValue: Array<InputSearchProps.Scope>) => {
     setSelectedScopes([...selectedValue]);
   }
 
   const onClickClearIcon = () => {
     setSearchKeyword('');
     if(props.onClear) {
       props.onClear();
     }
     if(props.onChange){
      props.onChange('');
     }
   }
   
   const onSubmit = () => {
     setOptionVisible(false);
     if(selectedScopes.length > 0 && props.onSubmit) {
       const _text = `${ searchKeyword }`;
       const _scope = selectedScopes.slice(0);
       props.onSubmit({ text: _text, scope: _scope });
     }
   }
 
   const onClickAdvanceSearchExt = () => { setOptionVisible(false); }
 
   return (
     <Content
       {...props}
       searchKeyword={ searchKeyword }
       selectedScopes={ selectedScopes }
       optionVisible={ optionVisible }
 
       onTriggerFilterPopover={ onTriggerFilterPopover }
       onChangeText={ onChangeText }
       onChangeScopes={ onChangeScopes }
       onClickClearIcon={ onClickClearIcon }
       onClickAdvanceSearchExt={ onClickAdvanceSearchExt }
       onSubmit={ onSubmit }
     />
   );
}

export default InputSearchContainer;