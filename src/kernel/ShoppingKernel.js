class ShoppingKernel {
    constructor(peripheryInstance) {
        this.periphery = peripheryInstance;
        this.cart = [];
    }

    addToCart(product) {
        this.cart.push(product);
    }

    async checkout(userAddress) {
        const totalAmount = this._calculateTotal();
        const orderData = this._prepareOrderData();
        return await this.periphery.processPayment(userAddress, totalAmount, orderData);
    }

    _calculateTotal() {
        return this.cart.reduce((total, item) => total + item.price, 0);
    }

    _prepareOrderData() {
        return this.cart.map(item => ({ productId: item.id, quantity: item.quantity }));
    }
}

export default ShoppingKernel;
