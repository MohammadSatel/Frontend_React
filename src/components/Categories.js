import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaList } from 'react-icons/fa';
import { RiHistoryLine } from 'react-icons/ri';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';

const Categories = () => {
    const [cats, setcats] = useState([]);
    const [loading, setloading] = useState(true);
    const location = useLocation();
    const SERVER = 'http://localhost:3000/';

    // Fetch categories from the server on component mount
    useEffect(() => {
        toast.promise(
            axios.get(SERVER).then(res => {
                setcats(res.data);
                setloading(false);
            }).catch(error => {
                console.error('Failed to fetch categories:', error);
                toast.error('Failed to load data');
                setloading(false);
            }),
            { pending: 'Loading data...' }
        );
    }, []);

    return (
        <div style={{ marginLeft: '12px' }}>
            <Nav variant="tabs" defaultActiveKey="/home">
                {/* Order history link */}
                <Nav.Item>
                    <Nav.Link
                        style={{ fontWeight: 'bold' }}
                        as={Link}
                        to="history"
                        className={location.pathname === `/categories/history` ? 'active' : ''}
                    >
                        <RiHistoryLine style={{ marginRight: '5px' }} /> Orders history
                    </Nav.Link>
                </Nav.Item>
                {/* All products link */}
                <Nav.Item>
                    <Nav.Link
                        style={{ fontWeight: 'bold' }}
                        as={Link}
                        to="allProducts"
                        className={location.pathname === `/categories/allProducts` ? 'active' : ''}
                    >
                        <FaList style={{ marginRight: '5px' }} /> All products
                    </Nav.Link>
                </Nav.Item>
                {/* Dynamically generated category links */}
                {cats.map(cat => (
                    <Nav.Item key={cat.id}>
                        <Nav.Link
                            style={{ fontWeight: 'bold' }}
                            as={Link}
                            to={`/categories/${cat.id}`}
                            className={location.pathname === `/categories/${cat.id}` ? 'active' : ''}
                        >
                            {cat.desc}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            <br />
            {/* Loading indicator */}
            {loading && (
                <Button style={{ position: 'fixed', left: '15px' }} startDecorator={<CircularProgress variant="solid" />}>
                    Loading…
                </Button>
            )}
            <Outlet />
        </div>
    );
}

export default Categories;
