'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import comeon from '../../../public/lib/comeon.game-1.1.min';

export default function InGame() {
  const router = useRouter();
  const searchParam = useParams();
  const gameId = useMemo(() => {
    return searchParam['game_id'];
  }, [searchParam]);

  useEffect(() => {
    try {
      comeon.game.launch(gameId);
    } catch (err) {
      console.error(gameId, err);
      return router.push('/');
    }
  }, [gameId, router]);

  return (
    <div className="ingame">
      <div className="ui grid stackable centered">
        <div className="three wide column">
          <div onClick={() => router.back()} className="ui left secondary button inverted">
            <i className="left chevron icon"></i>Back
          </div>
        </div>
        <div className="ten wide column">
          <div id="game-launch"></div>
        </div>
        <div className="three wide column"></div>
      </div>
    </div>
  );
}
