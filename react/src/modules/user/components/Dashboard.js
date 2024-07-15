import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';

function Dashboard() {
    const { user } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    return (
        <div className="container mt-5">
            <h2>Kullanıcı Paneli</h2>
            <div className="row">
                <div className="col-md-4">
                    <h4>Profil Bilgileri</h4>
                    <p><strong>E-posta:</strong> {user.email}</p>
                </div>
                <div className="col-md-4">
                    <h4>Sepetiniz</h4>
                    <ul className="list-group">
                        {cart.map(item => (
                            <li className="list-group-item" key={item.id}>
                                {item.name} - ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-4">
                    <h4>Geçmiş Siparişler</h4>
                    <p>Bu kısımda geçmiş siparişler yer alacak.</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
