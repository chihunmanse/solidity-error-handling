// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Revert {
    function revertWithoutMessage() external {
        revert();
    }

    function revertWithMessage() external {
        revert("revert message");
    }

    function requireWithoutMessage() external {
        require(false);
    }

    function requireWithMessage() external {
        require(false, "require message");
    }

    function revertByYul() external {
        // 0x08c379a0
        bytes4 errorSelector = bytes4(keccak256(bytes("Error(string)")));

        assembly {
            mstore(0x00, errorSelector)
            mstore(add(0x00, 4), 32) // data offset
            mstore(add(0x00, 36), 14) // string length
            mstore(add(0x00, 68), "revert message")
            revert(0x00, 100)
        }
    }

    error CustomError();
    error CustomErrorWithParameter(uint256 param);

    function revertCustomError() external {
        revert CustomError();
    }

    function revertCustomErrorWithParameter() external {
        revert CustomErrorWithParameter(1);
    }

    function revertCustomErrorByYul() external {
        bytes4 errorSelector = CustomError.selector;

        assembly {
            mstore(0x00, errorSelector)
            revert(0x00, 0x04)
        }
    }

    function revertCustomErrorWithParameterByYul() external {
        bytes4 errorSelector = CustomErrorWithParameter.selector;

        assembly {
            mstore(0x00, errorSelector)
            mstore(add(0x00, 4), 1) // param uint256 value 1 padded to 32 bytes
            revert(0x00, 36)
        }
    }
}
