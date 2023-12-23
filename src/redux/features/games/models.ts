import { AsyncStatus } from '@/redux/utils/reducers';

export type Game = {
  name: string;
  description: string;
  code: string;
  icon: string;
  categoryIds: number[];
};

export type GamesState = {
  games: Game[];
  searchTerms?: string;
  activeGameId?: string;
} & AsyncStatus;

export type GamesResponse = Game[];
