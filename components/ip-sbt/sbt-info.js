'use client'
import { useRef } from 'react';
import { usePDF } from 'react-to-pdf';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";					//PDF 생성
import { Web3Storage , getFilesFromPath } from 'web3.storage'
import { useRouter } from 'next/router'

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

	async function createPdf () {
		//const doc = new jsPDF('p', 'mm', 'a4', true);
		//const doc = new jsPDF('p', 'pt');
		
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
	

    return (
        <div>
			<center>
                <button type="button" onClick={() => createPdf()} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">SBT등록</button>
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
