import React from 'react';
import styles from '../styles/instructions.module.css';

const Instructions = ({ children }) => {
  return <div className={styles.instructions}>{children}</div>;
};

export default Instructions;
