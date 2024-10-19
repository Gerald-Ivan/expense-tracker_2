import css from './Logo.module.css';
import icon from '../../assets/images/logo-icon.svg';

export const Logo = () => (
  <div className={css.logoContainer}>
    <img src={icon} className={css.icon} alt="">
    </img>
    <span className={css.text}>expensetracker</span>
  </div>
);
