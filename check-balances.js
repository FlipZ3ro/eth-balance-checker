const fs = require('fs')
const ethers = require('ethers')
require('colors')

const provider = new ethers.providers.WebSocketProvider(
    'wss://mainnet.infura.io/ws/v3/70cfa236c4874bc5baa8178c546e357d'
)

const addresses = fs
    .readFileSync('hits.txt', 'utf8')
    .split('\n')
    .map((val) => {
        return val.split(',')
    })

;(async () => {
    for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i][0]
        const balance = await provider.getBalance(address)

        if (balance.gt(0)) {
            console.log(address.bgGreen.black, balance.toString().bgGreen.black)
            console.log('Private Key: '.yellow, addresses[i][1])
        } else {
            console.log(address, 0)
        }
    }
})()
