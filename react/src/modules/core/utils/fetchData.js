export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Ağ hatası');
        }
        return await response.json();
    } catch (error) {
        console.error('Veri çekme hatası:', error);
        throw error;
    }
}
