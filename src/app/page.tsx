'use client';

import Categories from './_components/categories';
import GameSearchBar from './_components/game-search-bar';
import Games from './_components/games';
import Profile from './_components/profile';

export default function Home() {
  return (
    <div className="casino">
      <div className="ui grid centered">
        <Profile />
        <GameSearchBar />
      </div>
      <div className="ui grid equal height reversed mobile">
        <Games />
        <Categories />
      </div>
    </div>
  );
}
