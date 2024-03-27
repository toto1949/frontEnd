import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeProduct } from "../../store/slices/productSlice.js";

const ListProducts = () => {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateProduct = () => {
    navigate("/updateProduct");
  };

  const handleRemoveProduct = (productNumber) => {
    dispatch(removeProduct(productNumber));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">All Products</Typography>
      </Grid>
      {products.map((product) => (
        <Grid item xs={12} key={product.productNumber}>
          <Card>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <p>Product Number: {product.productNumber}</p>
              <p>Price: {product.price}</p>
              <p>Description: {product.description}</p>
              <p>Number in Stock: {product.numberInStock}</p>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => handleRemoveProduct(product.productNumber)}
              >
                Remove Product
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" onClick={updateProduct}>
          Update
        </Button>
      </Grid>
    </Grid>
  );
};

export default ListProducts;
