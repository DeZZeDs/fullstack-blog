import React, {useCallback, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, setLogged} from "../../store/Slices/authSlice";
import {Link} from "react-router-dom";

export const Registration = () => {
    const isAuth = useSelector((state) => state.authReducer.logged);
    const { data } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeName = useCallback((event) => {
        setName(event.target.value);
    },[]);

    const onChangeEmail = useCallback((event) => {
        setEmail(event.target.value);
    },[]);

    const onChangePassword = useCallback((event) => {
        setPassword(event.target.value);
    },[]);

    const onSubmitRegister = (event) => {
        event.preventDefault();
        const params = {fullName: name, email, passwordHash: password};
        dispatch(fetchRegister(params));
        console.log(params);
    }

    if(data && data.token) {
        window.localStorage.setItem('token', data.token);
        dispatch(setLogged(true));
    }

    return (
        !isAuth ?
        <Paper classes={{ root: styles.root }}>
            <form onSubmit={(e) => onSubmitRegister(e)}>
                <Typography classes={{ root: styles.title }} variant="h5">
                    Регистрация
                </Typography>
                {
                    data && data.errors && data.errors.map((error, index) => (
                        <Alert key={index} sx={{marginBottom: '20px'}} severity="error">{error.msg}</Alert>
                    ))
                }
                <TextField className={styles.field} label="Имя" fullWidth onChange={(e) => onChangeName(e)}/>
                <TextField className={styles.field} label="E-Mail" fullWidth onChange={(e) => onChangeEmail(e)}/>
                <TextField className={styles.field} label="Пароль" fullWidth onChange={(e) => onChangePassword(e)}/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
        :
        <Paper classes={{ root: styles.root }}>
            <Alert sx={{marginBottom: '20px'}} severity="success">Вы успешно зарегистрировались!</Alert>
            <Link to="/">
                <Button>Вернуться на главную</Button>
            </Link>
        </Paper>
    );
};
