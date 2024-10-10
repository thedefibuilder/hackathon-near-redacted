// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract Deploy is Script {
    Counter public counter;

    address public broadcaster;

    function setUp() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        broadcaster = vm.rememberKey(privateKey);
    }

    function run() public {
        vm.startBroadcast(broadcaster);

        counter = new Counter();

        vm.stopBroadcast();
    }
}
