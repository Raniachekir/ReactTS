import productsServices from "../services/products.services";
import { Product } from "../interfaces/product";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  'product/getProducts',
  // Declare the type your function argument here:
  async () => {
    const response = productsServices.getProduct()
    return response

  }
)

export const addProducts = createAsyncThunk(
  'product/addProducts',
  // Declare the type your function argument here:
  async (data: Product) => {
    const response = productsServices.addProduct(data)
    return response
  }
)

export const deleteProducts = createAsyncThunk(
  'product/deleteProducts',
  // Declare the type your function argument here:
  async (id: number) => {
    const response = productsServices.deleteProduct(id)
    return response
  }
)

export const updateProducts = createAsyncThunk(
  'product/updateProducts',
  // Declare the type your function argument here:
  async ({idProductToEdit,formikData}:any) => {
    const response = productsServices.updateProduct(idProductToEdit,formikData)
    console.log("response",response)
    return {idProductToEdit,formikData}
  }
)

const productList:Array<Product>=[]
const productSlice = createSlice({
  name: "product",
  initialState: {
    listProducts: productList,
    loader: false,
    message:"",
    error:false,
    openAlert:false
  },
  reducers: {
    setOpenAlert(state,action){
    state.openAlert=action.payload
    },
    setListProducts(state, action) {
      state.listProducts = action.payload;
    },

    addProduct(state, action:PayloadAction<Product>) {
      state.listProducts.push(action.payload);
    },

    onDeleteProductById(state, action) {
      let index = state.listProducts.findIndex(
        (element: Product) => element.id == action.payload
      );
      state.listProducts.splice(index, 1);
    },

    updateProduct(
      state,
      action
    ) {
      let index = state.listProducts.findIndex(
        (element: Product) => element.id === action.payload.id
      );

      state.listProducts[index] = action.payload.newProduct;
    },


  },
  extraReducers:(builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      console.log("payload",payload)
      state.listProducts=payload
      state.loader=false
    })
    builder.addCase(getProducts.pending, (state, { payload }) => {
      state.loader=true
     
    })
    builder.addCase(addProducts.fulfilled, (state, { payload }) => {
      console.log("payload",payload)
      state.listProducts.push(payload)
      state.error=false
      state.message="Success"
      state.openAlert=true
    })
    builder.addCase(addProducts.rejected, (state, { payload }) => {
         state.error=true
         state.message="Error server"
         state.openAlert=true
    })

    builder.addCase(deleteProducts.fulfilled, (state, { payload }) => {
      console.log("payload",payload)
      let index = state.listProducts.findIndex(
        (element: Product) => element.id === payload
      );
      state.listProducts.splice(index, 1);
      state.error=false
      state.message="Success Deleting"
      state.openAlert=true
      
    })
    builder.addCase(deleteProducts.rejected, (state, { payload }) => {
      state.error=true
      state.message="Not deleting"
      state.openAlert=true
 })
 builder.addCase(updateProducts.fulfilled, (state, { payload }) => {
  let index = state.listProducts.findIndex(
    (element: Product) => element.id === payload.idProductToEdit);

  state.listProducts[index] = payload.formikData;
  state.error=false
  state.message="Success Update"
  state.openAlert=true
})
builder.addCase(updateProducts.rejected, (state, { payload }) => {
     state.error=true
     state.message="Missing Data"
     state.openAlert=true
})
  }
});

export const {
  setOpenAlert,
  setListProducts,
  addProduct,
  onDeleteProductById,
  updateProduct,
} = productSlice.actions;

export const store = configureStore({
  reducer: {
    product: productSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

