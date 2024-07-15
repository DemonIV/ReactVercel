import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getProfile, updateProfile } from '../services/profileService';
import '../styles/Profile.css'; // Stil dosyasını import et

import api from '../../../api';
import CartCard from '../../cart/components/CartCard';

const baseURL = api.getUri();

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        bio: ''
    });

    useEffect(() => {
        // Kullanıcı profili verisini almak için istek yap
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setProfile(profileData);
                // Profil verilerini düzenleme formuna yükle
                setFormData({
                    fullName: profileData.fullName,
                    email: profileData.user.email,
                    phone: profileData.phone || '',
                    bio: profileData.bio || ''
                });
            
            } catch (error) {
                console.error('Profil verisi alınamadı:', error);
            }
        };

        fetchProfile();
    }, [user?.id]);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        setIsEditing(false);
        const res=await updateProfile(formData);
        if(res){
            console.log(res);
            setProfile(res);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container">
            <h2 className="mt-4 mb-4">Profil</h2>
            <Card className="profile-card">
                <Row>
                    {/* Profil bilgileri */}
                    <Col md={8}>
                        <Card.Body className="profile-info">
                            {profile && !isEditing ? (
                                <>
                                    {profile.avatar && (
                                        <div className="avatar-container">
                                            <Card.Img
                                                src={`https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/768px-Default_pfp.svg.png`}
                                                alt="Avatar"
                                                className="avatar-image"
                                            />
                                        </div>
                                    )}
                                    <Card.Title>{profile.fullName}</Card.Title>
                                    <Card.Text>
                                        <strong>Email:</strong> {user.email}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Telefon:</strong> {profile.phone || 'Telefon Numarası Girişi Yapılmadı'}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Bio:</strong> {profile.bio}
                                    </Card.Text>
                                    <button onClick={handleEditProfile} className="btn btn-primary">
                                        Profili Düzenle
                                    </button>
                                </>
                            ) : profile && isEditing ? (
                                <Form>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Ad Soyad</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Adınızı ve Soyadınızı Girin"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email Adresi</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email Adresinizi Girin"
                                            required
                                            disabled // Eğer düzenleme yapılmasını istemiyorsanız bu satırı silin
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label>Telefon Numarası</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Telefon Numaranızı Girin"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formAddress">
                                        <Form.Label>Biyografi</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            placeholder="Adresinizi Girin"
                                        />
                                    </Form.Group>
                                    <button onClick={handleSaveProfile} className="btn btn-primary">
                                        Kaydet
                                    </button>
                                    <button onClick={() => setIsEditing(false)} className="btn btn-secondary ml-2">
                                        İptal
                                    </button>
                                </Form>
                            ) : (
                                <p>Profil bilgileri yükleniyor...</p>
                            )}
                        </Card.Body>
                    </Col>

                    {/* Menü */}
                    <Col md={4}>
                        {/*<Card.Body className="profile-menu">*/}
                            {/*<Card className="menu-card">
                                <Card.Body className="menu-card-body">
                                    <Card.Title>Orders</Card.Title>
                                    <Card.Text>
                                        Order #1234 - Processing
                                    </Card.Text>
                                    <Link to="/profile/orders" className="menu-link">
                                        Orders <i className="fas fa-arrow-right"></i>
                                    </Link>
                                </Card.Body>
                            </Card>*/}
                            <CartCard />
                           {/* <Card className="menu-card">
                                <Card.Body className="menu-card-body">
                                    <Card.Title>Favourites</Card.Title>
                                    <Card.Text>
                                        5 items in favourites
                                    </Card.Text>
                                    <Link to="/profile/favourites" className="menu-link">
                                        Favourites <i className="fas fa-arrow-right"></i>
                                    </Link>
                                </Card.Body>
                            </Card>*/}
                        {/*</Card.Body>*/}
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default Profile;
