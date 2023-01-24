// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.5;

contract AssertBefore {
    function assert0x1() external pure {
        assert(false);
    }

    function assert0x11() external pure {
        uint256 a = 5;
        uint256 b = 10;

        a - b;
    }

    function assert0x12() external pure {
        uint256 a = 5;
        uint256 b;

        a / b;
    }

    enum Enum {
        A,
        B
    }

    function assert0x21() external pure {
        int256 a = -1;
        Enum(a);
    }

    uint256[] public array;

    function assert0x31() external {
        array.pop();
    } 

    function assert0x32() external view {
        array[5];
    }

    function assertRevertOpcode() external pure {
        // 0x4e487b71
        bytes4 panicId = bytes4(keccak256(bytes("Panic(uint256)")));
     
        assembly {
            mstore(0x00, panicId)
            mstore(add(0x00, 4), 0x1)
            revert(0x00, 36)
        }
    }

    function assertInvalidOpcode() external pure {
        assembly {
            invalid()
        }
    }
}