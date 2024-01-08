import { postLogout } from '@/redux/features/auth/reducers';
import { getPlayer } from '@/redux/features/player/reducers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import styles from './index.module.scss';

export default function Profile() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.authReducer.username);
  const player = useAppSelector((state) => state.playerReducer.player);

  useEffect(() => {
    dispatch(getPlayer());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(postLogout(username as string)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        router.push('/login');
      }
    });
  };
  return (
    <div className="twelve wide column">
      <div className="ui list">
        <div className={styles['player'] + ' item'}>
          {player && <Image className="ui avatar image" width={30} height={30} src={'/' + player.avatar} alt="" />}
          <div className="content">
            <div className="header">
              <b className="name" data-test="user-name">
                {player?.name}
              </b>
            </div>
            <div className="description event">{player?.event}</div>
          </div>
        </div>
      </div>
      <div className="logout ui left floated secondary button inverted" onClick={onLogout}>
        <i className="left chevron icon"></i>Log Out
      </div>
    </div>
  );
}
