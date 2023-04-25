/** @format */

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-truffle5";
import "@nomicfoundation/hardhat-foundry";

const config: HardhatUserConfig = {
  solidity: { compilers: [{ version: "0.8.17" }, { version: "0.7.5" }] },
};

export default config;
