import React, { useState, useEffect } from 'react';
import Wenb3modal from "web3modal";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";
import { CrowdFundingABI, CrowdFundingAddress } from './context';

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "Crowd Funding Contract";
    const [currentAccount, setCurrentAccount] = useState("");
    useEffect(() => {
        if (currentAccount) {
            console.log(currentAccount);
        }
    }, [currentAccount]);
    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        console.log(title);
        console.log(description);
        console.log(amount);
        console.log(deadline)
        console.log(currentAccount);
        try {
            const transaction = await contract.createCampaign(
                currentAccount,
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime()
            )
            await transaction.wait();
            console.log("contract call success", transaction)
            const campain = contract.getCampaigns();
            console.log(campain)
        } catch (error) {
            console.log("contract call error", error)
        }
    };
    const getCampaigns = async () => {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const campaigns = await contract.getCampaigns();
            const parsedCampaigns = campaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                pId: i,
            }));
            return parsedCampaigns;
        }catch{
            console.log("Install metamask");
        }
       
    }
    const getUserCampaigns = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const contract = fetchContract(provider);
            const allCampaigns = await contract.getCampaigns();

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const currentAccount = accounts[0];
            const filteredCampaigns = allCampaigns.filter(
                (campaign) => campaign.owner === "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
            );

            const userData = filteredCampaigns.map((campaign, i) => ({
                owner: campaign.owner,
                title: campaign.title,
                description: campaign.description,
                target: ethers.utils.formatEther(campaign.target.toString()),
                deadline: campaign.deadline.toNumber(),
                amountCollected: ethers.util.formatEther(
                    campaign.amountCollected.toString()
                ),
                pId: i,
            }));
            return userData;
        } catch {
            console.log("Install Metamask");
        }

    }
    const donate = async (pId, amount) => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        });

        await campaignData.wait();
        location.reload();

        return campaignData;
    }

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];
        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                doantion: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }
        return parsedDonations;
    }
    const checkIfWalletConnected = async () => {
        try {
            if (!window.etherum)
                return 1;
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account Found");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }
    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    const connectWallet = async () => {
        try {
            console.log("dlvj")
            if (!window.ethereum)
                return console.log("Install MetaMask");
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0])
            

        } catch (error) {
            console.log("Install Metamask");
        }
    }
    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    )
}
