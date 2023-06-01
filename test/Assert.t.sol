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

    function testArithmeticError() external {
        vm.expectRevert(stdError.arithmeticError);
        asserter.assert0x11();
    }

    function testDivisionError() external {
        vm.expectRevert(stdError.divisionError);
        asserter.assert0x12();
    }

    function testEnumConversionError() external {
        vm.expectRevert(stdError.enumConversionError);
        asserter.assert0x21();
    }

    function testPopError() external {
        vm.expectRevert(stdError.popError);
        asserter.assert0x31();
    }

    function testIndexOOBError() external {
        vm.expectRevert(stdError.indexOOBError);
        asserter.assert0x32();
    }

    function testRevertOpcode() external {
        vm.expectRevert(stdError.assertionError);
        asserter.assertRevertOpcode();
    }

    function testInvalidOpcode() external {
        bytes memory revertData;
        vm.expectRevert(revertData);
        asserter.assertInvalidOpcode();
    }
}
