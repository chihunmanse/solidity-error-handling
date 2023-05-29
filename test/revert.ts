/** @format */
import { Contract } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import { ethers } from "hardhat";

// method id of 'Error(string)'
const ERROR_STRING_PREFIX = "0x08c379a0";

const errorIface = new ethers.utils.Interface([
  "error CustomError()",
  "error CustomErrorWithParameter(uint256 param)",
]);

const decodeErrorData = (data: string) => {
  if (data === "0x") {
    return { kind: "Empty" };
  } else if (data.startsWith(ERROR_STRING_PREFIX)) {
    const encodedReason = data.slice(ERROR_STRING_PREFIX.length);

    const reason = defaultAbiCoder.decode(["string"], `0x${encodedReason}`)[0];

    return {
      kind: "Error",
      reason,
    };
  }

  const sig = data.slice(0, 10);
  const error = errorIface.getError(sig);

  return {
    kind: "Custom",
    id: sig,
    name: error.name,
    data: errorIface.decodeErrorResult(error, data),
  };
};

describe("Revert Test", () => {
  let revert: Contract;

  before(async () => {
    const Revert = await ethers.getContractFactory("Revert");
    revert = await Revert.deploy();
    await revert.deployed();
  });

  describe("Error", () => {
    it("Revert Without Message", async () => {
      try {
        await revert.revertWithoutMessage();

        console.log("success");
      } catch (error: any) {
        console.log("revert without message:", decodeErrorData(error.data));
      }
    });

    it("Revert With Message", async () => {
      try {
        await revert.revertWithMessage();

        console.log("success");
      } catch (error: any) {
        console.log("revert with message:", decodeErrorData(error.data));
      }
    });

    it("Require Without Message", async () => {
      try {
        await revert.requireWithoutMessage();

        console.log("success");
      } catch (error: any) {
        console.log("require without message:", decodeErrorData(error.data));
      }
    });

    it("Require With Message", async () => {
      try {
        await revert.requireWithMessage();

        console.log("success");
      } catch (error: any) {
        console.log("require with message:", decodeErrorData(error.data));
      }
    });

    it("Revert By Yul", async () => {
      try {
        await revert.revertByYul();

        console.log("success");
      } catch (error: any) {
        console.log("revert by yul:", decodeErrorData(error.data));
      }
    });
  });

  describe("Custom Error", () => {
    it("Revert Custom Error", async () => {
      try {
        await revert.revertCustomError();

        console.log("success");
      } catch (error: any) {
        console.log("revert custom error:", decodeErrorData(error.data));
      }
    });

    it("Revert Custom Error With Parameter", async () => {
      try {
        await revert.revertCustomErrorWithParameter();

        console.log("success");
      } catch (error: any) {
        console.log(
          "revert custom error with parameter:",
          decodeErrorData(error.data)
        );
      }
    });

    it("Revert Custom Error By Yul", async () => {
      try {
        await revert.revertCustomErrorByYul();

        console.log("success");
      } catch (error: any) {
        console.log("revert custom error by yul:", decodeErrorData(error.data));
      }
    });

    it("Revert Custom Error With Parameter By Yul", async () => {
      try {
        await revert.revertCustomErrorWithParameterByYul();

        console.log("success");
      } catch (error: any) {
        console.log("revert custom error by yul:", decodeErrorData(error.data));
      }
    });
  });
});
