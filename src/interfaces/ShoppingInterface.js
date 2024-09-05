// Import the Shopping Kernel and Periphery layers
import ShoppingKernel from '../kernel/ShoppingKernel.js';
import EthereumPeriphery from '../periphery/ethereum/EthereumPeriphery.js';

// Import blockchain-specific libraries
import Web3 from 'web3';

// ShoppingInterface class: UI interaction layer
class ShoppingInterface {
    constructor(blockchain, networkType = 'mainnet') {
        this.blockchain = blockchain;
        this.kernel = null;

        // Initialize the periphery and kernel based on the selected blockchain
        this._initializeKernel(networkType);
    }

    // Initialize kernel and periphery based on blockchain
    _initializeKernel(networkType) {
        if (this.blockchain === 'ethereum') {
            const web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io/v3/<INFURA_API_KEY>');
            const ethereumPeriphery = new EthereumPeriphery(web3);
            this.kernel = new ShoppingKernel(ethereumPeriphery);
        } else if (this.blockchain === 'solana') {
            const connection = new Connection(clusterApiUrl(networkType), 'confirmed');
            const solanaPeriphery = new SolanaPeriphery(connection);
            this.kernel = new ShoppingKernel(solanaPeriphery);
        } else {
            throw new Error('Unsupported blockchain');
        }
    }

    // Function to add a product to the cart
    addToCart(product) {
        this.kernel.addToCart(product);
        console.log('Product added to cart:', product);
    }

    // Function to view the current cart
    viewCart() {
        return this.kernel.viewCart();
    }

    // Function to calculate the total amount of the cart
    calculateTotal() {
        return this.kernel._calculateTotal();
    }

    // Checkout function to initiate payment on the selected blockchain
    async checkout(userAddress) {
        try {
            const result = await this.kernel.checkout(userAddress);
            console.log('Checkout successful:', result);
            return result;
        } catch (error) {
            console.error('Checkout failed:', error);
            throw error;
        }
    }

    // Set the user's wallet address
    setUserAddress(userAddress) {
        this.userAddress = userAddress;
    }
}

export default ShoppingInterface;
