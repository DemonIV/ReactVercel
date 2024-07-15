import React from 'react';
import { Card } from 'react-bootstrap';

const MeasurementCard = () => {
    return (
        <Card>
          <Card.Header as="h5">Tişört Ölçüleri</Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Göğüs Ölçüsü:</strong> Tişörtün göğüs bölgesinin altından, koltuk altları hizasında alınan ölçüdür.
              <br />
              <strong>Bel Ölçüsü:</strong> Tişörtün bel kısmının, vücudun en ince noktası olan bel bölgesinden alınan ölçüsüdür.
              <br />
              <strong>Omuz Genişliği:</strong> Tişörtün omuzlarının en uç noktaları arasındaki mesafedir.
              <br />
              <strong>Kol Uzunluğu:</strong> Tişörtün kol kısmının omuzdan bileğe kadar olan uzunluğudur.
              <br />
              <strong>Yaka Tipi:</strong> Tişörtün yaka şekli ve boyutudur (örneğin, V yaka veya yuvarlak yaka).
              <br />
              <strong>Gövde Uzunluğu:</strong> Tişörtün omuz hizasından bel veya kalça hizasına kadar olan uzunluğudur.
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }

export default MeasurementCard;
