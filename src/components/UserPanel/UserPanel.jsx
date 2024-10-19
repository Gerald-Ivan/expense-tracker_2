import React, { useState, useRef } from 'react';
import svg from '../../assets/images/icons.svg';
import { UserSetsModal } from 'components/UserSetsModal/UserSetsModal';
import css from './UserPanel.module.css';
import { LogOutModal } from '../LogOutModal/LogOutModal';

export const UserPanel = ({onClose}) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const profileButtonRef = useRef(null);

  const openLogoutPrompt = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutPrompt = () => {
    setIsLogoutModalOpen(false);
  };

  const openProfileSettings = () => {
    setIsProfileModalOpen(true);
    onClose && onClose();
  };

  const closeProfileSettings = () => {
    setIsProfileModalOpen(false);
    profileButtonRef.current?.focus();
  };

  return (
    <>
      <div className={css.container}>
        <div
          className={css.item}
          onClick={openProfileSettings}
          ref={profileButtonRef}
        >
          <svg>
            <use href={`${svg}#user-icon`} />
          </svg>
          <p>
            Profile settings
          </p>
        </div>

        <div
          className={css.item}
          onClick={openLogoutPrompt}
        >
          <svg
            height={16}
            width={16}
          >
            <use href={`${svg}#log-out`} />
          </svg>
          <p>
            Log out
          </p>
        </div>
      </div>

      <UserSetsModal isOpen={isProfileModalOpen} onClose={closeProfileSettings} />
      <LogOutModal isOpen={isLogoutModalOpen} onClose={closeLogoutPrompt}/>
    </>
  );
};
