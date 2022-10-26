import { Component, useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, ButtonGroup, Checkbox, Modal, TextField, Typography } from "@mui/material";
import productsStyle from "../styles/product.style";
//import {useStore} from "../useStore/useStoreProduct";
//import  {Product}  from "../store/productStore";
import {Product} from '../interfaces/product'
import { Alert, Snackbar } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ProductServices from "../services/products.services";
import { style } from "@mui/system";
import {  useSelector, useDispatch } from 'react-redux';
import { RootState,setListProducts,  deleteProducts, getProducts, AppDispatch, setOpenAlert } from "../store/productStore";
import View from "./View";





const Home : React.FC = () => {
  const [checked, setChecked] = useState(true);
  const products = useSelector((state : RootState) => state.product.listProducts);
  const dispatch :AppDispatch= useDispatch();
  const [ProductsData, setProductsData] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    published: false,
    sizeId: 0,
  });

  
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();  
  const location = useLocation();
/*const [message, setMessage] = useState("");
const [error, setError] = useState(false);
const [openAlert, setOpenAlert] = useState(false);*/
let {error,openAlert,message} = useSelector(
  (state: RootState) => state.product
);
const handleCloseAlert = () => {
 dispatch(setOpenAlert(false));
};
  const classes=productsStyle()
  //const { productStore } = useStore();



 // const [ProductsData, setProductsData] = useState<Products[] | null>(null);
 //const [ProductsData, setProductsData] = useState<Array<productStore.Products>>([]);

 //console.log("products",productStore.listProducts)
 let { id } = useParams();
 let idProductToEdit=parseInt(id?id:"0")
 useEffect(() => {
  //if(productStore.listProducts.length===0){dispatch(getProducts())}
  if(products.length===0){dispatch(getProducts())}

  if (idProductToEdit) {
    getSingleProduct(idProductToEdit);
  }
    
 }, []);
  

const onDeleteProduct = async (id : number) => {

  if (
    window.confirm("Are you sure that you wanted to delete that product record")
  ) {
      dispatch(deleteProducts(id))
 // setMessage("Success");
  
} else {
 // setError(true);
  //setMessage("Error");
}
//setOpenAlert(true);

 }
const handleClose = () => {
  setShow(false)
}
const handleOpen = () =>{
  setShow(true)
}




const getSingleProduct = async (id: number) => {

let productToUpdate = products.find( /* listeProduct*/
  (element: Product) => element.id == id
);
if (productToUpdate) {
  
  
  if (productToUpdate.published==false) {
    setChecked(false)
  } else {setChecked(true)}
  setProductsData(productToUpdate);
}
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 console.log("data=>",(products)); /* listeProduct*/
    return (

      
    <div style={{marginTop: "50px"}}>
          

  <Modal
  open={show}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"

  
>
  <Box sx={style}>
  <Typography id="modal-modal-title" variant="h6" component="h2">
      Product Details
    </Typography>
    <TextField
          type="text"
          id="standard-basic"
          label="Id"
          name="id"
          variant="standard"
          value={ProductsData.id}
        /> <br/>
  <TextField
          type="text"
          id="standard-basic"
          label="Title"
          name="title"
          variant="standard"
          value={ProductsData.title}
        />

        <br />
        <TextField
          type="text"
          id="standard-basic"
          label="Price"
          name="price"
          variant="standard"
          value={ProductsData.price}
        />
        <br />
        <TextField
          type="text"
          id="standard-basic"
          label="Description"
          name="description"
          variant="standard"
          value={ProductsData.description}
        />
        <br />
        
        <Checkbox
        checked={checked}
        name="published"
        id="published"
        value={ProductsData.published}
        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
      
      />
        <br />
        <TextField
          type="text"
          id="standard-basic"
          label="Size"
          name="sizeId"
          variant="standard"
          value={ProductsData.sizeId}
        /> <br/><br/>
         <Button
            style={{
              display: "block",
              margin: "0 auto",
            }}
            value="annuler"
            type="submit"
            variant="contained"
            aria-label="contained primary button group"
            color="primary"
            onClick={handleClose}>
            Annuler
          </Button>
  </Box>
</Modal>
          <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={error?"error":"success"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar> 
      <TableContainer component={Paper}>
       <Table sx={{ minWidth: 900 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Published</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
         <TableBody>
          
          {products && (products).map((item, index) => {
            
            console.log("item",item)
            
              return (
                
            <TableRow
              key={index}
              
              //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell  scope="row">
                {item.id}
              </TableCell>
              <TableCell align="right">{item.title}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">
              <Checkbox
                checked={item.published==true?true:false}
                name="published"
               id="published"
                value={item.published}
              inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
       
        />

              </TableCell>
              <TableCell align="right">{item.sizeId}</TableCell>
              <TableCell align="center">
               <div className={classes.buttonStyle}>
               <ButtonGroup variant="contained" aria-label="contained primary button group">
                 <Button color="primary"  onClick={() => navigate(`/update/${item.id}`) }> Edit</Button>
                 <Button color="secondary" onClick={() => onDeleteProduct(item.id)}>Delete</Button>
                 <Button color="success" onClick={function(event){getSingleProduct(item.id);handleOpen()}}>View</Button>
               </ButtonGroup>
               </div> 
              </TableCell>
            </TableRow>
            
              );
              
           })}
          </TableBody>  
        
      </Table>
    </TableContainer>
        
        </div>
    )

}
export default Home;