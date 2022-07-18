import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Logout from '@mui/icons-material/Logout';
import {useSelector, useDispatch} from "react-redux";
import {setLogged} from "../../../store/Slices/authSlice";
import {useState} from "react";


const HeaderPersonal = () => {
    const isAuth = useSelector((state) => state.authReducer.logged);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        window.localStorage.removeItem('token');
        dispatch(setLogged(false));
        navigate('/');
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography
                    onClick={(event) => handleClick(event)}
                    sx={{fontSize: '18px', display: 'flex'}}
                >
                    Личный кабинет
                    <KeyboardArrowDownIcon sx={open ? {transform: 'rotate(180deg)'} : {}}/>
                </Typography>
            </Box>
            {
                isAuth ?
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={(e) => handleClose()}
                        onClick={(e) => handleClose()}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Avatar /> Мой профиль
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => handleLogOut()}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Выйти
                        </MenuItem>

                    </Menu>
                    :
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Link to="/login">
                            <MenuItem>
                                Войти
                            </MenuItem>
                        </Link>
                        <Link to="/register">
                            <MenuItem>
                                Зарегистрироваться
                            </MenuItem>
                        </Link>
                    </Menu>
            }

        </>
    );
}

export default HeaderPersonal;