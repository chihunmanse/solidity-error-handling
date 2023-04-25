// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "forge-std/Test.sol";
import {Assert} from "../contracts/Assert.sol";

contract AssertTest is Test {
    Assert public asserter;

    function setUp() external {
        asserter = new Assert();
    }

    function testAssertionError() external {
        vm.expectRevert(stdError.assertionError);
        asserter.assert0x1();
    }
}
