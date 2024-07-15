import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ForgotPasswordModal = ({ show, onHide }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendPasswordReset = () => {
    // Burada email adresine şifre sıfırlama bağlantısı gönderme işlemini yapabilirsiniz.
    console.log(`Şifre sıfırlama bağlantısı ${email} adresine gönderildi.`);
    // Kullanıcıya başarılı gönderim mesajı verebilir veya modalı kapatabilirsiniz.
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Şifremi Unuttum</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Şifrenizi sıfırlamak için lütfen kayıtlı email adresinizi girin. Size bir şifre sıfırlama bağlantısı göndereceğiz.</p>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Adresi</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email adresinizi girin"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          İptal
        </Button>
        <Button variant="primary" onClick={handleSendPasswordReset}>
          Gönder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ForgotPasswordModal;
