import CardProduct from "./product";
import { Box, Paper } from "@mui/material";
import { getProducts } from "../redux/productSlice1";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";



const ProductList = ({ state }) => {

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  const cards = useSelector((state) => state.productReducer.products)
  const pictures = [
    '../../../images/full_page.jpg',
    '../../../images/2_w.jpeg',
    '../../../images/2_h.jpeg',
    '../../../images/4.jpeg',
    '../../../images/16.jpeg']

  // const icon = (
  //   <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
  //     <svg>
  //       <Box
  //         component="polygon"
  //         points="00,50 100,50"


  //         sx={(theme) => ({
  //           fill: theme.palette.common.white,
  //           stroke: theme.palette.divider,
  //           strokeWidth: 1,
  //         })}
  //       />
  //     </svg>
  //   </Paper>
  // );


  return (<>
  <h2 style={{color:"#3682A1"}}>גודל פרסומת</h2>
    {/* {icon} */}
    
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {cards && cards.map((card, index) => (
       
          <CardProduct key={index} detailes={card} subs={location.state && location.state.subs } pictures={pictures[index]}></CardProduct>

      ))}
    </Box>
  </>);
}

export default ProductList;
