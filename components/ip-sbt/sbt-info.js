'use client'

import html2canvas from "html2canvas";
import jsPDF from "jspdf";					//PDF 생성
import { Web3Storage , getFilesFromPath } from 'web3.storage'
import { useRouter } from 'next/router'
import { useState, useCallback } from "react";
import { ethers } from "ethers";

import ConnectButton from '../elements/ConnectButton';

export default function SbtInfo({data}){
    const router = useRouter()
	function getAccessToken () {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdmRWVDMmRiNjZkQmE2ODk0QzQ2MWFDMzg0YUY3OEI4OWRCRWVGRjIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTU3OTM4NTE5MTUsIm5hbWUiOiJpcC1zaGVpbGQifQ.UPG5fSYIewbayQrPWiPIIMUnv71fwQhgzostIFOWHlI'
    }
    function makeStorageClient () {
        return new Web3Storage({ token: getAccessToken() })
    }	
      
	let today = new Date();  
	const appDt = today.toLocaleString()

    const type = data.sbtData.type
    const app_no = data.sbtData.app_no
    const app_dt = data.sbtData.app_dt
    const reg_dt = data.sbtData.reg_dt
    const app_name = data.sbtData.app_name
    const owner = data.sbtData.owner
    const creater = data.sbtData.creater
    const product_info = data.sbtData.product_info
    const part_info = data.sbtData.part_info
	const ip_info_01 = data.sbtData.ip_info_01
	const ip_info_02 = data.sbtData.ip_info_02
	const ip_info_03 = data.sbtData.ip_info_03    
    const tokenUri = data?.sbtData.token_uri
	const blockUri = ''
    const completeYn = ''

	async function createPdf () {
		const doc = new jsPDF({
			orientation: "p", // p: 가로(기본), l: 세로
			unit: "mm", // 단위 : "pt" (points), "mm", "in" or "px" 등)
			format: "a4", // 포맷 (페이지 크기).
		});
		const paper = document.querySelector("#sbtInfomation");
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const canvas = await html2canvas(paper);
        const imageFile = canvas.toDataURL("image/png", 1.0);

        doc.addImage(imageFile, "JPEG", 0, 0, pageWidth, pageHeight , 'FAST');

		const blobPDF = new Blob([doc.output('blob')] , { type: 'application/pdf' })
		const files = [ new File([blobPDF], 'sbt.pdf', { type: 'application/pdf', }) ]

		setIpfs(files , data.sbtData)
	}

	async function setIpfs( files , json ) {
		// show the root cid as soon as it's ready
		const onRootCidReady = cid => {
			//cid 구성이 정상일때 DB 수정
			json.token_uri = "https://"+cid+".ipfs.w3s.link/sbt.pdf"
			json.complete_yn = "true"
			const options = {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json; charset=UTF-8'
				},
				body: JSON.stringify(json)
			}
			fetch('/sbt/'+json.id ,options)
			router.push('/ip-sbt')
		}

		// when each chunk is stored, update the percentage complete and display
		const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)

		let uploaded = 0
		const onStoredChunk = size => {
			uploaded += size
			const pct = 100 * (uploaded / totalSize)
			console.log(`Uploading... ${pct.toFixed(2)}% complete`)
		}

		// makeStorageClient returns an authorized web3.storage client instance
		const client = makeStorageClient()

		client.put(files, { onRootCidReady, onStoredChunk })
	}
	

	const [provider, setProvider] = useState(undefined);
	const [signer, setSigner] = useState(undefined)
	const [walletAddress, setWalletAddress] = useState(undefined)
	const [currentBalance, setCurrentBalance] = useState(undefined)
	const [chainId, setChainId] = useState(undefined)
	const [isConnected,setIsConnected] = useState(false)
  
	const connectWallet = useCallback(async () => {
		console.log('connectWallet')
		try {
			if(typeof window.ethereum !== 'undefined') {
				await getMetamaskData();
				setIsConnected(true);
			} else {
				alert("please install MetaMask")
			}
		} catch (error) {
			console.log(error);
		}
	},[])
  
	const getMetamaskData = async () => {
		console.log('getMetamaskData')
		const _provider = await getProvider();

		console.log('_provider : '+JSON.stringify(_provider))

		const _signer = await getSigner(_provider);

		console.log('_signer : '+JSON.stringify(_signer))

		await getWalletData(_signer);
	}
  
	const getProvider = async () => {
		//console.log('getProvider:'+JSON.stringify(window.ethereum))
	  	
		let provider;
		if (window.ethereum == null) {
			console.log("MetaMask not installed; using read-only defaults")
			//provider = ethers.getDefaultProvider()
			provider = await new ethers.providers.Web3Provider(window.ethereum)
		} else {
			provider = new ethers.BrowserProvider(window.ethereum)
		}

	  	setProvider(provider)  
	  	return provider;
	}

	const getSigner = async (provider) => {
		console.log('getSigner : '+JSON.stringify(provider))
		await provider.send("eth_requestAccounts", []);
		const signer = await provider.getSigner();
		setSigner(signer) 
	
		return signer;
	}
	
	const getWalletData = async(signer) => {
		console.log('getWalletData 0 : '+JSON.stringify(signer))
		console.log('getWalletData 1 : '+JSON.stringify(signer.provider))
		console.log('getWalletData 2 : '+signer.address)

		const transaction = await signer.sendTransaction({
			to: signer.address
			//value: ethers.utils.parseUnits('0.001', 'ether')
			//ethers.utils.hexlify(ethers.utils.toUtf8Bytes('<YOUR_STRING>'));
		}).then((transaction) => {
			//console.dir(transaction)
			console.log('transaction :: '+JSON.stringify(transaction))
			alert("Send finished!")
		});

		console.log(transaction);

		setTransactionHash(transaction.hash);
	}

    return (
        <div>
			<center>
                <button type="button" onClick={() => createPdf()} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">SBT등록</button>
				<div className="App">
					<nav className='nav'>
						<div className='rightNav'>
							<div className="connectButtonContainer">
								<ConnectButton
									isConnected={isConnected}
									connectWallet={connectWallet}
									walletAddress={walletAddress}
									currentBalance={currentBalance}
									chainId={chainId}
								/>
							</div>
						</div>
					</nav>
				</div>
            </center>
            <div id="sbtInfomation" className="py-8 px-9 mx-auto max-w-7xl max-h-10xl lg:py-16">         
                <div style={{ backgroundImage: `url(/images/sbt/${type}.png)`}} className='relative image'>
					<div className='py-80 px-80 mx-auto'>
						<h3 className="font-bold text-3xl py-10">{app_no}</h3>
						<h3 className="font-bold text-xl py-10">{app_dt}</h3>
						<h3 className="font-bold text-xl py-10">{reg_dt}</h3>
						<h3 className="text-xl py-10">{app_name}</h3>
						<h3 className="text-xl py-10">{owner}</h3>
						<h3 className="text-xl py-10">{creater}</h3>
						<h3 className="text-xl py-10">{product_info}</h3>
						<h3 className="text-xl py-10">{part_info}</h3>
						<h3 className="text-xl py-10">{ip_info_01}</h3>
						<h3 className="text-xl py-10">{ip_info_02}</h3>
						<h3 className="text-xl py-10">{ip_info_03}</h3>
						
					</div>
                </div>
			</div>
        </div>
    );
}
