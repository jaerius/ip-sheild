import Layout from "../components/layout";
import SbtInfo from "../components/ip-sbt/sbt-info"
import {useRouter} from 'next/router'
import jsPDF from "jspdf";					//PDF 생성
import { Web3Storage , getFilesFromPath } from 'web3.storage'

export default function SbtView(sbtData) {

	const router = useRouter()
	function getAccessToken () {
	  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdmRWVDMmRiNjZkQmE2ODk0QzQ2MWFDMzg0YUY3OEI4OWRCRWVGRjIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTU3OTM4NTE5MTUsIm5hbWUiOiJpcC1zaGVpbGQifQ.UPG5fSYIewbayQrPWiPIIMUnv71fwQhgzostIFOWHlI'
	}
	function makeStorageClient () {
	  return new Web3Storage({ token: getAccessToken() })
	}	
	
	async function submitForm (e) {
		e.preventDefault()

		var target = document.getElementById("category");
		target.options[target.selectedIndex].text
		const options = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify(resData)
		}

		await fetch('/sbt' ,options)
		.then(function(response) {
			return response.json()
		})
		.then(function(myJson) {
			//console.log('myJson : '+JSON.stringify(myJson))
			createPdf (myJson)
		});

	}
	
	return (
		<Layout >
			<section className="bg-white dark:bg-gray-900">
				<SbtInfo data={sbtData} />
			</section>
		</Layout>
	)
}

// 각 요청 때마다 호출
export async function getServerSideProps(context) {
	const { id } = context.query;
	const res = await fetch('http://localhost:8080/sbt/'+id)
    const sbtData = await res.json()

	//console.log(sbtData);

    return {
      props: {sbtData}, 
    }
}