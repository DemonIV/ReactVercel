import React, { useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/Home.css';
import { ProductsContext } from '../../../context/ProductsContext';
import { AuthContext } from '../../../context/AuthContext';


function Home() {
    const {user}=useContext(AuthContext);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        // Kaydırma olayını ekle
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const jumbotron = document.querySelector('.jumbotron');

            if (jumbotron) {
                // Elemanları yukarı kaydır ve şeffaflaştır
                const translateY = Math.min(scrollTop / 3, 100);
                const opacity = Math.max(1 - scrollTop / 300, 0);

                jumbotron.style.transform = `translateY(-${translateY}px)`;
                jumbotron.style.opacity = opacity;
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Temizlik fonksiyonu
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    
    const {featuredProducts,categories}=useContext(ProductsContext);

   

    return (
        <div className="container">
            <div className="jumbotron text-center mt-5">
                <h1 className="display-4">Merhaba, Hoş Geldiniz!</h1>
                {user?(<h2 className="display-3">{user.username}</h2>):(<></>)}
                <p className="lead">E-Ticaret sitemizde aradığınız her şeyi bulabilirsiniz. En yeni ürünler ve özel fırsatlar için buradayız!</p>
                <hr className="my-4" />
                <p>Yeni koleksiyonlarımızı keşfetmek ve en iyi teklifleri yakalamak için hemen alışverişe başlayın.</p>
                <Link to="/products" className="btn btn-primary btn-lg">Ürünleri Gör</Link>
            </div>

            <Carousel className="my-4">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x300"
                        alt="Kampanya 1"
                    />
                    <Carousel.Caption>
                        <h3>Kampanya 1</h3>
                        <p>İndirimdeki ürünleri kaçırmayın.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x300"
                        alt="Kampanya 2"
                    />
                    <Carousel.Caption>
                        <h3>Kampanya 2</h3>
                        <p>Yeni sezon ürünlerimiz geldi.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="row mt-5">
                {categories && categories.map(category => (
                    <div key={category.title+Math.floor(Math.random()*100)} className="col-md-4 mb-4" data-aos="fade-up">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{category.title}</h5>
                                <p className="card-text">{category.description}</p>
                                <Link to={`/categories/${category.slug}`} className="btn btn-primary">Keşfet</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="mt-5">Öne Çıkan Ürünler</h2>
            <div className="row mt-3">
            {featuredProducts?.map( (product) => (
                    <div key={product.id} className="col-md-3 mb-4">
                        <div className="card h-100">
                            <img src={process.env.REACT_APP_API_DOMAIN+JSON.parse(product.imageURLs)[0]} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.price}</p>
                                <Link to={`/products/${product.id}`} className="btn btn-primary">Detaylar</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
