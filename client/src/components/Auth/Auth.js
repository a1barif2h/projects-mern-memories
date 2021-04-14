import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import React, { useState } from 'react';
import GoogleLogin from "react-google-login";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn, signUp } from "../../redux/actions/auth";
import { AUTH } from '../../redux/types';
import Icon from './Icon';
import Input from './Input';
import useStyles from "./styles";

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch()
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const [formData, setFormData] = useState(initialState)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signUp(formData, history))
        } else {
            dispatch(signIn(formData, history))
        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})

    }

    const changeMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false)
    }
    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type: AUTH, data: {result, token}})
            history.push("/")
        } catch (error) {
            console.log(error)
        }
    };
    const googleFailure = (err) => {
        console.log(err)
        console.log("Google login unsuccessful! Please Try again..")
        //add-memory-310608 --project id
        //535061900123-8ftkfj1s9evaneptd4ufvh5i10oiu0ok.apps.googleusercontent.com --clientId

        //oFFADPYU7GGiJOiOf1h-lB5r --secretKey
    };
    return (
        <>
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5"> {isSignUp ? "Sign Up" : "Sign In"} </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {
                                isSignUp && (
                                    <>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </>
                                )
                            }
                            <Input name="email" label="Email address" handleChange={handleChange} type="email" />
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}  />
                            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                        </Grid>
                        <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit}>
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                        <GoogleLogin
                            clientId="535061900123-8ftkfj1s9evaneptd4ufvh5i10oiu0ok.apps.googleusercontent.com"
                            render={(renderProps) => (
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant="contained"
                            >
                                Google Sign In
                            </Button>)}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={changeMode}>
                                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default Auth;