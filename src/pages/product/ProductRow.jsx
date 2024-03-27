import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { API } from "../../API.js";

const ProductRow = ({ item }) => {
  console.log(item);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ flex: "0 0 30%", mr: 2 }}>
        <img
          src={`${API}/${item.imageUrl}`}
          style={{ width: "60px" }}
          alt={item.productId}
        />
      </Box>
      <Box sx={{ flex: "0 0 50%" }}>
        <Typography variant="h6">{item.name}</Typography>
      </Box>
      <Box sx={{ flex: "0 0 10%" }}>
        <Typography variant="body1">${item.price}</Typography>
      </Box>
      <Box sx={{ flex: "0 0 10%" }}>
        <Typography variant="body1">{item.quantity}</Typography>
      </Box>
    </Box>
  );
};

export default ProductRow;
