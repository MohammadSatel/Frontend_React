import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaShekelSign } from 'react-icons/fa';

const ProdDisp = ({ prod, buy }) => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000/'; // Use environment variable

    return (
        <Card className="product-card" style={{ width: '18rem', margin: '10px' }}>
            <Card.Img
                className="product-image"
                variant="top"
                src={`${SERVER_URL}${prod.img}`}
                alt={`Product: ${prod.desc}`} // More descriptive alt text
            />
            <Card.Body>
                <Card.Title>{prod.desc}</Card.Title>
            </Card.Body>
            <Card.Footer className="text-muted">
                Price: <span className="product-price"><FaShekelSign />{prod.price}</span>
            </Card.Footer>
            <Button variant="primary" onClick={() => buy(prod)}>Add to cart</Button>
        </Card>
    );
}

export default ProdDisp;
