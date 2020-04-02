import React from 'react';

import styles from './styles.scss';

function FooterText() {
  return (
    <div className={styles.wrapper}>
      <p>
        Vážení kolegové,<br/>
        Mladí praktici z.s. pro Vás s podporou SVL a SPL připravili aplikaci
        ke sledování vybavení ordinací praktických lékařů během pandemie
        COVID-19. Tato aplikace je určena ke sledování aktuálního stavu
        materiálního a personálního vybavení ve Vašich ordinacích. Se svými
        výstupy bude snad účinným nástrojem pro další jednání našich
        odborných společností.
      </p>
      <p>
        V případě technických problémů se zápisem nás prosím kontaktujte
        na: <a
        href={'mailto:info@covid-praktik.cz'}>info@covid-praktik.cz</a>
      </p>
      <p>
        Vojtěch Mucha<br/>
        Václav Joza<br/>
        Petr Messner<br/>
        Ondřej Tůma
      </p>
    </div>
  );
}

export default FooterText;
