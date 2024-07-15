import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { signUp } from '../services/authService'; // API çağrısını import ediyoruz

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState(''); 

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Password validation
        if (password !== confirmPassword) {
            setPasswordError('Şifreler uyuşmuyor.');
            return;
        }

        try {
            await signUp({ firstName, lastName, username, email, phone:phoneNumber, password });
        
            navigate('/');
        } catch (err) {
            setError('Kayıt işlemi başarısız oldu: ' + JSON.stringify(err.error));
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2>Kayıt Ol</h2>
                    <Form onSubmit={handleSignUp}>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>Ad</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Adınızı girin"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Soyad</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Soyadınızı girin"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Kullanıcı Adı</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kullanıcı adınızı girin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>E-posta</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="E-posta adresinizi girin"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhoneNumber">
                            <Form.Label>Telefon Numarası</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Telefon numaranızı girin"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Şifre</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Şifrenizi girin"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                                    {showPassword ? "Gizle" : "Göster"}
                                </Button>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Şifreyi Onayla</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Şifrenizi tekrar girin"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
                        {error && <Form.Text className="text-danger">{error}</Form.Text>}

                        <Button variant="primary" type="submit" className="d-block mx-auto">
                            Kayıt Ol
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default SignUp;
