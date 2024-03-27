import { Grid, Button } from "@mui/material";
import { setUserInfo } from "./store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginAsEmployee = (e) => {
    e.preventDefault();
    dispatch(setUserInfo({ username: "employee", role: "employee" }));
    navigate("/products");
  };
  const loginAsUser = (e) => {
    e.preventDefault();
    dispatch(setUserInfo({ username: "user", role: "user" }));
    navigate("/products");
  };
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item>
        <Button
          variant="contained"
          sx={{ m: "10px" }}
          onClick={loginAsEmployee}
        >
          As Employee
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" sx={{ m: "10px" }} onClick={loginAsUser}>
          As User
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
