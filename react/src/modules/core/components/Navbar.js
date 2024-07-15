import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';
import { motion } from 'framer-motion';
import { Nav, Navbar as BootstrapNavbar, NavDropdown } from 'react-bootstrap';
import '../styles/Navbar.css';

import { getAllCategories } from '../../category/services/categoryService';
import { ProductsContext } from '../../../context/ProductsContext';

function Navbar() {
    const { user } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const [totalItemsInCart,setTotalItemsInCart]=useState(0);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
    const searchInputRef = useRef(null);

    // Toggle search input expansion
    const handleSearchClick = () => {
        setIsSearchExpanded(prevState => !prevState);
    };

    // Focus the search input when it expands
    useEffect(() => {
        if (isSearchExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchExpanded]);

    useEffect(()=>{
    if(cart)
    // Calculate total items in cart
    setTotalItemsInCart(cart.reduce((total, item) => total + item.quantity, 0));

    },[cart,setTotalItemsInCart])
    const {categories}=useContext(ProductsContext);

    return (
        <BootstrapNavbar expand="lg" className="navbar navbar-light bg-light">
            <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand">TESTTEYİZ!</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler" />

            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" className="nav-link">Anasayfa</Nav.Link>
                    <Nav.Link as={Link} to="/products" className="nav-link">Ürünler</Nav.Link>

                    <NavDropdown title="Kategoriler" id="basic-nav-dropdown" className="nav-item dropdown">
                    {categories && categories.map(category => (

                    <NavDropdown.Item key={category.slug} as={Link} to={`/categories/${category.slug}`} className="dropdown-item">{category.title}</NavDropdown.Item>
                   
                    ))}
                   
                    </NavDropdown>
                </Nav>

                <Nav className="ms-auto align-items-center">
                    <div className="search-container d-flex align-items-center">
                        <motion.input
                            ref={searchInputRef}
                            className="form-control me-2 search-input"
                            type="search"
                            placeholder="Ara"
                            aria-label="Search"
                            initial={{ width: 0, opacity: 0 }}
                            animate={isSearchExpanded ? { width: 250, opacity: 1, padding: '0 10px', border: '1px solid #ccc' } : { width: 0, opacity: 0, padding: 0, border: 'none' }}
                            transition={{ duration: 0.3 }}
                            onBlur={() => setIsSearchExpanded(false)}
                        />
                        <button
                            className={`search-btn btn  ${isSearchExpanded ? 'active' : ''}`}
                            type="button"
                            onClick={handleSearchClick}
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>

                    <Nav.Link as={Link} to="/cart" className="nav-link d-flex align-items-center">
                        <i className="bi bi-bag"></i>
                        <span className="badge bg-primary rounded-pill ms-1">{totalItemsInCart}</span>
                    </Nav.Link>

                    {user ? (
                        <NavDropdown title={<><i className="bi bi-person-circle"></i> Profilin {user?.name}</>} id="basic-nav-dropdown" align="end" className="nav-item dropdown">
                            <NavDropdown.Item as={Link} to="/profile" className="dropdown-item">Profil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/signout" className="dropdown-item" >Çıkış Yap</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/signin" className="nav-link">Giriş Yap</Nav.Link>
                            <Nav.Link as={Link} to="/signup" className="nav-link">Kayıt Ol</Nav.Link>
                        </>
                    )}
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
}

export default Navbar;
