// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

/**
 * @title CoinFlip
 * @notice Coin flip game contract. The user can bet 0 or 1 for heads and tails
 * if the users guesses correctly, they receive double their wager amount
 */
contract CoinFlip is Ownable {
    /* events */
    event Withdraw(address owner, uint256 amount);
    event Winner(address player, uint256 amount);
    event Loser(address player, uint256 amount);

    /*
     *  User calls flip with either 1 or 0 as their bet and sends
     *  the funds to wadger, if they win they recive double the bet amount
     */
    function flip(uint256 bet) public payable {
        // The sender must wager more than 0 ETH
        require(msg.value > 0, "You must wager more than 0 ETH");
        // The wager amount cannot be more than the balance of the contract
        require(
            msg.value <= address(this).balance - msg.value,
            "Game balance is too low, try betting less ETH"
        );
        // The sender must bet 0 or 1 (heads or tails)
        require(bet == 0 || bet == 1, "You must guess 0 or 1");

        // If the user chooses correctly they won, otherwise they lost
        if (bet == random()) {
            // Transfer the winner double the amount of their wager
            (bool sent, ) = msg.sender.call{value: msg.value * 2}("");
            require(sent, "Failed to send Ether");
            // Emit the event that they won
            emit Winner(msg.sender, msg.value);
        } else {
            // Emit the event that they lost, the wager will stay in the contract balance
            emit Loser(msg.sender, msg.value);
        }
    }

    /* Generate a "random" number of 0 or 1 (this is not truly random nor secure)*/
    function random() internal view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % 2;
    }

    /* Withdraw Ether from this contract, only the owner of the contract can call this */
    function withdrawETH() external onlyOwner {
        uint256 balance = getBalance();
        // Send the owner who called the function the amount
        (bool sent, ) = owner().call{value: balance}("");
        require(sent, "Failed to send Ether");
        // Emit the withdraw event
        emit Withdraw(owner(), balance);
    }

    /* Return the balance stored in the contract */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
