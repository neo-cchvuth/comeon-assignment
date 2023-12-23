import { BaseResponse } from '@/axios';
import { AsyncStatus } from '@/redux/utils/reducers';

export type Player = {
  name: string;
  avatar: string;
  event: string;
};

export type PlayerState = {
  player?: Player;
} & AsyncStatus;

export type PlayerResponse = {
  player: Player;
} & BaseResponse;
