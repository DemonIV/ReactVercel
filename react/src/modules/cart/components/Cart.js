import React, { useContext,useEffect,useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
function Cart() {
    
    
    const { cart, removeProductFromCart } = useContext(CartContext);
    const [interactedRow,setInteractedRow]=useState(null);

    const [totalPrice,setTotalPrice]=useState(0);
    useEffect(()=>{
        setTotalPrice(cart.reduce((total, item) => total + item.product.price * item.quantity, 0));
       
    },[cart]);
    return (
        <div className="container mt-5">
            <h2>Sepetiniz</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Ürün</th>
                        <th>Adet</th>
                        <th>Fiyat</th>
                        <th>Toplam</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item?.product.id+item?.color+item?.size}>
                            <td>{item?.product.name}</td>
                            <td>{item?.quantity}</td>
                            <td>₺{Number(item?.product.price)?.toFixed(2)}</td>
                            <td>₺{(Number(item?.product.price) * item?.quantity).toFixed(2)}</td>
                            <td>
                                <button className="btn btn-danger" onClick={async () => {
                                    setInteractedRow(item);
                                    await removeProductFromCart(item);
                                    setInteractedRow(null);
                                    }}>Sil</button>
                            </td>
                            {interactedRow && interactedRow.id===item.id && (<td>
                                <Spinner animation="border" variant="danger"/>
                            </td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="text-right">Toplam: ₺{totalPrice.toFixed(2)}</h3>
            <Link to={`/checkout`} className="btn btn-success">Ödemeye Geç</Link>
        </div>
    );
}

export default Cart;
