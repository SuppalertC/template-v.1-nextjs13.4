import dayjs, { Dayjs } from 'dayjs';
import { InputSearchProps } from '../input-search';
import {
  CrudQuery,
  InputMaybe,
  NestedStringFilter,
  StringFilter,
  WhereInput,
} from 'src/services/crud-types';

export const TransformInputToFilterFormat = <T extends unknown>(
  inputs: T,
  scopes: Array<InputSearchProps.Scope>,
  filterScopes: Array<InputSearchProps.FieldScope>
): WhereInput<T> => {
  let _AND_CONDITIONS: Array<InputMaybe<StringFilter>> = [];
  let _OR_CONDITIONS: Array<InputMaybe<StringFilter>> = [];
  console.log('_AND')
  for (let _v in inputs) {
    if (inputs[_v] !== undefined && typeof inputs[_v] !== 'undefined') {
      console.log(_v, inputs[_v], typeof inputs[_v]);

      if (_v === 'q') {
        _OR_CONDITIONS = convertSearchToCondition(
          inputs[_v] as string,
          scopes,
          filterScopes
        );
        console.log(`_OR_CONDITIONS`, _OR_CONDITIONS);
        continue;
      }

      if (typeof inputs[_v] === 'object') {
        console.log('Input', inputs[_v]);
        console.log('typeInput', typeof inputs[_v]);

        let _inputrange: Array<object> = inputs[_v] as Array<object>;

        if (
          typeof _inputrange[0] === 'object' &&
          typeof _inputrange[1] === 'object'
        ) {
          convertInputDateTimeToDateTime(
            _v,
            inputs[_v] as Object,
            _AND_CONDITIONS
          );
        } else {
          // console.log('Priority Call' )
          convertInputPriorityToCondition(
            _v,
            inputs[_v] as Object,
            _AND_CONDITIONS
          );
        }
        continue;
      }

      if (inputs[_v] === true || inputs[_v] === false) {
        _AND_CONDITIONS.push({
          [_v]: {
            equals: inputs[_v],
          },
        });
      } else {
        _AND_CONDITIONS.push({
          [_v]: {
            contains: inputs[_v],
          },
        });
      }
    }
  }

  if (_OR_CONDITIONS.length === 0) {
    return {
      AND: _AND_CONDITIONS as InputMaybe<Array<T>>,
    };
  }

  return {
    AND: _AND_CONDITIONS as InputMaybe<Array<T>>,
    OR: _OR_CONDITIONS as InputMaybe<Array<T>>,
  };
};

const convertSearchToCondition = (
  searchText: string,
  scopes: Array<InputSearchProps.Scope>,
  filterScopes: Array<InputSearchProps.FieldScope>
): Array<InputMaybe<StringFilter>> => {
  if (!searchText) return [];
  return scopes.map((scope: InputSearchProps.Scope) => {
    const _type =
      filterScopes.filter((s: any) => s.value == scope.toString())[0]
        .valueType === 'number';
    return {
      [scope.toString()]: _type ? parseInt(searchText) : searchText,
    };
  });
};
const convertInputPriorityToCondition = <T extends unknown>(
  key: string,
  input: Object,
  _condition: Array<InputMaybe<StringFilter>>
) => {
  if (Array.isArray(input)) {
    if (input.length === 2) {
      if (input[0]) {
        _condition.push({
          [key]: { gte: Number(input[0]) },
        });
      }
      if (input[1]) {
        _condition.push({
          [key]: { lte: Number(input[1]) },
        });
      }
    }
  }
};

const convertInputDateTimeToDateTime = <T extends unknown>(
  key: string,
  input: Object,
  _condition: Array<InputMaybe<StringFilter>>
) => {
  if (Array.isArray(input)) {
    if (input.length === 2) {
      if (input[0]) {
        const _start = (input[0] as Dayjs)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0);
        _condition.push({
          [key]: {
            gte: _start.toDate(),
          },
        });
      }
      if (input[1]) {
        const _end = (input[1] as Dayjs)
          .set('hour', 23)
          .set('minute', 59)
          .set('second', 59);
        _condition.push({
          [key]: {
            lte: _end.toDate(),
          },
        });
      }
    }
  } else if (input && dayjs.isDayjs(input)) {
    _condition.push({
      [key]: {
        contains: input.toDate(),
      },
    });
  }
};

export const onSort = <T extends unknown>(
  sort: any,
  defaultCrudQuery: CrudQuery<T>
): CrudQuery<T> => {
  console.log('sort', sort);
  const { columnKey, order } = sort;
  let sortCrudQuery: CrudQuery<T | any> = { ...defaultCrudQuery };
  if (order !== null) {
    let isAscend: any = order === 'ascend' ? 'asc' : 'desc';
    let secondFilter: any =  columnKey === 'id' ? null :{ id: 'desc' }
    let  orderBy = [{ [columnKey]: isAscend }]
    if(secondFilter !== null) {
      orderBy.push(secondFilter);
    }
    sortCrudQuery = {
      where: {
        AND: [
          {
            isDeleted: false,
          },
        ],
      },
      orderBy: orderBy,
    };
  }
  return sortCrudQuery as CrudQuery<T>;
};
