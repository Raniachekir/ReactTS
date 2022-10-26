import { Component, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import productsStyle from "../styles/product.style";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { setConstantValue } from "typescript";
import { Alert, Snackbar } from "@mui/material";
//import { useStore } from "../useStore/useStoreProduct";
import { Product } from "../interfaces/product";
import { useSelector, useDispatch } from "react-redux";
import { useFormik, Formik } from 'formik';
import * as yup from 'yup';
import {
  RootState,
  setOpenAlert,
  updateProducts,
  addProducts,
  AppDispatch,
  getProducts,
} from "../store/productStore";
import Checkbox from '@mui/material/Checkbox';

const validationSchema = yup.object({
   title: yup
    .string()
    //.email('Enter a valid email')
    .required('Title is required'),
  price: yup
    .number()
    .min(3, 'Price should be of minimum 3 characters length')
    .required('Price is required'),
  description: yup
    .string()
    .required('Description is required'),
  sizeId: yup
    .number()
    //.min(2, 'Password should be of minimum 2 characters length')
    .required('Size is required'),
});

const AddEdit: React.FC = () => {
  const [checked, setChecked] = useState(false);

  let products = useSelector(
    (state: RootState) => state.product.listProducts
  );

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  let { id } = useParams();
  let idProductToEdit = parseInt(id ? id : "0");
  useEffect(() => {
    console.log("useeeffect", idProductToEdit);
    dispatch(getProducts()).then((data) => {
      
      if (idProductToEdit&&idProductToEdit!==0) {
        let productToUpdate = data.payload.find(
          /* listeProduct*/
          (element: Product) => element.id == idProductToEdit
        );
        

        if (productToUpdate) {
          const checkbox = document.getElementById(
            'published',
          ) as HTMLInputElement ;
          console.log("cheched",productToUpdate.published)
          if (productToUpdate.published==0) {
            setChecked(false) 
            //checkbox.checked= false;
          } else { //checkbox.checked=true;
            console.log("check")
            setChecked(true)
              }
          setProductsData(productToUpdate);
          
        }      }
        else{
          
          setProductsData({
            id: 0,
            title: "",
            price: 0,
            description: "",
            published: false,
            sizeId: 0,
          })
        }
    });
  }, [idProductToEdit]);

  const getSingleProduct = async (id: number) => {
    let productToUpdate = products.find(
      /* listeProduct*/
      (element: Product) => element.id == id
    );
    console.log("productToUpdate", products, productToUpdate, id);
    if (productToUpdate) {
      setProductsData(productToUpdate);
    }
  };

  const [ProductsData, setProductsData] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    published: false,
    sizeId: 0,
  });
  //const [message, setMessage] = useState("");
  const [errorr, setError] = useState(false);
  //const [openAlert, setOpenAlert] = useState(false);

  //const { title, price, description, published, sizeId } = Product;

  /*const addProduct1 = async (data: Product) => {
    const response = await axios.post(
      "http://localhost:3001/api/products/addProduct",
      data
    );
    if (response.status == 200) {
      dispatch(addProduct(response.data.data));

      setMessage("Success");
    } else {
      setError(true);
      setMessage("Error");
    }
    setOpenAlert(true);
  };*/

  /*const updateProduct = async (id: number) => {
    console.log("update",id)
    const response = await axios.put(
      `http://localhost:3001/api/products/${id}`,ProductsData
    );
    if (response.status == 200) {
      dispatch(updateProduct2 ({id, ProductsData}) ); 
      setMessage("Success");
    } else {
      setError(true);
      setMessage("Error");
    }
    setOpenAlert(true);
  };  */

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const checkbox = document.getElementById(
      'published',
    ) as HTMLInputElement | null;
    let formikData = formik.values;
    if (checkbox?.checked) {
      formik.values.published=true;
    } else {
      formik.values.published=false;
    }
    
    console.log(checkbox?.checked);
    if (
      !formik.values.title ||
      !formik.values.price ||
      !formik.values.description ||
      !formik.values.sizeId
    ) {
     /* setError(true);
      setMessage("Please provide value into each input failed");*/
    } else {
      if (idProductToEdit==0) {
        //addProduct1(ProductsData);
        dispatch(addProducts(formikData));
      } else {
        dispatch(updateProducts({idProductToEdit, formikData}));
      }
      navigate("/");
    }
   // setOpenAlert(true);
   console.log("values",formik.values)
   formik.handleSubmit()
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    if (value) {
     setError(false);
    } else {
      setError(true);
    }
    setProductsData({ ...ProductsData, [name]: value });
    console.log("product", ProductsData);
  };
  

  let {error,openAlert,message} = useSelector(
    (state: RootState) => state.product
  );
  const handleCloseAlert = () => {
    dispatch(setOpenAlert(false));
  };

  const classes = productsStyle();

  
    const formik = useFormik({
      initialValues: { id :ProductsData.id,
      title: ProductsData.title,
      price: ProductsData.price,
      description: ProductsData.description,
      published:ProductsData.published,
      sizeId: ProductsData.sizeId}, 
      validationSchema: validationSchema,
      enableReinitialize:true,
      onSubmit: (values) => {
       //alert(JSON.stringify(values, null, 2));
      console.log(values)
      },
      
    });
    console.log("price",formik.values.price)

console.log("test",!formik.values.published?false:true)
  return (
    <div>
       
     <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
       >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar  > 

      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
        textAlign={"center"}
        display="contents"
        //justifyItems={"center"}
      >
        
        <TextField
           
          type="text"
          id="standard-basic"
          label="Title"
          name="title"
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.title} 
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          //error={error}
         // helperText={error ? "title is required" : ""}
         />
        
        <br />
        <TextField
          
          type="number"
          id="standard-basic"
          label="Price"
          name="price"
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          
        />
        <br />
        <TextField 
          
          type="text"
          id="standard-basic"
          label="Description"
          name="description"
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <br />
     
        <Checkbox
        checked={!formik.values.published?false:true}
        name="published"
        id="published"
        onChange={()=>{formik.setFieldValue("published",!formik.values.published)}}
        value={formik.values.published}
        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
        
      />
        <br />
        <TextField
          fullWidth
          type="number"
          id="standard-basic"
          label="Size"
          name="sizeId"
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.sizeId}
          error={formik.touched.sizeId && Boolean(formik.errors.sizeId)}
          helperText={formik.touched.sizeId && formik.errors.sizeId}
        />
        <br />
        <div className={classes.buttonStyle}>
          <Button
            style={{
              width: "100px",
              //textAlign: "center",
              display: "block",
              margin: "0 auto",
            }}
            value="add"
            type="submit"
            variant="contained"
            aria-label="contained primary button group"
            color="primary"
          >
            {idProductToEdit ? "Update" : "Add"}
          </Button>
        </div>
      </Box>
    </div>
  );

};
export default AddEdit;
