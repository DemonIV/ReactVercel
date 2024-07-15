import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import ForgotPasswordModal from './ForgotPasswordModal'; // Modal componentini import ediyoruz
import { signIn } from '../services/authService'; // API çağrısını import ediyoruz

function SignIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Beni Hatırla durumu
  const { setUser,setRefreshToken,setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false); // Modalın görünüp görünmediğini kontrol etmek için state
  const [error, setError] = useState(''); // Hata mesajı state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(''); // Hata mesajını temizle
    try {
      //Giriş yapma isteği
      console.log({login,password});
      const { user, accessToken, refreshToken } = await signIn({ login, password });
   
      
      // Tokenları localStorage'da sakla
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      
      console.log(user,accessToken,refreshToken);

     navigate('/');
    } catch (err) {
      setError('Giriş bilgileri hatalı.');
    }
  };

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan oturum bilgilerini kontrol et
    // const user = JSON.parse(localStorage.getItem('user'?:));
    // if (user) {
    // //  setUser(user);
     // navigate('/');
    //}
  }, [setUser,navigate]);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Giriş Yap</h2>
          <Form onSubmit={handleSignIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifre girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroup.Text onClick={togglePasswordVisibility}>
                  {showPassword ? "Gizle" : "Göster"}
                </InputGroup.Text>
              </InputGroup>
              <Form.Text className="text-muted">
                <a href="#" onClick={toggleForgotPasswordModal}>Şifrenizi mi unuttunuz?</a>
              </Form.Text>
            </Form.Group>

            {error && <Form.Text className="text-danger">{error}</Form.Text>}

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Beni Hatırla"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="d-block mx-auto">
              Giriş Yap
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <p>
              Hesabınız yok mu? <a href="/signup">Kayıt Ol</a>
            </p>
            <p>
              <a href="/terms">Kullanım Koşulları</a>
            </p>
          </div>
        </Col>
      </Row>

      <ForgotPasswordModal show={showForgotPasswordModal} onHide={toggleForgotPasswordModal} />
    </Container>
  );
}

export default SignIn;
