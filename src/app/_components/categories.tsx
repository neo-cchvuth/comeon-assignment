'use client';

import { setCategoryId } from '@/redux/features/categories';
import { getCategories } from '@/redux/features/categories/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

export default function Categories() {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.categoriesReducer.selectedId);
  const categories = useAppSelector((state) => state.categoriesReducer.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onCategoryClick = (id: number) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="four wide column">
      <h3 className="ui dividing header">Categories</h3>

      <div className="ui selection animated list category items">
        {categories?.map((c) => (
          <div
            key={c.id}
            data-test="category"
            className={`category item ${c.id === selectedCategory ? 'active' : ''}`}
            onClick={() => onCategoryClick(c.id)}
          >
            <div className="content">
              <div className="header">{c.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
