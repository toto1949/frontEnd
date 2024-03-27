import { Container } from "@mui/material";
import FabButton from "../FabButton";
import AddIcon from "@mui/icons-material/Add";
import GridLayout from "../GridLayout";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/slices/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector((state) => {
    return state.products.products;
  });
  console.log(products);
  const userInfo = useSelector((state) => state.user);
  return (
    <Container maxWidth="lg">
      <h1>Products</h1>
      <GridLayout ItemComponent={ProductCard} items={products} />
      {userInfo.role === "employee" && (
        <Link component={Link} to="/products/add" underline="none">
          <FabButton label="Add Product" Icon={AddIcon} />
        </Link>
      )}
    </Container>
  );
};

export default ProductList;
