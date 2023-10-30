import Layout from '../components/layout';
import Link from 'next/link';
import Image from 'next/image'

import React, {useState, useEffect} from 'react';

export default function Home() {

  let Web3 = require('web3');

  function Index() {
      
    const [web3, setWeb3] = useState(null)
    const [address, setAddress] = useState(null)
    const [contract, setContract] = useState(null)
    const [totalSupply, setTotalSupply] = useState(0)
  
    let abi = [[
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "identity",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "url",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct soulboundtoken.Soul",
            "name": "_soulData",
            "type": "tuple"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "Burn",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "Mint",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_profiler",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "removeProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "_profiler",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "RemoveProfile",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "identity",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "url",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct soulboundtoken.Soul",
            "name": "_soulData",
            "type": "tuple"
          }
        ],
        "name": "setProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "_profiler",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "SetProfile",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "string",
                "name": "identity",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "url",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct soulboundtoken.Soul",
            "name": "_soulData",
            "type": "tuple"
          }
        ],
        "name": "update",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "Update",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_profiler",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "getProfile",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "identity",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "url",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct soulboundtoken.Soul",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "getSoul",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "identity",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "url",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "score",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              }
            ],
            "internalType": "struct soulboundtoken.Soul",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_profiler",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "hasProfile",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "hasSoul",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_soul",
            "type": "address"
          }
        ],
        "name": "listProfiles",
        "outputs": [
          {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "operator",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "ticker",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]] // Paste your ABI here
    let contractAddress = "0xe3Ca5426245fD7fF43e0f1533b36FB8E46E21F49"
  
    useEffect(() => {
      window.ethereum ?
        ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
          setAddress(accounts[0])
          let w3 = new Web3(ethereum)
          setWeb3(w3)
        
          let c = new w3.eth.Contract(abi, contractAddress)
          setContract(c)
        
          
          c.methods.totalSupply().call().then((_supply) => {
            // Optionally set it to the state to render it using React
            setTotalSupply(_supply)
          }).catch((err) => console.log(err))


        }).catch((err) => console.log(err))
      : console.log("Please install MetaMask")
      
      
    }, [])
    
    function mint(){
      let _price = web3.utils.toWei("1");
      let encoded = contract.methods.safeMint().encodeABI()
  
      let tx = {
          from: address,
          to : YOUR_CONTRACT_ADDRESS,
          data : encoded,
          nonce: "0x00",
          value: web3.utils.numberToHex(_price)
      }
  
      let txHash = ethereum.request({
          method: 'eth_sendTransaction',
          params: [tx],
      }).then((hash) => {
          alert("You can now view your transaction with hash: " + hash)
      }).catch((err) => console.log(err))
      
      return txHash
    }
  }  


  return (
    <Layout>
        <div className="flex items-center justify-center bg-gradient-to-t via-[#c8ebfd] to-[#e7e9fe] h-screen p-6">
            <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                  <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        IP-SHEILD
                    </h1>
                    <p className="mb-8 leading-relaxed">
                    방어형 지식재산권
                    </p>
                    <div className="flex justify-center">
                        <Link href="/ip-sbt">
                            <a className="btn-project">
                                SBT
                            </a>
                        </Link>
                    </div>
                  </div>
                  <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <Image alt="profil" src="/images/profile/hand-illustration.png" width="500" height="500" className="mx-auto object-cover "/>
                  </div>
                </div>
            </section>
        </div>
    </Layout>
  );
}
