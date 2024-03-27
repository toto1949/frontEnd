import React, { useEffect, useState } from "react";
import PersonalInfoStep from "./PersonalInfoStep.jsx";
import PaymentInfoStep from "./PaymentInfoStep.jsx";
import OrderConfirmationStep from "./OrderConfirmationStep.jsx";
import { Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../store/slices/orderSlice.js";
import {useLocation} from "react-router-dom";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderData, setOrderData] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const handlePersonalInfoSubmit = (data) => {
    setPersonalInfo(data);

    nextStep();
  };
  const handlePaymentInfoSubmit = (data) => {
    setPaymentInfo(data);
    nextStep();
  };
  const handlePersonalInfoChange = (data) => {
    setPersonalInfo(data);
  };
  const handlePaymentInfoChange = (data) => {
    setPaymentInfo(data);
  };
  useEffect(() => {
    setOrderData({
      personalInfo: personalInfo,
      creditCart: paymentInfo,
    });
  }, [personalInfo, paymentInfo]);
  const confirmOrder = async () => {
    try {
      setOrderConfirmed(true);
      dispatch(addOrder(orderData));
    } catch (error) {}
  };
  const stepTitles = [
    "Personal Information",
    "Payment Information",
    "Order Confirmation",
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          margin: "20px",
          justifyContent: "space-evenly",
        }}
      >
        {stepTitles.map((title, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            {index !== 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "-100%",
                  width: "100%",
                  height: "1px",
                  backgroundColor: step > index + 1 ? "green" : "gray",
                  zIndex: "1",
                }}
              ></div>
            )}
            <div
              style={{
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                background: step === index + 1 ? "green" : "gray",
                marginBottom: "5px",
                zIndex: "1",
              }}
            ></div>
            <span style={{ color: step === index + 1 ? "green" : "gray" }}>
              {title}
            </span>
          </div>
        ))}
      </div>
      {step === 1 && (
        <PersonalInfoStep
          onSubmit={handlePersonalInfoSubmit}
          onPersonalInfoChange={handlePersonalInfoChange}
        />
      )}
      {step === 2 && (
        <PaymentInfoStep
          onSubmit={handlePaymentInfoSubmit}
          onPaymentInfoChange={handlePaymentInfoChange}
        />
      )}
      {step === 3 && (
        <OrderConfirmationStep
          personalInfo={personalInfo}
          paymentInfo={paymentInfo}
          onConfirm={confirmOrder}
        />
      )}
      {orderConfirmed && <p>Order confirmed! Thank you for your purchase.</p>}
      {step !== 3 && (
        <Container
          maxWidth="sm"
          style={{
            textAlign: "center",
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={prevStep}
            disabled={step === 1}
            style={{ order: 1 }}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={nextStep}
            disabled={step === 3}
            style={{ order: 2 }}
          >
            Next
          </Button>
        </Container>
      )}
    </div>
  );
};

export default Checkout;
