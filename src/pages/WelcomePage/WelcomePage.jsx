import css from '../WelcomePage/WelcomePage.module.css';
import { AuthNav } from '../../components/AuthNav/AuthNav';
import { AllUsersTab } from '../../components/AllUsersTab/AllUsersTab';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const WelcomePage = () => (
  <HelmetProvider>
    <Helmet>
      <title>Expense Tracker</title>
    </Helmet>
    <div className={css.container}>
      <div className={css.subContainer} style={{ display: 'inline-flex', flexDirection: 'column' }}>
        <div>
          <h1>expense log</h1>
          <div className={css.manageFinance}>
            Manage Your
            {' '}
            <span>Finances</span>
            {' '}
            Masterfully!
          </div>
          <p>
            ExpenseTracker effortlessly empowers you to take control of your finances! With intuitive features, it
            simplifies the process of tracking and managing expenses, allowing for a stress-free mastery over your
            financial world.
          </p>
        </div>
        <div className={css.authNavContainer}>
          <AuthNav />
        </div>
      </div>
      <div className={css.allUsersTab}>
        <AllUsersTab />
      </div>
    </div>
  </HelmetProvider>
);

export default WelcomePage;
