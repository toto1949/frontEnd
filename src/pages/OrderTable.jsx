import React, { useEffect, useState } from 'react';
import {
    Button,
    Collapse,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/slices/orderSlice.js';

const OrderTable = ({ showSideBar }) => {
    const [openRows, setOpenRows] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const testordrs = useSelector((state) => state.order);
    const tableCellStyle = {
        fontWeight: 'bold',
    };

    const productRowStyle = {
        backgroundColor: '#f9f9f9',
    };

    const handleRowClick = (orderId) => {
        const isOpen = openRows.includes(orderId);
        if (isOpen) {
            setOpenRows(openRows.filter((id) => id !== orderId));
        } else {
            setOpenRows([...openRows, orderId]);
        }
    };

    return (
        <div style={{ marginLeft: !showSideBar ? '80px' : '0' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell style={tableCellStyle}>Order ID</TableCell>
                        <TableCell style={tableCellStyle}>Order Date</TableCell>
                        <TableCell style={tableCellStyle}>Shopping Address</TableCell>
                        <TableCell style={tableCellStyle}>Order Status</TableCell>
                        <TableCell style={tableCellStyle}>Customer Name</TableCell>
                        <TableCell style={tableCellStyle}>Total Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {testordrs.orders.map((order) => (
                        <React.Fragment key={order.id}>
                            <TableRow>
                                <TableCell>
                                    <IconButton onClick={() => handleRowClick(order.id)}>
                                        {openRows.includes(order.id) ? (
                                            <KeyboardArrowUpIcon />
                                        ) : (
                                            <KeyboardArrowDownIcon />
                                        )}
                                    </IconButton>
                                </TableCell>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>     {new Date(order.timestamp).toLocaleDateString('en-US')}</TableCell>
                                <TableCell>{`${order.street}, ${order.city}, ${order.zip}`}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.totalAmount}</TableCell>
                            </TableRow>
                            <TableRow style={productRowStyle}>
                                <TableCell colSpan={8}>
                                    <Collapse in={openRows.includes(order.id)} timeout="auto" unmountOnExit>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell />
                                                    <TableCell style={tableCellStyle}>Product Number</TableCell>
                                                    <TableCell style={tableCellStyle}>Product Name</TableCell>
                                                    <TableCell style={tableCellStyle}>Unit Price</TableCell>
                                                    <TableCell style={tableCellStyle}>Quantity</TableCell>
                                                    <TableCell style={tableCellStyle}>Total Amount</TableCell>
                                                </TableRow>
                                                {order.items.map((product) => (
                                                    <TableRow key={product.productId}>
                                                        <TableCell />
                                                        <TableCell />
                                                        <TableCell>
                                                            <Link to={`/products/${product.productId}`}>{product.productId}</Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography>{product.name}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                ${product.price}
                                                                <br />
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                {product.quantity}
                                                                <br />
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                ${product.quantity * product.price}
                                                                <br />
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrderTable;
