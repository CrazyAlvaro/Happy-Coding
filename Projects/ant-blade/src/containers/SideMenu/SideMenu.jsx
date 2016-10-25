import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './SideMenu.css';

const MenuOption = ({ link, name }) => (
  <Link
    to={link}
    className={styles.link}
    activeClassName={styles.activeLink}
  >
    {name}
  </Link>
);

MenuOption.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
};

const SideMenu = () => (
  <div className={styles.container}>
    <div className={styles.menuOptions}>
      <MenuOption
        link="/tableList/reference"
        name="对照表"
      />
      <MenuOption
        link="/tableList/fact"
        name="序时表"
      />
      <MenuOption
        link="/tableList/audit"
        name="余额表"
      />
    </div>
    <div className={styles.settingOptions}>
      <MenuOption
        link="/yongyou"
        name="用友数据"
      />
    </div>
  </div>
);

export default SideMenu;
