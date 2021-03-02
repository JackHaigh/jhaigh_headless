import React from 'react';
import styles from 'scss/components/Footer.module.scss';

interface Props {
  copyrightHolder?: string;
}

function Footer({ copyrightHolder = 'Company Name' }: Props): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.main}>
      <div className={styles.wrap}>
        <p>{`Copyright © ${year} · ${copyrightHolder} `}</p>
      </div>
    </footer>
  );
}

export default Footer;
