import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

function About() {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Animasyon süresini ayarlayın
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="about-header" data-aos="fade-up">
                        <h2>Hakkımızda</h2>
                        <p>E-Ticaret platformumuz hakkında bilgi almak için bu sayfayı inceleyebilirsiniz.</p>
                    </div>

                    <div className="content mt-3">
                        <h5 data-aos="fade-right">Şirketimiz</h5>
                        <p data-aos="fade-right">2020 yılında kurulan E-Ticaret platformumuz, kullanıcılarına geniş ürün yelpazesi ve uygun fiyatlarla hizmet sunmayı hedeflemektedir. Misyonumuz, müşterilerimize en iyi alışveriş deneyimini sağlamaktır.</p>

                        <h5 data-aos="fade-left">Vizyonumuz</h5>
                        <p data-aos="fade-left">Türkiye’nin lider e-ticaret platformlarından biri olmak ve müşteri memnuniyetini en üst düzeyde tutarak sektörde fark yaratmaktır.</p>

                        <h5 data-aos="fade-right">Değerlerimiz</h5>
                        <ul data-aos="fade-right">
                            <li>Müşteri Odaklılık: Müşterilerimizin ihtiyaçlarına öncelik veriyoruz.</li>
                            <li>Güvenilirlik: Güvenilir ve kaliteli hizmet sunmayı taahhüt ediyoruz.</li>
                            <li>Yenilikçilik: Sürekli yenilik ve gelişim peşindeyiz.</li>
                        </ul>

                        <h5 data-aos="fade-left">İletişim</h5>
                        <p data-aos="fade-left">Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz:</p>
                        <address data-aos="fade-left">
                            E-Ticaret Ofisi<br/>
                            Örnek Cadde, No: 123<br/>
                            İstanbul, Türkiye<br/>
                            Posta Kodu: 12345<br/>
                            Telefon: (0212) 123 4567<br/>
                            E-posta: info@eticaret.com
                        </address>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
