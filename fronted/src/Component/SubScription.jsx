import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import { useDispatch } from 'react-redux';
import { addPurchase } from '../redux/purchaseHistorySlice1';
import { useSelector } from 'react-redux';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductList from './productList';
import { useState } from 'react';

export default function MultiActionAreaCard({ detailes, pictures }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [chooseSubscription, setChooseSubscription] = useState(false);
  const user = useSelector((state) => state.userReducer)
  const userId = user.data.id;

  const pur = {
    PointsBalance: detailes.amountPoints,
    Date: new Date(),
    userId: userId,
    SubScriptionId: detailes.id
  }

  const handleClick =  (detailes) => {
 
   //   const res = await dispatch(addPurchase(pur)).unwrap()

          setChooseSubscription(true)
          navigate('/ProductList',{state:{subs:detailes}})
       
  }

  return (
    <>
      <Card sx={{ width: '10vw', color: "brown" }} key={detailes.id}>
        <CardActionArea
        // sx={{"Card:hover":{backgroundColor:'black'}}}
        >

          <CardMedia
            component="img"
            height="140"
            image={pictures}
            alt="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {detailes.description}
            
            </Typography>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {detailes.description}
          </Typography> */}
          </CardContent>
        </CardActionArea>
        <Stack>
          <Button size="small" onClick={() => handleClick(detailes)}
            sx={{
              width: '100%',
              borderTop: 2,
              borderTopColor: 'brown',
              borderRadius: 0,
              color: 'brown',
              ":hover": { color: "black", borderTopColor: 'black' },
              ":active": { color: "black", borderTopColor: 'black' }
              // marginLeft: '25%'
            }}>
            לרכישה
          </Button>
        </Stack>
      </Card>
    
    </>
  );
}
