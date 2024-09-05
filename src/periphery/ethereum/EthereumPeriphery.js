import Web3 from "web3";
class EthereumPeriphery {
    constructor(web3Provider) {
        this.web3 = new Web3(web3Provider);
    }

    async processPayment(userAddress, amount, orderData) {
        const tx = {
            from: userAddress,
            to: '<merchant_eth_address>',
            value: this.web3.utils.toWei(amount.toString(), 'ether'),
            data: this._encodeOrderData(orderData),
        };
        return await this.web3.eth.sendTransaction(tx);
    }

    _encodeOrderData(orderData) {
        return this.web3.eth.abi.encodeParameters(
            ['uint256[]', 'uint256[]'],
            [orderData.map(item => item.productId), orderData.map(item => item.quantity)]
        );
    }
}

export default EthereumPeriphery;
