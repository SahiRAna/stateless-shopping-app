import { expect } from 'chai';
import sinon from 'sinon';
import ShoppingKernel from '../src/kernel/ShoppingKernel.js';
import EthereumPeriphery from '../src/periphery/ethereum/EthereumPeriphery.js';

import Web3 from 'web3';

// Mock data for testing
const mockProduct1 = { id: 1, name: 'Product 1', price: 0.5, quantity: 1 };
const mockProduct2 = { id: 2, name: 'Product 2', price: 1.0, quantity: 2 };

describe('Shopping Kernel and Periphery Tests', () => {

    let ethereumPeriphery, shoppingKernel;
    let mockUserAddress = '0x1234567890abcdef';

    beforeEach(() => {
        // Create stubs for Web3 and Solana dependencies
        const web3Stub = sinon.createStubInstance(Web3);

        // Initialize the periphery instances with the mocks
        ethereumPeriphery = new EthereumPeriphery(web3Stub);

        // Create the shopping kernel instance with the mocked periphery
        shoppingKernel = new ShoppingKernel(ethereumPeriphery);
    });

    afterEach(() => {
        sinon.restore(); // Restore all stubs and spies
    });

    describe('Shopping Kernel Tests', () => {

        it('should add products to the cart', () => {
            shoppingKernel.addToCart(mockProduct1);
            shoppingKernel.addToCart(mockProduct2);

            expect(shoppingKernel.cart).to.have.lengthOf(2);
            expect(shoppingKernel.cart[0]).to.deep.equal(mockProduct1);
            expect(shoppingKernel.cart[1]).to.deep.equal(mockProduct2);
        });

        it('should calculate the total amount of the cart', () => {
            shoppingKernel.addToCart(mockProduct1);
            shoppingKernel.addToCart(mockProduct2);

            const total = shoppingKernel._calculateTotal();
            expect(total).to.equal(2.5); // 0.5 + (1.0 * 2) = 2.5
        });

        it('should prepare order data correctly', () => {
            shoppingKernel.addToCart(mockProduct1);
            shoppingKernel.addToCart(mockProduct2);

            const orderData = shoppingKernel._prepareOrderData();
            expect(orderData).to.deep.equal([
                { productId: 1, quantity: 1 },
                { productId: 2, quantity: 2 }
            ]);
        });

    });

    describe('Ethereum Periphery Tests', () => {
        it('should process payment on Ethereum', async () => {
            // Stub the sendTransaction method to simulate Ethereum transaction
            const sendTransactionStub = sinon.stub(ethereumPeriphery.web3.eth, 'sendTransaction').resolves('0xTxHash');

            shoppingKernel = new ShoppingKernel(ethereumPeriphery);
            shoppingKernel.addToCart(mockProduct1);
            shoppingKernel.addToCart(mockProduct2);

            const result = await shoppingKernel.checkout(mockUserAddress);

            expect(sendTransactionStub.calledOnce).to.be.true;
            expect(result).to.equal('0xTxHash');
        });
    });
});
