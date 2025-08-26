import * as React from 'react';
import '../css/login.css'
import {
    Button, FormControl,
    FormControlLabel,
    Checkbox,
    InputLabel,
    OutlinedInput,
    TextField,
    InputAdornment,
    Link,
    Alert,
    IconButton,
    FormHelperText
} from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom'; // ודא ש-useNavigate מיובא
import { NavLink } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLogin, getDetailes, sePasswordDetails, setemailDetails } from '../redux/userSlice';
import { Snackbar } from '@mui/joy';
import { useSelector } from 'react-redux';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export default function SlotsSignIn() {
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const [details, setDetails] = useState({ email: '', password: '' }); 

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleClick = (newState) => {
        setState({ ...newState, open: true });
    }

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        value: ''
    });
    const { vertical, horizontal, open, value } = state;

    const [showErrorMessages, setShowErrorMessages] = useState({ email: false, password: false });

    const validateFields = (formData) => {
        const newErrorMessages = {
            email: false,
            password: false,
        };

        let isValid = true;

        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            isValid = false;
            newErrorMessages.email = true;
        }
        if (!formData.password || formData.password.length < 6) {
            isValid = false;
            newErrorMessages.password = true;
        }
        setShowErrorMessages(newErrorMessages);

        return isValid;
    }

    const handleSubmit = async (user) => {
        if (validateFields(user)) {
            setShowErrorMessages(false);
            try {                
                
                const res = await dispatch(fetchLogin(user)).unwrap()
                console.log("res",res);
                
                switch (res.status) {
                    case 200:
                        navigate('/ActiveRental')
                        break;
                    case 404:
                        // User not found
                        // navigate('/SignUp', { state: { email: user.email, password: user.password } })
                        handleClick({ vertical: 'top', horizontal: 'center', value: res.data })
                        break;
                }
                dispatch(getDetailes())
            }
            catch (error) {
                console.error('error:', error);
            }
        }
    }


    function CustomEmailField() {
        return (
            <FormControl fullWidth>
                <TextField
                    id="input-with-icon-textfield"
                    label="email"
                    name="email"
                    type="email"
                    size="small"
                    placeholder='example@gmail.com'
                    required
                    fullWidth
                    inputRef={emailInputRef} // קשר את ה-ref לכאן
                    // ללא value או onChange כדי לאפשר ל-SignInPage לשלוט בקלט
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle fontSize="inherit" sx={{ color: "" }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined"
                />
                {showErrorMessages.email && <FormHelperText>Enter a valid email address.</FormHelperText>}
            </FormControl>
        );
    }

    function CustomPasswordField() {
        const [showPassword, setShowPassword] = React.useState(false);

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        return (
            <FormControl style={{}} sx={{ my: 1 }} fullWidth variant="outlined" >
                <InputLabel size="small" htmlFor="outlined-adornment-password"
                >
                    Password
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    size="small"
                    required
                    inputRef={passwordInputRef} // קשר את ה-ref לכאן
                    // ללא value או onChange כדי לאפשר ל-SignInPage לשלוט בקלט
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="small"
                            >
                                {showPassword ? (
                                    <VisibilityOff fontSize="inherit" />
                                ) : (
                                    <Visibility fontSize="inherit" />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
                {showErrorMessages.password && <FormHelperText> Password must contain 4-8 numbers.</FormHelperText>}
            </FormControl>
        );
    }

    function CustomButton() {
        return (
            <Button
                type="submit"
                variant="outlined"
                color="info"
                size="small"
                disableElevation
                fullWidth
                sx={{ my: 2, color: "brown", borderColor: "brown", ":hover": { borderColor: "brown", backgroundColor: "white" } }}
            >
                Log In
            </Button>
        );
    }

    function SignUpLink() {
        const handleNavigateToSignUp = (event) => {
            event.preventDefault();  
            const currentEmail = emailInputRef.current ? emailInputRef.current.value : '';
            const currentPassword = passwordInputRef.current ? passwordInputRef.current.value : '';

            navigate('/SignUp', { state: { email: currentEmail, password: currentPassword } });
        };

        return (
            <span
                onClick={handleNavigateToSignUp}  
                style={{ color: 'black', cursor: 'pointer' }} // מוסיפים סמן עכבר שמצביע שזה לחיץ
            >
                Don't have account?
            </span>
        );
    }


    function Logo() {
        return <img
            src="../../../images/logo.jpg"
            style={{ height: 140 }}
        />
    }

    function Title() {
        return <h2 style={{ marginBottom: 15, color: "brown" }}>Login</h2>;
    }

    return (
        <>
            {/*Snackbar התחלת  */}
            <Snackbar
                anchorOrigin={{ vertical, horizontal, value }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
                color='warning'
                sx={{ direction: 'rtl' }}
                endDecorator={
                    <Button
                        onClick={() => {
                            handleClose(), navigate('/SignUp', { state: { email: details.email, password: details.password } });
                        }}
                        size="small"
                        color="inherit"
                        variant="soft"
                        sx={{ marginRight: 14, direction: 'rtl', ":hover": { backgroundColor: "#F0BD52" }, backgroundColor: "#F4CC7C" }}
                    >
                        לרישום
                    </Button>
                }
            >
                {state.value}
            </Snackbar>
            {/*Snackbar סיום  */}

            <AppProvider theme={theme}>
                <SignInPage
                    signIn={(provider, formData) => {
                        const user = {
                            email: formData.get("email"),
                            password: formData.get("password")
                        }
                        setDetails({ email: user.email, password: user.password });
                        handleSubmit(user)
                    }}
                    slots={{
                        subtitle: Title,
                        title: Logo,
                        emailField: CustomEmailField,
                        passwordField: CustomPasswordField,
                        submitButton: CustomButton,
                        signUpLink: SignUpLink,
                    }}
                    providers={providers}
                />
            </AppProvider>
        </>
    );
}