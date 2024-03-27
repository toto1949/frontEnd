import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid, TextField, Button, Container } from "@mui/material";

const PersonalInfoStep = ({ onSubmit, onPersonalInfoChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    phone: "",
    zip: "",
  });

  useEffect(() => {
    onPersonalInfoChange(formData);
  }, [formData, onPersonalInfoChange]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...formErrors };

    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.email = emailRegex.test(value) ? "" : "Invalid email address";
        break;
      case "phone":
        const phoneRegex = /^\d{10}$/;
        errors.phone = phoneRegex.test(value) ? "" : "Invalid phone number";
        break;
      case "zip":
        const zipRegex = /^\d{5}$/;
        errors.zip = zipRegex.test(value) ? "" : "ZIP code must be 5 digits";
        break;
      default:
        break;
    }

    setFormErrors(errors);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formErrors).every((error) => error === "")) {
      onSubmit(formData);
    } else {
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h6">Personal Information</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              error={!!formErrors.email}
              helperText={formErrors.email}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="ZIP"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              fullWidth
              error={!!formErrors.zip}
              helperText={formErrors.zip}
              required
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PersonalInfoStep;
