import ShoppingKernel from './src/kernel/ShoppingKernel.js';
import PeripheryFactory from './src/periphery/PeripheryFactory.js';

// Configuration for chains
import { ethereumProvider } from './config/chains.js';

const userAddress = '0xUserAddress';
const chainType = 'ethereum'; // Can be dynamically selected

// Load Periphery dynamically
const periphery = PeripheryFactory.getPeriphery(chainType, {
    web3Provider: ethereumProvider
});

// Initialize Kernel
const kernel = new ShoppingKernel(periphery);

// Simulate adding items to the cart and checking out
kernel.addToCart({ id: 1, name: 'Product 1', price: 0.5 });
kernel.addToCart({ id: 2, name: 'Product 2', price: 1.0 });

kernel.checkout(userAddress)
    .then(result => console.log('Transaction successful:', result))
    .catch(err => console.error('Transaction failed:', err));
