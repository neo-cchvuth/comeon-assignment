import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

const selectCategoryId = (state: RootState) => state.categoriesReducer.selectedId;
const selectGameSearchTerms = (state: RootState) => state.gamesReducer.searchTerms;
const selectGames = (state: RootState) => state.gamesReducer.games;

export const selectGamesByCategoryAndKeyword = createSelector(
  [selectCategoryId, selectGames, selectGameSearchTerms],
  (id, games, search) => {
    return id == null
      ? games
      : games.filter((g) => g.categoryIds.includes(id) && (!search || g.name.toLowerCase().includes(search.toLowerCase())));
  },
);
