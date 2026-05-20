import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalysisPage from "@/components/AnalysisPage";

const SAMPLE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSale is Ownable {
    ERC20 public token;
    uint256 public price = 0.001 ether;
    uint256 public totalSold;
    mapping(address => uint256) public purchased;

    constructor(address _token) Ownable(msg.sender) {
        token = ERC20(_token);
    }

    function buy(uint256 amount) external {
        uint256 cost = amount * price;
        require(token.balanceOf(address(this)) >= amount, "Insufficient tokens");
        token.transfer(msg.sender, amount);
        purchased[msg.sender] += amount;
        totalSold += amount;
    }

    function setPrice(uint256 _price) external {
        price = _price;
    }

    function withdraw() external {
        (bool ok, ) = msg.sender.call{value: address(this).balance}("");
        require(ok, "Transfer failed");
    }
}`;

export default function AuditPage() {
  return (
    <>
      <Navbar />
      <AnalysisPage
        type="audit"
        title="AuditLens"
        description="Paste a smart contract to get a comprehensive security audit report with severity ratings, proof-of-concept exploits, and actionable remediation steps."
        placeholder="Paste your Solidity, Rust, Vyper, or Move contract here..."
        sampleInput={SAMPLE}
        accentColor="#ef4444"
      />
      <Footer />
    </>
  );
}
