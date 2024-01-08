import { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

const selectCategoryId = (state: RootState) => state.categoriesReducer.selectedId;
const selectGames = (state: RootState) => state.gamesReducer.games;

export const selectGamesByCategory = createSelector([selectCategoryId, selectGames], (id, games) => {
  return id == null ? games : games.filter((g) => g.categoryIds.includes(id));
});
