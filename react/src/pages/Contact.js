import React from 'react';

function Contact() {
    const address = "Örnek Cadde, No: 123, İstanbul, Türkiye";
    const phone = "(0212) 123 4567";
    const email = "info@eticaret.com";
    const workingTime = "Pazartesi - Cuma, 09:00 - 18:00";

    return (

        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12 contact-header">
                    <h2>İletişim</h2>
                    <p>Sorularınız, yorumlarınız veya önerileriniz için bizimle iletişime geçin. Size yardımcı olmaktan mutluluk duyarız.</p>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="contact-form">
                        <h5>Bize Ulaşın</h5>
                        <form id="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">İsim</label>
                                <input id="name" type="text" className="form-control" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" className="form-control" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Konu</label>
                                <input id="subject" type="text" className="form-control" name="subject" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Mesaj</label>
                                <textarea id="message" className="form-control" name="message" rows="5" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Gönder</button>
                        </form>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="contact-details">
                        <h5>İletişim Bilgilerimiz</h5>
                        <p><i className="bi bi-geo-alt"></i> {address}</p>
                        <p><i className="bi bi-telephone"></i> {phone}</p>
                        <p><i className="bi bi-envelope"></i> {email}</p>
                        <p><i className="bi bi-clock"></i> {workingTime}</p>
                    </div>

                    <div className="contact-map">
                        {/* Google Maps Embed */}
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.47467290624!2d-74.00601548455932!3d40.712775346328756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQyJzQ1LjAiTiA3NMKwMDAnMzAuMCJX!5e0!3m2!1sen!2sus!4v1618386784227!5m2!1sen!2sus" width="100%" height="300" frameBorder="0" style={{ border: 0 }} allowFullScreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
        
        

}

export default Contact;
