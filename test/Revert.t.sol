// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "forge-std/Test.sol";
import {Revert} from "../contracts/Revert.sol";

contract RevertTest is Test {
    Revert public reverter;

    function setUp() external {
        reverter = new Revert();
    }

    function testRevertWithoutMessage() external {
        vm.expectRevert();
        reverter.revertWithoutMessage();
    }

    function testRevertWithMessage() external {
        vm.expectRevert("revert message");
        reverter.revertWithMessage();
      
    }

    function testRequireWithoutMessage() external {
        vm.expectRevert();
        reverter.requireWithoutMessage();
    }

    function testRequireWithMessage() external {
        vm.expectRevert("require message");
        reverter.requireWithMessage();
    }

    function testRevertByYul() external {
        vm.expectRevert("revert message");
        reverter.revertByYul();
    }

    error CustomError();
    error CustomErrorWithParameter(uint256 param);

    function testRevertCustomError() external {
        vm.expectRevert(CustomError.selector);
        reverter.revertCustomError();
    }

    function testRevertCustomErrorWithParameter() external {
        vm.expectRevert(abi.encodeWithSelector(CustomErrorWithParameter.selector, 1));
        reverter.revertCustomErrorWithParameter();
    }

    function testRevertCustomErrorByYul() external {
        vm.expectRevert(CustomError.selector);
        reverter.revertCustomErrorByYul();
    }

    function testRevertCustomErrorWithParameterByYul() external {
        vm.expectRevert(abi.encodeWithSelector(CustomErrorWithParameter.selector, 1));
        reverter.revertCustomErrorWithParameterByYul();
    }




    // function revertCustomErrorWithParameterByYul() external {
    //     bytes4 errorSelector = CustomErrorWithParameter.selector;

    //     assembly {
    //         mstore(0x00, errorSelector)
    //         mstore(add(0x00, 4), 1) // param uint256 value 1 padded to 32 bytes
    //         revert(0x00, 36)
    //     }
    // }
}
