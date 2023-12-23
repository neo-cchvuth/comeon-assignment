'use client';

import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import comeon from '../../../public/lib/comeon.game-1.1.min';

export default function InGame() {
  const router = useRouter();
  const gameId = useAppSelector((state) => state.gamesReducer.activeGameId);

  useEffect(() => {
    if (!gameId) {
      return router.push('/');
    }

    comeon.game.launch(gameId);
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
