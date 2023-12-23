import { AsyncStatus } from '@/redux/utils/reducers';

export type Category = {
  id: number;
  name: string;
};

export type CategoriesState = {
  selectedId?: number;
  categories: Category[];
} & AsyncStatus;

export type CategoriesResponse = Category[];
