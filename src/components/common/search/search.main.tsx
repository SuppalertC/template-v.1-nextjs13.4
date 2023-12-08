import { Card } from 'antd';
import { ReactElement } from 'react';

const SearchAndFilters = <T extends unknown>(props: any): ReactElement => {
  return (
    <Card
      title={<p className="text-[#ffffff] flex justify-start items-center">{'แดชบอร์ด'}</p>}
      headStyle={{ backgroundColor: '#6f2f83', color: 'ffffff' }}
    >
      <></>
    </Card>
  );
};

export default SearchAndFilters;
