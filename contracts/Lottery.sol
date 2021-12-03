pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    address public lastWinner;
    
    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value == .005 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(sha3(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        lastWinner = players[index];
        players = new address[](0);
    }

    function getBalance() public view restricted returns (uint) {
        return uint(this.balance);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}
