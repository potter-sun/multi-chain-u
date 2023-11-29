import { ChainItem } from 'constants/home';

export interface CommonSelectChainProps {
  menuItems: ChainItem[];
  selectedItem: ChainItem;
  onClick: (item: ChainItem) => void;
}
