import * as React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Box, Button, Checkbox, Fade, FormControlLabel, Input, Stack, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';
import { newRealization } from '../redux/RentalHistorySlice';
import { useSelector } from 'react-redux';
import { validateDate } from '@mui/x-date-pickers';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Divider from '@mui/joy/Divider';

const lastMonday = dayjs().startOf('week');
// const nextSunday = dayjs().endOf('week').startOf('day');
// const nextWednesday = dayjs().day('3');
const nextWednesday = dayjs().add(((3 - dayjs().day() + 7) % 7) || 7, 'day').startOf('day');


const isWeekend = (date) => {
    const d = date.$d
    const day = date.day();
    const today = dayjs()
    return day !== 3;
    //מאפשר לבחור רק יום רביעי
};

export default function NewRental() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();

    const [avatarSrc, setAvatarSrc] = React.useState(undefined);
    const [show, setShow] = useState(false)
    const [note, setnote] = useState()

    const user = useSelector((state) => state.userReducer)
    const userId = user.data.id;

    const [chooseDateAd, setChooseDateAd] = useState(nextWednesday)

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarSrc(reader.result);
                setShow(true)
            };
            reader.readAsDataURL(file);
        }
    };

    const addRental = async () => {
        try {

            const rel = {
                points: 1,
                userId: userId,
                img: avatarSrc,
                //לא מכיר הנתונים של הקומפוננטה הפנימית!!!
                // date: chooseDateAd.$d,
                date: dayjs(chooseDateAd).format('YYYY-MM-DD'),
                Notes: note,
                PurchaseId: location.state.purchase.id
            }
            const pur = location.state.purchase
            pur.pointsBalance--

            const res = await dispatch(newRealization(rel)).unwrap()
            switch (res.status) {
                case 201:          
                    // alert('הצלחה');
                    navigate('/Realization');
                    break;
                case 404:
                    console.log("---404");
                    break;
            }
        }
        catch (error) {
            console.error('error:', error);
        }
    }
    return (
        <>
            <Stack spacing={2} direction="row-reverse"
            //  sx={{padding:4,border:"solid" , borderColor:"brown",borderWidth:0.7,elevation:222 }}
            >
                <Stack sx={{ gap: 2, display: 'flex', direction: 'rtl' }}>

                    {/* התחלת בחירת תאריך */}
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer
                            sx={{ justifyContent: 'center' }}
                            components={['DatePicker']}
                        >
                            <DemoItem label="בחר תאריך פרסום">
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    defaultValue={nextWednesday}
                                    shouldDisableDate={isWeekend}
                                    views={['year', 'month', 'day']}
                                    disablePast='false'
                                    onChange={(event) => { setChooseDateAd(event) }}
                                //  minDate={nextSunday}

                                />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider >
                    {/* סיום בחירת תאריך */}

                    <TextField
                        label="הערות"
                        onChange={(event) => setnote(event.target.value)}
                        sx={{
                            direction: 'rtl',
                            textAlign: 'center',

                            borderColor: "brown",
                            color: "brown",
                            ":active": {
                                // backgroundColor:"brown",
                                // border:"solid",
                                borderColor: "brown",
                                color: "brown"
                            }
                        }}
                    >
                    </TextField>
                    <FormControlLabel control={<Checkbox />} label="נדרש עיצוב" />
                    <div label="Upload new avatar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      
                        <ButtonBase
                            component="label"
                            role={undefined}
                            tabIndex={-1} // prevent label from tab focus
                            aria-label="Avatar image"
                            label="Upload new avatar"
                        >
                            <FolderOpenIcon alt="Upload new avatar" fontSize='large' sx={{}} label="Upload new avatar" />
                            <input
                                type="file"
                                accept="image/*"
                                style={{
                                    // border: 0,
                                    // clip: 'rect(0 0 0 0)',
                                    height: '1px',
                                    margin: '-1px',
                                    overflow: 'hidden',
                                    padding: 0,
                                    position: 'absolute',
                                    whiteSpace: 'nowrap',
                                    width: '1px',
                                }}
                                onChange={handleAvatarChange}
                            />
                        </ButtonBase>
                    </div>
                    <Button size="small" color="inherit" onClick={() => addRental()} sx={{ border: 'solid brown 1.5px' }} >
                        שלח
                    </Button>
                </Stack>

                <Divider orientation="vertical">פרסום חדש </Divider>

                <Stack>
                    {avatarSrc && <Switch defaultChecked onClick={() => setShow((prev) => !prev)}
                     sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: 'brown', // צבע הכפתור כשהוא דלוק
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'brown', // צבע הרקע כשהוא דלוק
                        },
                    }}
                    ></Switch>}

                    <Fade in={show} width={200} >
                        {<img width="100" src={avatarSrc}></img>}
                    </Fade>
                </Stack>
            </Stack>

        </>
    );
}


