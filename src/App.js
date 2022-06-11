import "./App.css";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import contractABI from "./contractABI.json";

const contractAddress = "0xdF85f560c906C85F52342495EaBe8a75cf5ea176";

function App() {
 
  const [account, setAccount] = useState(null);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);
  // state for whether app is minting or not.
  const [isMinting, setIsMinting] = useState(false);


  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  useEffect(() => {
    function initNFTContract() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setNFTContract(new Contract(contractAddress,contractABI.abi,signer));
    }
    initNFTContract();
  }, [account]);


  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }
 

    const data = [
        {
            url: "https://solless.mypinata.cloud/ipfs/QmPzq3SXs9abnPB26L4f8caesucNmhAgch6rTiw4AzzWTJ/1.jpg",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmPK8KTmK2kDq7aKSoKcsFWzC19CiwddqND3qYhobhPyYr/1.json')",
        },
        {
          url: "./assets/images/2.jpg",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmPK8KTmK2kDq7aKSoKcsFWzC19CiwddqND3qYhobhPyYr/2.json')",
        },
        {
          url: "./assets/images/3.jpg",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmPK8KTmK2kDq7aKSoKcsFWzC19CiwddqND3qYhobhPyYr/3.json')",
        },
        {
          url: "./assets/images/4.jpg",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmPK8KTmK2kDq7aKSoKcsFWzC19CiwddqND3qYhobhPyYr/4.json')",
        },
        {
          url: "./assets/images/6.jpg",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmPK8KTmK2kDq7aKSoKcsFWzC19CiwddqND3qYhobhPyYr/6.json')",
        },
        {
          url: "./assets/images/5.jpg",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmPK8KTmK2kDq7aKSoKcsFWzC19CiwddqND3qYhobhPyYr/5.json')",
        },
    ];

    async function withdrawMoney(){
        try {
 
            const response = await NFTContract.withdrawMoney();
            console.log("Received: ", response);
          } catch (err) {
              alert(err);
          }
          
    }

    async function handleMint(tokenURI) {
        setIsMinting(true);
            try {
              const options = {value: ethers.utils.parseEther("0.01")};
              const response = await NFTContract.mintNFT(tokenURI, options);
              console.log("Received: ", response);
            } catch (err) {
                alert(err);
            }
            finally {
              setIsMinting(false);
            }
    }

    if (account === null) {
      return (
        <>
         <div className="container">
           <br/>
          <h1> 🔮 Mayang NFT Gallery</h1>
          <h2>NFT Ganu Kiter</h2>
          <p>Buy heritage NFT from our marketplace.</p>
  
          {isWalletInstalled ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <p>Install Metamask wallet</p>
          )}
          </div>
          </>
      );
    }

    return (
        <>
            <div className="container">
            <br/>
            <h1> 🔮 NFT by Mayang Labs</h1>
          
             <h2>NFT Ganu Kite</h2>
                {data.map((item, index) => (
                    <div className="imgDiv">
                        <img
                            src={item.url}
                            key={index}
                            alt="images"
                            width={250}
                            height={250}
                        />
                        <button isLoading={isMinting}
                            onClick={() => {
                                eval(item.param);
                            }}
                        >
                            Mint - 0.01 eth
                        </button>
                    </div>
                ))}
                 <button 
                            onClick={() => {
                                withdrawMoney();
                            }}
                        >
                            Withdraw Money from Contract
                 </button>
          
        </div>

        </>
    );
}

export default App;