import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { lazy, useEffect } from 'react';
import { refreshToken } from '../redux/auth/authOperations';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { fetchCurrentUser } from '../redux/user/operations';
import Loader from './Loader/Loader';
import * as trans from '../redux/transactions/selectors';
import * as categories from '../redux/categories/selectors';
import * as user from '../redux/user/selectors';

const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const MainTransactionsPage = lazy(() => import('../pages/MainTransactionsPage/MainTransactionsPage'));
const TransactionsHistoryPage = lazy(() => import('../pages/TransactionsHistoryPage/TransactionsHistoryPage'));

export function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, token, sid, isRefreshing } = useAuth();

  const isTransactionsLoading = useSelector(trans.getIsLoading);
  const isCategoriesLoading = useSelector(categories.getIsLoading);
  const isUserLoading = useSelector(user.getIsLoading);

  const isLoading = isUserLoading ||
    isTransactionsLoading ||
    isCategoriesLoading ||
    isRefreshing;

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token && !isLoggedIn) {
        await dispatch(refreshToken({ sid })).unwrap();
      }

      if (isLoggedIn) {
        await dispatch(fetchCurrentUser());
      }
    };

    checkAuthStatus();
  }, [dispatch, token, isLoggedIn, sid]);

  return (
    <>
      { isLoading && <Loader /> }
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<RestrictedRoute
            component={<WelcomePage />}
            redirectTo="/transactions"
          />} />
          <Route
            path="/signup"
            element={
              <RestrictedRoute redirectTo="/" component={<RegisterPage />} />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/" component={<LoginPage />} />
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute
                component={<MainTransactionsPage />}
                redirectTo="/"
              />
            }
          />
          <Route
            path="/transactions/history/:transactionType"
            element={
              <PrivateRoute
                component={<TransactionsHistoryPage />}
                redirectTo="/"
              />
            }
          />
        </Route>
      </Routes>
    </>
  );

}
