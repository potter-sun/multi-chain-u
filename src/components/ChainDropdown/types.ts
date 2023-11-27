import { MenuProps } from 'antd';
import { ChainNameType } from 'constants/home';

export interface CommonChainDropdownProps {
  chainId: ChainNameType;
  menuItems: MenuProps['items'];
  selectedKeys: MenuProps['selectedKeys'];
  onClick: MenuProps['onClick'];
}
