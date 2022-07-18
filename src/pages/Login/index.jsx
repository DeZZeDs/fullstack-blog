import React, {useCallback, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {Link} from 'react-router-dom';

import styles from "./Login.module.scss";

import {fetchAuth, setLogged} from '../../store/Slices/authSlice';
import {useDispatch, useSelector} from "react-redux";


export const Login = React.memo(() => {
    const isAuth = useSelector((state) => state.authReducer.logged);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.authReducer);

    const onChangeEmail = useCallback((event) => {
        setEmail(event.target.value);
    },[]);

    const onChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    },[]);

    const onSubmitLogin = (event) => {
        event.preventDefault();
        const params = {email, passwordHash: password};
        dispatch(fetchAuth(params));
    }

    if(data && data.token) {
        window.localStorage.setItem('token', data.token);
        dispatch(setLogged(true));
    }

    return (
        !isAuth ?
            <Paper classes={{ root: styles.root }}>
                <form onSubmit={(event) => onSubmitLogin(event)}>
                    <Typography classes={{ root: styles.title }} variant="h5">
                        Авторизация
                    </Typography>
                    {
                        data && data.msg && <Alert sx={{marginBottom: '20px'}} severity="error">{data.msg}</Alert>

                    }
                    <TextField
                        className={styles.field}
                        label="E-Mail"
                        fullWidth
                        onChange={(e) => onChangeEmail(e)}
                        value={email}
                    />
                    <TextField type="password" className={styles.field} label="Пароль" fullWidth onChange={(e) => onChangePassword(e)} value={password}/>
                    <Button type="submit" size="large" variant="contained" fullWidth>
                        Войти
                    </Button>
                </form>
            </Paper>
            :
            <Paper classes={{ root: styles.root }}>
                <Alert sx={{marginBottom: '20px'}} severity="success">Вы успешно авторизовались!</Alert>
                <Link to="/">
                    <Button>Вернуться на главную</Button>
                </Link>
            </Paper>
    );
});
