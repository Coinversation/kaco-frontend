import { useSelector } from 'react-redux';
import { State } from 'state/types';

export const use = () => {
  return useSelector((state: State) => state.dAppstaking);
};
