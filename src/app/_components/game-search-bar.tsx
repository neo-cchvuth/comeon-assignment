import { setGameSearchTerms } from '@/redux/features/games';
import { useAppDispatch } from '@/redux/hooks';

export default function GameSearchBar() {
  const dispatch = useAppDispatch();

  const onSearch = (value: string) => {
    dispatch(setGameSearchTerms(value));
  };

  return (
    <div className="four wide column">
      <div className="search ui small icon input ">
        <input data-test="search" type="text" placeholder="Search Game" onChange={(e) => onSearch(e.target.value)} />
        <i className="search icon"></i>
      </div>
    </div>
  );
}
