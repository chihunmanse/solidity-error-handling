/** @format */
import { Contract } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { ethers } from "hardhat";

// method id of 'Panic(uint256)'
const PANIC_CODE_PREFIX = "0x4e487b71";

const decodeAssertErrorData = (
  data: string
): { panicCode: string; panicDescription: string } => {
  if (!data.startsWith(PANIC_CODE_PREFIX))
    return {
      panicCode: "0x",
      panicDescription: "not panic error",
    };

  const encodedReason = data.slice(PANIC_CODE_PREFIX.length);

  let decodePanicCode: number;
  let panicCode: string;
  let panicDescription: string;

  try {
    decodePanicCode = defaultAbiCoder
      .decode(["uint256"], `0x${encodedReason}`)[0]
      .toNumber();

    panicCode = `0x${decodePanicCode.toString(16)}`;
  } catch (e: any) {
    return {
      panicCode: "0x",
      panicDescription: "unknown panic",
    };
  }

  panicDescription = panicErrorCodeToReason(decodePanicCode) ?? "unknown panic";

  return { panicCode, panicDescription };
};

const panicErrorCodeToReason = (errorCode: number): string | undefined => {
  switch (errorCode) {
    case 0x1:
      return "Assertion error";
    case 0x11:
      return "Arithmetic operation underflowed or overflowed outside of an unchecked block";
    case 0x12:
      return "Division or modulo division by zero";
    case 0x21:
      return "Tried to convert a value into an enum, but the value was too big or negative";
    case 0x22:
      return "Incorrectly encoded storage byte array";
    case 0x31:
      return ".pop() was called on an empty array";
    case 0x32:
      return "Array accessed at an out-of-bounds or negative index";
    case 0x41:
      return "Too much memory was allocated, or an array was created that is too large";
    case 0x51:
      return "Called a zero-initialized variable of internal function type";
  }
};

describe("Assert Test", () => {
  let assert: Contract;
  let assertBefore: Contract;

  before(async () => {
    const Assert = await ethers.getContractFactory("Assert");
    assert = await Assert.deploy();
    await assert.deployed();

    const AssertBefore = await ethers.getContractFactory("AssertBefore");
    assertBefore = await AssertBefore.deploy();
    await assertBefore.deployed();
  });

  describe("Assert < 0.8", () => {
    it("Assert Before 0x1", async () => {
      try {
        await assertBefore.assert0x1();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x1 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert Before Revert Opcode", async () => {
      try {
        await assertBefore.assertRevertOpcode();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert revert opcode error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert Before Invalid Opcode", async () => {
      try {
        await assertBefore.assertInvalidOpcode();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert invalid opcode error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert Before 0x11", async () => {
      try {
        const result = await assertBefore.assert0x11();

        console.log("success", result);
      } catch (error: any) {
        console.log(
          "assert 0x11 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert Before 0x12", async () => {
      try {
        await assertBefore.assert0x12();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x12 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert Before 0x21", async () => {
      try {
        await assertBefore.assert0x21();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x21 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert Before 0x31", async () => {
      try {
        await assertBefore.assert0x31();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x31 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert Before 0x32", async () => {
      try {
        await assertBefore.assert0x32();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x32 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });
  });

  describe("Assert >= 0.8", () => {
    it("Assert 0x1", async () => {
      try {
        await assert.assert0x1();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x1 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert Revert Opcode", async () => {
      try {
        await assert.assertRevertOpcode();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert revert opcode error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert Invalid Opcode", async () => {
      try {
        await assert.assertInvalidOpcode();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert invalid opcode error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert 0x11", async () => {
      try {
        const result = await assert.assert0x11();

        console.log("success", result);
      } catch (error: any) {
        console.log(
          "assert 0x11 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert 0x12", async () => {
      try {
        await assert.assert0x12();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x12 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert 0x21", async () => {
      try {
        await assert.assert0x21();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x21 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert 0x31", async () => {
      try {
        await assert.assert0x31();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x31 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });

    it("Assert 0x32", async () => {
      try {
        await assert.assert0x32();

        console.log("success");
      } catch (error: any) {
        console.log(
          "assert 0x32 error data:",
          decodeAssertErrorData(error.data)
        );
      }
    });
  });
});
