//import Image from "next/image";
import {useState} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function SbtItem({data}){

    const [numPages, setNumPages] = useState ();
    const [pageNumber, setPageNumber] = useState (1);
    const [pageScale, setPageScale] = useState(1); // 페이지 스케일

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    const type = data.type
    const app_no = data.app_no
    const app_dt = data.app_dt
    const reg_dt = data.reg_dt
    const app_name = data.app_name
    const owner = data.owner
    const creater = data.creater
    const product_info = data.product_info
    const part_info = data.part_info
	const ip_info_01 = data.ip_info_01
	const ip_info_02 = data.ip_info_02
	const ip_info_03 = data.ip_info_03    
    const tokenUri = data?.token_uri
    const blockUri = ''
    const completeYn = ''
    
    return (
        <div className="project-card content-center">
            {/* 생성된 PDF null 체크 */}
            {tokenUri && (
                <div onContextMenu={e => e.preventDefault()}>
                    <Document file={tokenUri} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page width={150} height={72} scale={3} pageNumber={1} />
                    </Document>
                </div>                
            )}
            <div className="p-4 flex flex-col">
                <h1 className="text-2xl">{type}</h1>
                <h1 className="text-2xl">{app_no}</h1>
                <h3 className="mt-4 text-xl">{app_dt}</h3>
				<h3 className="mt-4 text-xl">{reg_dt}</h3>
				<h3 className="mt-4 text-xl">{app_name}</h3>
				<h3 className="mt-4 text-xl">{owner}</h3>
				<h3 className="mt-4 text-xl">{creater}</h3>
				<h3 className="mt-4 text-xl">{product_info}</h3>
				<h3 className="mt-4 text-xl">{part_info}</h3>
				<h3 className="mt-4 text-xl">{ip_info_01}</h3>
                <h3 className="mt-4 text-xl">{ip_info_02}</h3>
                <h3 className="mt-4 text-xl">{ip_info_03}</h3>
            </div>

        </div>
    );
}
