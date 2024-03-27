import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Grid, TextField } from "@mui/material";
import { addProduct } from "../../store/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { API } from "../../API.js";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(API);
  const [product, setProduct] = useState({
    number: "",
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    numberInStock: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("file", product.image);
    try {
      console.log(formData);
      const response = await fetch("http://localhost:8080/api/uploadFile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const res = await response.json();
        const updatedProduct = { ...product, imageUrl: res.fileName };
        dispatch(addProduct(updatedProduct));
        navigate("/products");
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProduct({ ...product, image: imageFile });
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="number"
            label="Product Number"
            value={product.number}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            value={product.name}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="price"
            label="Price"
            value={product.price}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            value={product.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="numberInStock"
            label="Number in Stock"
            value={product.numberInStock}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <input
            name="image"
            accept="image/*"
            id="contained-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
          {product.imageUrl && (
            <div>
              <img
                src={product.imageUrl}
                alt="Uploaded"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddProductForm;
