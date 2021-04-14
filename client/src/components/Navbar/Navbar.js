import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import decode from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import memories from "../../images/memories.png";
import { LOGOUT } from '../../redux/types';
import useStyles from "./styles";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const logOut = () => {
        dispatch({type: LOGOUT})
        history.push("/")
        setUser(null)
    }
    useEffect(() => {
        const token = user?.token;
        
        if(token) {
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logOut();
        }

        setUser(JSON.parse(localStorage.getItem("profile")))
    },[location])
    return (
        <>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                    <img className={classes.image} src={memories} alt="" height="60"/>
                </div>
                <Toolbar className={classes.toolbar}>
                    {user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" color="primary" variant="contained">Sign IN</Button>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;