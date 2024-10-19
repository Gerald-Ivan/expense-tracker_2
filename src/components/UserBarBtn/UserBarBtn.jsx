import React, { useState, useRef, useEffect } from 'react';
import svg from '../../assets/images/icons.svg';
import { UserPanel } from '../UserPanel/UserPanel';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/user/selectors';
import css from './UserBarBtn.module.css';

export const UserBarBtn = ({className}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const user = useSelector(getUser);

  const togglePanel = () => {
    setIsPanelOpen(prevState => !prevState);
  };

  const tempProfile = () => (
    <svg className={css.tempProfile} width={44} height={44}>
      <use
        href={`${svg}#user-bold`}
      />
    </svg>
  );

  useEffect(() => {
    const handleClickOutside = event => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={panelRef} className={className}>
      <div className={css.container} onClick={togglePanel}>
        {user.avatarUrl ?
          (<img
          src={user.avatarUrl}
          alt="temporary profile"
        />) : tempProfile()}
        <p>
          {user.name}
        </p>
        <svg width={20} height={20}>
          <use
            href={`${svg}${isPanelOpen ? '#chevron-up' : '#chevron-down'}`}
          />
        </svg>

      </div>
      {isPanelOpen && (
        <div className={css.userPanel}>
          <UserPanel onClose={() =>  setIsPanelOpen(true)} />
        </div>
      )}
    </div>
  );
};
