import { BaseResponse } from '@/axios';
import { AsyncStatus } from '@/redux/utils/reducers';

import { PlayerState } from '../player/models';

export type AuthState = {
  username: string | null;
} & AsyncStatus;

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  player: PlayerState;
} & BaseResponse;
