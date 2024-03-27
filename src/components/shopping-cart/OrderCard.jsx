import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

const ProductCard = ({ title, quantity, description }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/public/images/contemplative-reptile.jpg"
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {quantity}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<DeleteIcon fontSize="small" />}
        >
          Remove
        </Button>
        <Button
          size="small"
          color="primary"
          variant="outlined"
          endIcon={<InfoIcon fontSize="small" />}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
