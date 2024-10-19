import { Link } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = () => (
  <div className={css.actionButtons}>
    <Link to="/signup">
      <button className="primary-button" type="submit">Sign Up</button>
    </Link>
    <Link to="/login">
      <button className="secondary-button" type="submit">Sign In</button>
    </Link>
  </div>
)
