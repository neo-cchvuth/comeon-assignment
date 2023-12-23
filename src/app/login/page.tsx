'use client';

import { postLogin } from '@/redux/features/auth/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import styles from './page.module.scss';

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const errorMessage = useAppSelector((state) => state.authReducer.error);
  const isLoading = useAppSelector((state) => state.authReducer.status === 'loading');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (event: FormEvent) => {
    event.preventDefault();
    dispatch(postLogin({ username, password })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        router.push('/');
      }
    });
  };

  return (
    <div className="login">
      <div className="ui grid centered equal width">
        <span className={styles['error-message']}>{errorMessage}</span>
        <form>
          <div className="fields">
            <div className="required field">
              <div className="ui icon input">
                <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <i className="user icon"></i>
              </div>
            </div>
            <div className="required field">
              <div className="ui icon input">
                <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <i className="lock icon"></i>
              </div>
            </div>
            <button className={`ui button ${isLoading ? 'loading disabled' : ''}`} onClick={onLogin}>
              Login
              <i className="right chevron icon"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
