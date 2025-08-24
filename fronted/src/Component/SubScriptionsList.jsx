import { useSelector } from "react-redux";
import MultiActionAreaCard from "./SubScription";
import { Alert, Box, Stack } from "@mui/material";
import { getSubScription } from "../redux/SubScriptionSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductList from "./productList";
import { getPurchase } from "../redux/purchaseHistorySlice1";
import { colors } from "@mui/joy";

const SubScriptionsList = () => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getSubScription());
  }, [dispatch]);




  const cards = useSelector((state) => state.subScriptionReducer.subscription)
  const location = useLocation();

  const pictures = [
    // '../../../images/8.png',
    // '../../../images/4.png',
    // '../../../images/1.png',
    '../../../images/sit.jpg',
    '../../../images/usb.jpg',
    '../../../images/vi.jpg',
    '../../../images/pazle.jpg',
    '../../../images/sit.jpg']

  return (<>

    <h1 style={{ color: "#3682A1" }}>רכישת חבילה</h1>

    {location.state && location.state.size === 0 ?
      <Stack sx={{ width: '100%', marginBottom: 10 }} spacing={2}>
        <Alert sx={{ justifyContent: "center" }} severity='info' >אין השכרות פעילות</Alert>
      </Stack>
      : null
    }

    <Box

      sx={{

        width: '100%',
        // margin:'0 0 0px 0',
        display: 'flex',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 5,
      }}
    >
      {cards && cards.map((card, index) => (
        

          <MultiActionAreaCard key={index} detailes={card} pictures={pictures[index]} ></MultiActionAreaCard>
        
      ))}


    </Box >

    {/* {<ProductList></ProductList>} */}
  </>);
}
export default SubScriptionsList;
