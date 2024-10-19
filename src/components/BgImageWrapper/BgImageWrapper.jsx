import css from './BgImageWrapper.module.css';
import { DecorationTab } from '../DecorationTab/DecorationTab';

export const BgImageWrapper = () => (
  <div className={css.container}>
    <div className={css.imageBox}>
      <DecorationTab />
    </div>
  </div>
)
