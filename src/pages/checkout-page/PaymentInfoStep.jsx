import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid, TextField, Button, Container } from "@mui/material";

const PaymentInfoStep = ({ onSubmit, onPaymentInfoChange }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    validationCode: "",
  });

  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    expirationDate: "",
    validationCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...formErrors };

    switch (name) {
      case "cardNumber":
        const cardNumberRegex = /^\d{16}$/;
        errors.cardNumber = cardNumberRegex.test(value)
          ? ""
          : "Card number must be 16 digits";
        break;
      case "expirationDate":
        const expirationDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
        errors.expirationDate = expirationDateRegex.test(value)
          ? ""
          : "Invalid expiration date format (MM/YYYY)";
        break;
      case "validationCode":
        const validationCodeRegex = /^\d{3}$/;
        errors.validationCode = validationCodeRegex.test(value)
          ? ""
          : "Validation code must be 3 digits";
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
    }
  };

  useEffect(() => {
    onPaymentInfoChange(formData);
  }, [formData, onPaymentInfoChange]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h6">Payment Information</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              fullWidth
              error={!!formErrors.cardNumber}
              helperText={formErrors.cardNumber}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Expiration Date"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleInputChange}
              fullWidth
              error={!!formErrors.expirationDate}
              helperText={formErrors.expirationDate}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Validation Code"
              name="validationCode"
              value={formData.validationCode}
              onChange={handleInputChange}
              fullWidth
              error={!!formErrors.validationCode}
              helperText={formErrors.validationCode}
              required
            />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default PaymentInfoStep;
