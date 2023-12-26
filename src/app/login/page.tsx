'use client';

import Input, { InputHandle } from '@/app/_components/input';
import { postLogin } from '@/redux/features/auth/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';

import styles from './page.module.scss';

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const errorMessage = useAppSelector((state) => state.authReducer.error);
  const isLoading = useAppSelector((state) => state.authReducer.status === 'loading');

  const usernameRef = useRef<InputHandle>(null);
  const passwordRef = useRef<InputHandle>(null);

  const onLogin = (event: FormEvent) => {
    event.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      dispatch(postLogin({ username: usernameRef.current.getValue(), password: passwordRef.current.getValue() })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          router.push('/');
        }
      });
    }
  };

  return (
    <div className="login">
      <div className="ui grid centered equal width">
        <span className={styles['error-message']}>{errorMessage}</span>
        <form onSubmit={onLogin}>
          <div className="fields">
            <Input name="username" placeholder="Username" icon="user" ref={usernameRef} />
            <Input name="password" placeholder="Password" type="password" icon="lock" ref={passwordRef} />
            <button className={`ui button ${isLoading ? 'loading disabled' : ''}`} type="submit">
              Login
              <i className="right chevron icon"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
