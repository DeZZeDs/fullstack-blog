import React from 'react';
import {Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import styles from './HeaderNav.module.scss';
import HeaderPersonal from "../HeaderPersonal";

const HeaderNav = () => {
    return (
        <ul className={styles.nav__list}>
            <li>
                <Link to="/">
                    <HomeIcon width={18} height={18}/>
                    <p>Главная</p>
                </Link>
            </li>
            <li>
                <Link to="/">О нас</Link>
            </li>
            <li>
                <Link to="/search">
                    <SearchIcon/>
                    <p>Поиск</p>
                </Link>
            </li>
            <li>
                <HeaderPersonal/>
            </li>
        </ul>
    );
};

export default HeaderNav;
