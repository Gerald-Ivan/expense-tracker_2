import css from '../AllUsersTab/AllUsersTab.module.css';
import fleur from '../../assets/images/Fleur-Cook.png';
import ethan from '../../assets/images/Ethan-Valdez.png';
import amanda from '../../assets/images/Amanda-Lowery.png';

export const AllUsersTab = () => (
  <div className={css.usersContainer}>
    <div className={css.avatars}>
      <img
        className={css.fleur}
        src={fleur}
        width="48"
        height="48"
        alt="fleur cook"
      />
      <img
        className={css.ethan}
        src={ethan}
        width="48"
        height="48"
        alt="ethan valdez"
      />
      <img
        className={css.amanda}
        src={amanda}
        width="48"
        height="48"
        alt="amanda lowery"
      />
    </div>
    <div style={{ marginLeft: '155px' }}>
      <h2>
        1000 users +
      </h2>
      <p>
        Trusted by users for reliable expense tracking!
      </p>
    </div>
  </div>
);
