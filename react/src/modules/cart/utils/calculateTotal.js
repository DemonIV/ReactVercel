export function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
