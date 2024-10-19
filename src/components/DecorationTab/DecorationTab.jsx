import css from '../DecorationTab/DecorationTab.module.css';
import icons from '../../assets/images/icons.svg';


export const DecorationTab = () => (
  <div className={css.container}>
    <div className={css.arrow}>
      <svg width="15" height="17">
        <use href={`${icons}#arrow-up`} />
      </svg>
    </div>

    <div>
      <div style={{
        color: 'rgba(17, 16, 28, 0.50)',
        fontSize: 16,
        fontWeight: '400',
        wordWrap: 'break-word',
      }}>Your balance
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: '#11101C', fontSize: 24, fontWeight: '700', wordWrap: 'break-word' }}>$632.000
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 14,
          width: 58,
          height: 22,
          background: 'rgba(2.22, 177.44, 89.83, 0.15)',
          borderRadius: 13,
        }}>
          <div style={{
            color: '#02B15A',
            fontSize: 12,
            fontWeight: '400',
          }}>+1.29%
          </div>
        </div>
      </div>
    </div>


  </div>
)
