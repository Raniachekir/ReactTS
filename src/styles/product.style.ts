import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
const productsStyle = makeStyles((theme: Theme) => ({
  header: {
    "& .css-ahj2mt-MuiTypography-root": {
      float: "left !impotant",
      color: "red !important",
      textAlign: "center",
      padding: "10px",
      textDecoration: "none",
      fontDize: "18px",
      lineHeight: "15px",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: "#ddd",
        color: "#5d6770",
      },
      "&:active": {
        backgroundColor: "#917c49",
        color: "white",
      },
      [theme.breakpoints.up(500)]: {
        float: "none" ,
        display: "block",
        textAlign: "left"
      }
    },

    overflow: "hidden",
   /* backgroundColor: "#f1f1f1",
    [theme.breakpoints.up(1500)]: {
      backgroundColor: "red",
    },
    [theme.breakpoints.between(1200, 1500)]: {
      backgroundColor: "blue",
    },
    [theme.breakpoints.down(1200)]: {
      backgroundColor: "white",
    }, */
  },

  headerPlogo: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "#5c5239",
  },

  headerRight: {
    float: "right",
    [theme.breakpoints.up(500)]: {
      float: "none"
    }
  },

  /*@media screen and (maxWidth: "500px") :{
  headerP :{
      float: "none" ,
      display: "block",
      textAlign: "left"
  },
  headerRight :{
      float: "none"
  }

*/

buttonStyle : {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  '& > * ' : {
    margin: theme.spacing(1),
  },
},

textStyle : {
  '& > * ' : {
    margin: theme.spacing(1),
    width: "25ch",
  },
},

}));

export default productsStyle;
