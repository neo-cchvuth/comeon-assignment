'use client';

import { setGameId } from '@/redux/features/games';
import { getGames } from '@/redux/features/games/reducers';
import { selectGamesByCategoryAndKeyword } from '@/redux/features/games/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function Games() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const selectedCategory = useAppSelector((state) => state.categoriesReducer.selectedId);
  const gamesSearchTerms = useAppSelector((state) => state.gamesReducer.searchTerms);
  const games = useAppSelector(selectGamesByCategoryAndKeyword);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  const filterErrorMessage = useMemo(() => {
    if (games.length === 0) {
      let message = 'No game was found.';
      if (gamesSearchTerms || selectedCategory) {
        message += ' Please try selecting a different category or use a different search term.';
      }

      return <span data-test="filter-message">{message}</span>;
    }
  }, [games, gamesSearchTerms, selectedCategory]);

  const onPlay = (code: string) => {
    dispatch(setGameId(code));
    router.push('/ingame');
  };

  return (
    <div className="twelve wide column">
      <h3 className="ui dividing header">Games</h3>

      <div className="ui relaxed divided game items links">
        {games.map((g) => (
          <div key={g.code} data-test="game" className="game item">
            <div className="ui small image">
              <Image src={'/' + g.icon} width={150} height={80} alt="" />
            </div>
            <div className="content">
              <div className="header">
                <b className="name">{g.name}</b>
              </div>
              <div className="description">{g.description}</div>
              <div className="extra">
                <div onClick={() => onPlay(g.code)} className="play ui right floated secondary button inverted">
                  Play
                  <i className="right chevron icon"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filterErrorMessage}
      </div>
    </div>
  );
}
