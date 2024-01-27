import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardSubtitle, CardText, ListGroup, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaShekelSign } from 'react-icons/fa';

const History = () => {
    const token = sessionStorage.getItem('token'); // Consider more secure storage
    const tokenData = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
    const [history, setHistory] = useState([]);
    const SERVER = 'http://localhost:3000/';

    // Function to fetch order history
    const fetchHistory = () => {
        toast.promise(
            axios.get(`${SERVER}/history`, { headers: tokenData })
                .then(res => {
                    const temp = res.data.orders.reverse(); // Consider sorting on the server side
                    setHistory(temp);
                })
                .catch(error => {
                    if (error.response && error.response.status === 401) toast.error('Unauthorized! Please login');
                    console.error('Error fetching history:', error);
                }),
            {
                pending: 'Fetching history...',
                error: 'Error fetching history!',
            }
        );
    };

    useEffect(() => {
        fetchHistory();
        // Removed refresh from dependency array to avoid unnecessary API calls
    }, []); // Ensure this is the intended behavior

    return (
        <div>
            {history.length === 0 ? <h3>You have no history of orders</h3> : (
                <Row xs={1} md={4} className="g-4">
                    {history.map((order, index) => ( // Added index to use as a key for Card
                        <Card style={{ margin: '10px', padding: '10px' }} key={index}>
                            <div>
                                <div style={{ display: 'flex' }}>
                                    <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '2em' }} />
                                    <h5 style={{ marginLeft: '10px' }}>Order date: {new Date(order.order_date).toLocaleString()}</h5>
                                </div>
                                <ListGroup>
                                    {order.order_details.map((item, itemIndex) => ( // Added itemIndex to use as a key for ListGroup.Item
                                        <ListGroup.Item style={{ marginTop: '10px', position: 'relative' }}
                                            className="d-flex justify-content-between align-items-start"
                                            key={itemIndex}
                                        >
                                            <img src={`${SERVER}${item.product_image}`} alt={`Thumbnail for ${item.product_desc}`} style={{ width: '50px', marginRight: '10px' }} />
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{item.product_desc}</div>
                                                Amount: {item.quantity}
                                            </div>
                                            <CardText style={{ color: 'blue', fontWeight: 'bolder', position: 'absolute', right: '25px', bottom: '18px' }}>
                                                <span style={{ color: 'blue', fontWeight: 'bolder' }}><FaShekelSign style={{ fontSize: '11px' }} />{parseFloat((item.product_price * item.quantity).toFixed(2))}</span>
                                            </CardText>
                                            {item.quantity > 1 && (
                                                <CardSubtitle style={{ position: 'absolute', bottom: '12px', right: '25px', fontSize: '12px' }}>
                                                    <span style={{ color: 'blue', fontWeight: 'bolder' }}><FaShekelSign style={{ fontSize: '9px' }} />{item.product_price}</span> each
                                                </CardSubtitle>
                                            )}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Card>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default History;
