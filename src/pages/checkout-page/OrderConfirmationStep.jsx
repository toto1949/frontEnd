import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import {
    Grid,
    Paper,
    Button,
    Container,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell, Box
} from '@mui/material';
import {motion} from 'framer-motion';
import {addOrder} from '../../store/slices/orderSlice.js';
import {useDispatch} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import ProductRow from "../product/ProductRow.jsx";
import {API} from "../../API.js";

const OrderConfirmationStep = ({personalInfo, paymentInfo}) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const items = location.state.items;

    const transformItemsForBackend = (items) => {
        return items.map((item) => {
            return {
                productId: item.number,
                quantity: item.quantityInCart,
                name: item.name,
                price: parseFloat(item.price),
                imageUrl: item.imageUrl
            };
        });
    };
    const transformedItems = transformItemsForBackend(items);

    const handleConfirmOrder = async () => {
        try {
            await dispatch(
                addOrder({
                    customerName: personalInfo.name,
                    email: personalInfo.email,
                    phone: personalInfo.phone,
                    street: personalInfo.street,
                    city: personalInfo.city,
                    zip: personalInfo.zip,
                    creditCardType: 'VISA',
                    creditCardNumber: paymentInfo.cardNumber,
                    creditCardExpiry: paymentInfo.expirationDate,
                    validationCode: paymentInfo.validationCode,
                    status: 'PLACED',
                    items: transformedItems,
                })
            );

            setShowConfirmation(true);
            setTimeout(() => {
                setShowConfirmation(false);
            }, 2000);
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{textAlign: 'center', mt: 5}}>
            <Typography variant="h6">Order Confirmation</Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12}>
                    <Paper sx={{bgcolor: '#f0f0f0', p: 3}}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" variant="head">User Information</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                {Object.keys(personalInfo).map((infoKey) => (
                                                    <Box key={infoKey} sx={{mb: 1}}>
                                                        <Typography variant="body1"
                                                                    sx={{fontWeight: 'bold'}}>{infoKey}:</Typography>
                                                        <Typography variant="body2">{personalInfo[infoKey]}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{bgcolor: '#e0e0e0', p: 3}}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Payment Information</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                {Object.keys(paymentInfo).map((paymentKey) => (
                                                    <Box key={paymentKey} sx={{mb: 1}}>
                                                        <Typography variant="body1"
                                                                    sx={{fontWeight: 'bold'}}>{paymentKey}:</Typography>
                                                        <Typography
                                                            variant="body2">{paymentInfo[paymentKey]}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
                {/*<Grid sx={{*/}
                {/*    display: 'flex',*/}
                {/*    justifyContent: 'center',*/}
                {/*}}>*/}
                {/*    <Box sx={{ flex: '0 0 50%' }}>*/}

                {/*        <Typography variant="h6">Image</Typography>*/}

                {/*    </Box>*/}
                {/*    <Box sx={{ flex: '0 0 50%' }}>*/}
                {/*        <Typography variant="h6">Name</Typography>*/}
                {/*    </Box>*/}
                {/*    <Box sx={{ flex: '0 0 50%' }}>*/}
                {/*        <Typography variant="h6">Price</Typography>*/}
                {/*    </Box>*/}
                {/*    <Box sx={{ flex: '0 0 50%' }}>*/}
                {/*        <Typography variant="h6">Quantity</Typography>*/}
                {/*    </Box>*/}
                {/*</Grid>*/}
                {transformedItems.map((item) => (
                    <Grid item xs={12} key={item.productId}>
                        <Paper sx={{p: 2, mt: 2}}>
                            <ProductRow item={item}/>
                        </Paper>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                        <Link to={"/products"}>
                            <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
                                Confirm Order
                            </Button>
                        </Link>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};
export default OrderConfirmationStep;
