import { Navigation } from '../Navigation/Navigation';
import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { UserBarBtn } from '../UserBarBtn/UserBarBtn';
import { BurgerMenuBtn } from '../BurgerMenuBtn/BurgerMenuBtn';

export const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className={ isLoggedIn ? css.authHeader : css.header}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? css.linkActive : css.link)}
      >
        <Logo />

      </NavLink>
      <Navigation className={css.navigation} />
      {isLoggedIn ? (<><UserBarBtn className={css.userBar} /><BurgerMenuBtn className={css.burgerMenu}  /></>): null }
    </header>
  );
};
