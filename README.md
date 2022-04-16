# ETH Coinflip Game :gem: :moneybag: :money_with_wings:

This is an Ethereum coin flip game played on the Rinkeby test network

The contract takes in a wager amount and a bet from the user, it then generates a pseudo random (Not secure to be used with real ETH)
result and pays the user back double their wager if they guessed correctly. 

Game URL: https://eth-coin-flip.vercel.app/

Here is the contract on Rinkeby Etherscan: https://rinkeby.etherscan.io/address/0x82e07dc6f854c6647d834Cb780382617031a3d4d#code

![image](https://user-images.githubusercontent.com/41972596/163691074-983c6f62-b510-45cc-b6d2-c8fea6abf35a.png)

# How to play :blue_book:

1. Download Metamask and create an account
2. Switch to the Rinkeby test network
3. Find a working faucet and add funds to your account
4. Open the game and press the connect wallet button
5. Enter the amount of ETH you wish to wager, you cannot wager more than the game's balance
6. Select heads or tails
7. Press the flip button
8. Confirm the transaction on your Metamask
9. Wait as the transaction is mined. Once complete, if you win, your ETH balance will be sent double your wager amount. If you lost your funds will be gone.

# Technology used

This project was made using Hardhat, Solidity and Javascript.
