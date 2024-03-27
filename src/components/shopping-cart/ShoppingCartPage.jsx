import { Container } from "@mui/material";
import GridLayout from "../GridLayout";
import OrderCard from "./OrderCard";

const orders = [
  { id: 1, title: "Product 1", quantity:5, description: "Description for Product 1" },
  { id: 2, title: "Product 2", quantity:5, description: "Description for Product 2" },
  { id: 1, title: "Product 1", quantity:5, description: "Description for Product 1" },
  { id: 2, title: "Product 2", quantity:5, description: "Description for Product 2" },
  { id: 1, title: "Product 1", quantity:5, description: "Description for Product 1" },
  { id: 2, title: "Product 2", quantity:5, description: "Description for Product 2" },
  { id: 1, title: "Product 1", quantity:5, description: "Description for Product 1" },
  { id: 2, title: "Product 2", quantity:5, description: "Description for Product 2" },
  { id: 1, title: "Product 1", quantity:5, description: "Description for Product 1" },
  { id: 2, title: "Product 2", quantity:5, description: "Description for Product 2" },
  { id: 1, title: "Product 1", quantity:5, description: "Description for Product 1" },
  { id: 2, title: "Product 2", quantity:5, description: "Description for Product 2" },
];

const ShoppingCartPage = () => {
  return (
    <Container maxWidth="lg">
      <h1>Orders</h1>
      <GridLayout ItemComponent={OrderCard} items={orders} />
    </Container>
  );
};

export default ShoppingCartPage;
