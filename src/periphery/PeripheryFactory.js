import EthereumPeriphery from './ethereum/EthereumPeriphery.js';

class PeripheryFactory {
    static getPeriphery(chainType, connectionDetails) {
        switch (chainType) {
            case 'ethereum':
                return new EthereumPeriphery(connectionDetails.web3Provider);
            default:
                throw new Error(`Unsupported chain: ${chainType}`);
        }
    }
}

export default PeripheryFactory;
