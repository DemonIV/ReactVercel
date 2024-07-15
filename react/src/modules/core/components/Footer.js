import React from 'react';

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container">
                <span className="text-muted">
                    <a href="/about" className="mr-2">Hakkımızda</a> | 
                    <a href="/contact" className="mx-2"> İletişim</a> | 
                    <a href="/terms" className="mx-2"> Kullanım Şartları</a> | 
                    <a href="/privacy" className="mx-2"> Gizlilik Politikası</a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;
