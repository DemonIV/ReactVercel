import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import ModalImage from 'react-modal-image';

const CartTable = ({ cartItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => {
            const imageURLs = JSON.parse(item.product.imageURLs);
            return (
              <tr key={index}>
                <td>
                  <ModalImage
                  style={{width:5}}
                    small={process.env.REACT_APP_API_DOMAIN+imageURLs[0]+"?w=100&h=100"}
                    large={process.env.REACT_APP_API_DOMAIN+imageURLs[0]+"?w=300&h=300"}
                    alt={item.product.name}
                    onClick={() => openModal(imageURLs[0])}
                  />
                </td>
                <td>{item.product.name}</td>
                <td>{item.color}</td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>₺{Number(item.product.price).toFixed(2)}</td>
                <td>₺{(item.quantity * Number(item.product.price)).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <ModalImage
        small={selectedImage}
        large={selectedImage}
        alt=""
        onClose={closeModal}
        show={showModal}
      />
    </>
  );
};

export default CartTable;
