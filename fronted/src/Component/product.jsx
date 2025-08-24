import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useDispatch } from 'react-redux';
import { addPurchase } from '../redux/purchaseHistorySlice1';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function CardProduct({ detailes, subs,pictures }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.userReducer)
  const userId = user.data.id;
 
  const pur = {
    PointsBalance: subs.amountPoints,
    Date: new Date(),
    userId: userId,
    productId: detailes.id,
    SubScriptionId: subs.id
  }
  
  const handleClick = async () => {
    try {
      const res = await dispatch(addPurchase(pur)).unwrap()
      // const res2 = await dispatch(payment(pur)).unwrap()

      switch (res.status) {
        case 201:
          // alert('הצליח')
          //  navigate('/payment', { state: { purchase: res.data } })
          navigate('/ActiveRental')
          break;
        case 404:
          console.error("not found");
          break;
      }
    }
    catch (error) {
      console.error('error:', error);


    }
  }

  return (
    <>
      <Card sx={{ width: "120px" }}>
        <CardActionArea>
          <CardMedia
          sx={{height:"100%"}}
            component="img"
            height="140"
            alt={detailes.name + "_img"}
            image={pictures}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {detailes.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {detailes.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => handleClick()}
            sx={{
              color:"brown",
              border:"solid brown 1px",
              margin: 'center',
              "&:hover":{borderColor:"#3682A1"}
            }}>
            לבחירה
          </Button>
        </CardActions>
      </Card>

      <Card>

      </Card>
    </>
  );
}
