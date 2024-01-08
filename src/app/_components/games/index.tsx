'use client';

import { getGames } from '@/redux/features/games/reducers';
import { selectGamesByCategory } from '@/redux/features/games/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function Games() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const selectedCategory = useAppSelector((state) => state.categoriesReducer.selectedId);
  const gamesStatus = useAppSelector((state) => state.gamesReducer.status);
  const gamesByCategory = useAppSelector(selectGamesByCategory);
  const gamesSearchTerms = useMemo(() => {
    return searchParams.get('q');
  }, [searchParams]);
  const games = useMemo(() => {
    return gamesByCategory.filter((g) => !gamesSearchTerms || g.name.toLowerCase().includes(gamesSearchTerms.toLowerCase()));
  }, [gamesByCategory, gamesSearchTerms]);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  const filterErrorMessage = useMemo(() => {
    if (gamesStatus && gamesStatus !== 'loading' && games.length === 0) {
      let message = 'No game was found.';
      if (gamesSearchTerms || selectedCategory) {
        message += ' Please try selecting a different category or use a different search term.';
      }

      return <span data-test="filter-message">{message}</span>;
    }
  }, [games, gamesSearchTerms, selectedCategory, gamesStatus]);

  const onPlay = (code: string) => {
    router.push(`/${code}`);
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
