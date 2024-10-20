import React from 'react';
import { MutatingDots } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <div className={styles.loaderBox}>
      <MutatingDots visible={true} height="100" width="100" color="#4fa94d" secondaryColor="#4fa94d" radius="12.5" ariaLabel="mutating-dots-loading" wrapperStyle={{}} wrapperClass=""/>
      </div>
    </div>
  );
}

export default Loader;
