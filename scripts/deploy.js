const hre = require("hardhat");

async function main() {
    const Crowdfunding = await hre.ethers.getContractFactory("CrowdFunding");
    const crowdfunding = await Crowdfunding.deploy(); // Corrected line
   // Wait for deployment to be confirmed
   await crowdfunding.waitForDeployment();

    console.log("Crowdfunding deployed to:", crowdfunding.target);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
