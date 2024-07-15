import { useState, useEffect } from 'react';

export function useProductDetail(id) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Ürünü fetch et
        setProduct({
            id: id,
            name: `Ürün ${id}`,
            price: 200,
            description: 'Bu ürün hakkında detaylı bilgi.',
            options: ['S', 'M', 'L', 'XL']
        });
    }, [id]);

    return product;
}
