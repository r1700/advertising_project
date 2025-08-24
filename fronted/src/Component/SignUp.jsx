import * as React from 'react';
import {
    Button,
    FormControl,
    FormControlLabel,
    Checkbox,
    InputLabel,
    OutlinedInput,
    TextField,
    InputAdornment,
    Link,
    Alert,
    IconButton,
    FormHelperText,
} from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email'; import NewspaperIcon from '@mui/icons-material/Newspaper';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchSignUp, getDetailes } from '../redux/userSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { setemailDetails } from '../redux/userSlice';
import Snackbar from '@mui/joy/Snackbar';
// import Button from '@mui/joy/Button';


const providers = [{ id: 'credentials', name: 'SignUp' }];
export default function SlotsSignUp() {

    const location = useLocation();
    const emailFromLogin = location.state?.email || '';
    const passwordFromLogin = location.state?.password || '';

    const theme = useTheme();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const animationDuration = 600;

    //הערת משתמש  קיים snackbar
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        value: 'משתמש קיים'
    });
    const { vertical, horizontal, open, value } = state;

    const handleClick = (newState) => {
        setState({ ...newState, open: true });
    }

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    //validation - בדיקת תקינות
    const [showErrorMessages, setShowErrorMessages] = useState({ email: false, password: false, phone: false, tz: false });

    const validateFields = (formData) => {

        const newErrorMessages = {
            email: false,
            password: false,
        };

        let isValid = true;

        if (!formData.name || !/^[a-zA-Z\s]{2,}$/.test(formData.name)) {
            isValid = false;
            newErrorMessages.name = true;// עדכן שגיאה לשם
        }
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            isValid = false;
            newErrorMessages.email = true; // עדכן שגיאה למייל
        }

        if (!formData.password || formData.password.length < 6) {
            isValid = false;
            newErrorMessages.password = true; // עדכן שגיאה לסיסמה
        }
        if (!formData.phone || !/^[0-9]{9,10}$/.test(formData.phone)) {
            isValid = false;
            newErrorMessages.phone = true;// עדכן שגיאה לטלפון
        }
        if (!formData.tz || !/^([0-9]){9,9}$/.test(formData.tz) && formData.tz.length < 9) {
            isValid = false;
            newErrorMessages.tz = true;// עדכן שגיאה לת"ז
        }
        setShowErrorMessages(newErrorMessages); // עדכן את מצב השגיאות
        return isValid; // מחזירים true אם אין שגיאות, אחרת false
    }


    function CustomDetailsField(user = 'acs') {
        // const {email,password}=useSelector(state => state.user)
        // const email = useSelector((state) => state.userReducer)
        // console.log("email===", email.email);

        return (
            <>
                <FormControl>
                    <TextField
                        id="input-with-icon-textfield-name"
                        label="name"
                        name="name"
                        type="text"
                        size="small"
                        // placeholder='Enter your name'
                        required
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle fontSize="inherit" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                    />
                    {/* הערה לשדה השם */}
                    {showErrorMessages.name && <FormHelperText> Name must contain at least 2 characters and only letters and spaces.</FormHelperText>} {/* הערה לשדה הסיסמה */}

                </FormControl>
                <FormControl>
                    <TextField
                        id="input-with-icon-textfield-email"
                        label="email"
                        name="email"
                        type="email"
                        size="small"
                        placeholder='example@gmail.com'
                        required
                        fullWidth
                        defaultValue={emailFromLogin}
                        // defaultValue={email.email}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon fontSize="inherit" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                    />
                    {/* הערה לשדה האימייל */}
                    {showErrorMessages.email && <FormHelperText> emaul is not valid.</FormHelperText>} {/* הערה לשדה הסיסמה */}

                </FormControl>
                <FormControl>
                    <TextField
                        id="input-with-icon-textfield-phone"
                        label="phone"
                        name="phone"
                        type="number"
                        size="small"
                        // placeholder='Enter your phone number'
                        required
                        fullWidth
                        slotProps={{

                            input: {

                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon fontSize="inherit" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                    />
                    {showErrorMessages.phone && <FormHelperText> Phone must contain 9 or 10 characters and only numbers.</FormHelperText>} {/* הערה לשדה הסיסמה */}

                </FormControl>
                <FormControl>
                    <TextField
                        id="input-with-icon-textfield-tz"
                        label="tz"
                        name="tz"
                        type="text"
                        size="small"
                        // required
                        // placeholder='Enter your tz'
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PermIdentityIcon fontSize="inherit" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="outlined"
                    />
                    {/* הערה לשדה ת"ז */}
                    {showErrorMessages.tz && <FormHelperText> Tz must contain 9 characters and only numbers.</FormHelperText>} {/* הערה לשדה הסיסמה */}

                </FormControl>

            </>
        );
    }

    function CustomPasswordField() {
        // const password = useSelector((state) => state.userReducer)

        const [showPassword, setShowPassword] = React.useState(false);

        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        return (
            <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
                <InputLabel size="small" htmlFor="outlined-adornment-password">
                    Password
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    size="small"
                    required
                    // fullWidth
                    defaultValue={passwordFromLogin}
                    // defaultValue={password.password}
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
                {/* הערה לשדה הסיסמה */}
                {showErrorMessages.password && <FormHelperText> Password must contain 4-8 numbers.</FormHelperText>} {/* הערה לשדה הסיסמה */}

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
                sx={{ my: 2, color: "brown", borderColor: "brown" }}
            >
                Sign up
            </Button>
        );
    }

    function Logo() {

        return <img
            src="../../../images/logo.jpg"
            style={{ height: 140 }}
        />
    }

    function Title() {

        return <h2 style={{ marginBottom: 15, color: "brown" }}>Sign up </h2>;
    }


    const handleSubmit = async (user) => {
        if (validateFields(user)) {
            setShowErrorMessages(false);
            try {
                const res = await dispatch(fetchSignUp(user)).unwrap()
                switch (res.status) {
                    case 201:
                        navigate('/Subscriptions');

                        break;
                    case 409:
                        // setexistUser(true)
                        handleClick({ vertical: 'top', horizontal: 'center', value: 'משתמש קיים' })
                        break;
                    case 400:
                        handleClick({ vertical: 'top', horizontal: 'center', value: 'שדות חסרים' })
                        break;
                    case 404:
                        alert("404")
                        break;
                }
                dispatch(getDetailes())
            }
            catch (error) {
                navigate('/SignUp')
            }
        }
    }


    return (
        <>
            {/*Snackbar התחלת  */}
            <Snackbar
                anchorOrigin={{ vertical, horizontal, value }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
                color='danger'
                sx={{ direction: 'rtl' }}
                endDecorator={
                    <Button

                        onClick={() => handleClose()}
                        size="small"
                        color="inherit"
                        variant="soft"
                        // color="brown"
                        sx={{ direction: 'rtl', marginRight: 14 }}
                    >
                        x
                    </Button>
                }
            >
                {state.value}
            </Snackbar>
            {/* Snackbar סיום */}

            <AppProvider theme={theme}>
                <SignInPage
                    signIn={(provider, formData) => {
                        const user = {
                            name: formData.get("name"),
                            email: formData.get("email"),
                            phone: formData.get("phone"),
                            tz: formData.get("tz"),
                            password: formData.get("password")
                        }
                        handleSubmit(user)
                    }}
                    slots={{
                        subtitle: Title,
                        title: Logo,
                        emailField: CustomDetailsField,
                        passwordField: CustomPasswordField,
                        submitButton: CustomButton,
                    }}
                    providers={providers}
                />
            </AppProvider>
        </>
    );
}
