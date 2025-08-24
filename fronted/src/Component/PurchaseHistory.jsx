import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
// import { Alert, colors } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { ButtonGroup } from '@mui/joy';
import { deletePurchase, getPurchase } from '../redux/purchaseHistorySlice1';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { getSubScription } from '../redux/SubScriptionSlice';
import { getProducts } from '../redux/productSlice1';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function PurchaseHistory() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let user = useSelector((state) => state.userReducer)
    const subscription = useSelector((state) => state.subScriptionReducer.subscription)
    const product = useSelector((state) => state.productReducer.products)
    const purchaseHistory = useSelector((state) => state.purchaseHistoryReducer.purchases)

    const [open, setOpen] = React.useState(false);



    useEffect(() => {
        navigate();
    }, []);

    useEffect(() => {
        dispatch(getPurchase(user.data));
        dispatch(getSubScription());
        dispatch(getProducts());
    }, [dispatch, user.data]);

    // בדיקה אם רכישות נטענו     
    const isLoaded = Array.isArray(purchaseHistory?.data);
    // const p = isLoaded ? purchaseHistory.data.filter((purchase) => purchase.pointsBalance > 0).reverse() : [];
    const p = isLoaded ? purchaseHistory.data : [];

    useEffect(() => {
        if (isLoaded && p.length === 0) {
            navigate('/Subscriptions', { state: { size: 0 } });
        }
    }, [isLoaded, p.length, navigate]);

    //אם רכישות לא נטענו, מציג הודעת טעינה
    if (!isLoaded) {
        return (
            <>
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress sx={{ color: "brown" }} />
                    <CircularProgress sx={{ color: "#F0BD52" }} />
                    <CircularProgress sx={{ color: "#3682A1" }} />
                </Stack> <div>טוען נתונים...</div>
            </>
        )

    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClick = (purchase1) => {
        navigate('/newRental', { state: { purchase: purchase1 } })
    }

    const deleteClick = async (purchase) => {
        setOpen(false);
        try {
            const res = await dispatch(deletePurchase(purchase)).unwrap()
            switch (res.status) {
                case 204:
                    //
                    dispatch(getPurchase(user.data))
                    navigate('/PurchaseHistory')
                    break;
                case 404:
                    console.log("not found");
                    break;
            }
        }
        catch (err) {
            throw err
        }
    }


    return (
        <>
            <h1 style={{ color: '#3682A1', textAlign: 'center' }}>הרכישות שלי</h1>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'white',
                        color: '#3682A1',
                        border: 'solid #3682A1 1px',
                        fontWeight: 'bold',
                        fontSize: 16,
                        borderRadius: 2,
                   
                    }}
                    onClick={() => navigate('/\ActiveRental')}>הפעילות </Button>
            </Box>
            <Box
                sx={{
                    // width: '120%',
                    display: 'flex',
                    // gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                    gap: 2,
                    flexDirection: 'column-reverse',
                    justifyContent: 'start'
                }}
            >
                {

                    p.map((purchase, index) => (
                        < Card sx={{
                            // textAlign:'end'
                        }} 
                        key={index}>

                            <CardActionArea
                                sx={{
                                    color: "brown",
                                    height: '120%',
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography variant="h6" component="div">
                                        חבילה: {subscription.find(s => s.id === purchase.subScriptionId).description}
                                    </Typography>
                                    <Typography variant="h7" >
                                        גודל מודעה: {product.find(s => s.id === purchase.subScriptionId)?.name}
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary">
                                        יתרת פרסומים:{purchase.pointsBalance}
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary">
                                        תאריך רכישה:{purchase.date && new Date(purchase.date).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            {purchase.pointsBalance > 0 && <Stack sx={{
                                width: "100%",
                                borderTop: 2,
                                borderColor: 'brown',
                            }}>
                                <ButtonGroup sx={{ display: 'flex' }}>
                                           {purchase.pointsBalance === subscription.find(s => s.id === purchase.subScriptionId).amountPoints && <Button
                                        sx={{
                                            color: 'brown',
                                            flex: '8',
                                            borderRadius: '0',
                                        }}
                                        size="small"
                                        onClick={handleClickOpen}
                                    >
                                        ביטול רכישה
                                    </Button>}
                                    {/* פותח דיאלוג אישור מחיקה */}
                                    <Dialog
                                        open={open}
                                        slots={{
                                            transition: Transition,
                                        }}
                                        keepMounted
                                        onClose={handleClose}
                                        aria-describedby="alert-dialog-slide-description"
                                    >
                                        <DialogTitle sx={{ direction: 'rtl' }}>{"האם אתה בטוח שברצונך למחוק רכישה זו?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-slide-description">
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions sx={{ direction: 'rtl' }}>
                                            <Button onClick={handleClose} sx={{ color: '#3682A1' }}>ביטול</Button>
                                            <Button onClick={() => deleteClick(purchase)} sx={{ color: '#3682A1' }}>מחק</Button>
                                        </DialogActions>
                                    </Dialog>
                                    {/* סגירת דיאלוג אישור מחיקה */}


                                    <Button sx={{ color: 'brown', flex: '20', borderRadius: '0' }} size="small" onClick={() => handleClick(purchase)}>
                                        מימוש יתרה
                                    </Button>
                                </ButtonGroup>
                            </Stack>}
                        </Card >
                    ))
                }

            </Box >

            {/* כפתור רכישת חבילה חדשה */}
            <Tooltip title="רכישת חבילה" placement="left">
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        mt: 2, // מרווח מעל
                        backgroundColor: '#3B6B7F',
                        ":hover": {
                            backgroundColor: 'brown',
                        }
                    }}
                    onClick={() => navigate('/Subscriptions')}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>

        </>
    );
}

export default PurchaseHistory;





