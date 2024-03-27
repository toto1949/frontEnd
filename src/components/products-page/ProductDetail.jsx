import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  TableBody,
  Table,
  TableContainer,
  TableCell,
  TableRow,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { fetchProducts } from "../../store/slices/productSlice";
import { API } from "../../API.js";
import { addReview, fetchReviews } from "../../store/slices/reviewSlice.js";
const ProductDetail = () => {
  const { number } = useParams();
  const userInfo = useSelector((state) => state.user);
  const product = useSelector((state) => {
    const p = state.products.products.find(
      (product) => product.number === number
    );
    return (
      p || {
        number: "",
        name: "",
        price: "",
        imageUrl: "",
        description: "",
        numberInStock: "",
      }
    );
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Alice",
      rating: 4,
      comment: "Great product, very useful!",
    },
    {
      id: 2,
      user: "Bob",
      rating: 5,
      comment: "Excellent quality and fast shipping.",
    },
    {
      id: 3,
      user: "Charlie",
      rating: 3,
      comment: "Good product, but could be improved.",
    },
  ]);
  const reviewstest = useSelector((state) => state.reviews);
  console.log(reviewstest);
  const user = useSelector((state) => state.user);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (event, newValue) => {
    setUserRating(newValue);
  };
  useEffect(() => {
    dispatch(fetchReviews(number));
  }, [dispatch]);
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    const newReview = {
      username: user.username,
      productId: number,
      rating: userRating,
      comment: comment,
    };
    setReviews([...reviews, newReview]);
    dispatch(addReview(newReview));
    setUserRating(0);
    setComment("");
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TableContainer style={{ minWidth: "100%" }}>
            <div
              className="row"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              <div
                className="col-sm-6 col-12"
                style={{
                  paddingRight: "1em",
                  paddingLeft: "0px",
                  backgroundColor: "rgb(17 72 167 / 4%)",
                }}
              >
                <Table className="table table-striped">
                  <TableBody component="tbody">
                    <TableRow>
                      <TableCell scope="row" style={{ fontSize: "12.8px" }}>
                        <strong>Product Number</strong>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          float: "left",
                          fontSize: "16px",
                        }}
                      >
                        {product && product.number}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row" style={{ fontSize: "12.8px" }}>
                        <strong>Product Name</strong>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          float: "left",
                          fontSize: "16px",
                        }}
                      >
                        {product && product.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row" style={{ fontSize: "12.8px" }}>
                        <strong>Price</strong>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          float: "left",
                          fontSize: "16px",
                        }}
                      >
                        {product && product.price}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell scope="row" style={{ fontSize: "12.8px" }}>
                        <strong>Description</strong>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          float: "left",
                          fontSize: "16px",
                        }}
                      >
                        {product && product.description}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TableContainer>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardMedia
              component="img"
              image={
                `${API}/${product.imageUrl}` ||
                "http://via.placeholder.com/640x360"
              }
            />
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Product Reviews:
      </Typography>

      {reviewstest.reviews.map((review) => (
        <Card key={review.number} style={{ marginBottom: "10px" }}>
          <Typography
            variant="subtitle1"
            style={{ color: "gray", marginBottom: "8px" }}
          >
            <strong>{review.username}</strong> |{" "}
            {new Date(review.timestamp).toLocaleDateString("en-US")}
          </Typography>
          <CardContent>
            <Typography variant="body1">
              <Rating name="user-rating" value={review.rating} readOnly />
            </Typography>
            <Typography variant="body2">{review.comment}</Typography>
          </CardContent>
        </Card>
      ))}
      {userInfo.role == "user" && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Add Your Review:
          </Typography>
          <Rating
            name="user-rating"
            value={userRating}
            onChange={handleRatingChange}
          />
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={handleCommentChange}
            style={{ marginTop: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "10px" }}
          >
            Submit Review
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetail;
