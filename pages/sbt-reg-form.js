'use client'
import Layout from "../components/layout";

import jsPDF from "jspdf";					//PDF 생성
import { Web3Storage , getFilesFromPath } from 'web3.storage'
import { useRouter } from 'next/router'


export default function SbtRegForm() {
	const router = useRouter()
	async function submitForm (e) {
		e.preventDefault()

		var target = document.getElementById("category");
		target.options[target.selectedIndex].text

		const frmData ={
			"type": e.target.type.value,
			"app_no": e.target.app_no.value,
			"app_dt": e.target.app_dt.value,
			"category": e.target.category.value,
			"app_name": e.target.app_name.value,
			"owner": e.target.owner.value,
			"creater": e.target.creater.value,
			"product_info": e.target.product_info.value,
			"part_info": e.target.part_info.value,
			"ip_info_01": e.target.ip_info_01.value,
			"ip_info_02": e.target.ip_info_02.value,
			"ip_info_03": e.target.ip_info_03.value
		}

		const options = {
			method: "POST",
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			},
			body: JSON.stringify(frmData)
		}

		await fetch('/sbt' ,options)
		.then(function(response) {
			return response.json()
		})
		.then(function(myJson) {
			console.log('myJson : '+JSON.stringify(myJson))
			router.push({
				pathname: '/sbt-view',
				query: { id: myJson.id},
			})
		});
	}

  return (
    <Layout >
		<section className="bg-white dark:bg-gray-900">
		  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
			  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">SBT(방어형 지식재산권) 등록하기</h2>
			  <form id="sbtForm" onSubmit={submitForm} >
				  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
				  	  <div>
						  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SBT타입</label>
						  <select id="type" name="type" defaultValue="default" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
							  <option value="default">선택</option>
							  <option value="01">특허권</option>
							  <option value="02">상표권</option>
							  <option value="03">디자인권</option>
						  </select>
					  </div>
					  <div className="w-full">
						  <label htmlFor="app_dt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">신청일</label>
						  <input type="text" name="app_dt" id="app_dt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="token_id" required="" />
					  </div>					  					
					  <div className="w-full">
						  <label htmlFor="app_no" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">신청번호</label>
						  <input type="text" name="app_no" id="app_no" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="token_address" required="" />
					  </div>
					  <div>
						  <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">카테고리</label>
						  <select id="category" name="category" defaultValue="default" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
							<option value="default">선택</option>
							<option value="A">농업, 임업 및 어업(01~03)</option>
							<option value="B">광 업(05~08)</option>
							<option value="C">제 조 업(10~34)</option>
							<option value="D">전기, 가스, 증기 및 공기 조절 공급업(35)</option>
							<option value="E">수도, 하수 및 폐기물 처리, 원료 재생업(36~39)</option>
							<option value="F">건 설 업(41~42)</option>
							<option value="G">도매 및 소매업(45~47)</option>
							<option value="H">운수 및 창고업(49~52)</option>
							<option value="I">숙박 및 음식점업(55~56)</option>
							<option value="J">정보통신업(58~63)</option>
							<option value="K">금융 및 보험업(64~66)</option>
							<option value="L">부동산업(68)</option>
							<option value="M">전문, 과학 및 기술 서비스업(70~73)</option>
							<option value="N">사업시설 관리, 사업 지원 및 임대 서비스업(74~76)</option>
							<option value="O">공공 행정, 국방 및 사회보장 행정(84)</option>
							<option value="P">교육 서비스업(85)</option>
							<option value="Q">보건업 및 사회복지 서비스업(86~87)</option>
							<option value="R">예술, 스포츠 및 여가관련 서비스업(90~91)</option>
							<option value="S">협회 및 단체, 수리 및 기타 개인 서비스업(94~96)</option>
							<option value="T">가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동(97~98)</option>
							<option value="U">국제 및 외국기관(99)</option>
						  </select>
					  </div>					  
					  <div className="sm:col-span-2">
						  <label htmlFor="app_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">등록명칭(발명의명칭)</label>
						  <input type="text" name="app_name" id="app_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="owner_of" required="" />
					  </div>					
					  <div className="w-full">
						  <label htmlFor="owner" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">등록권자(특허권자 , 상표권자 , 디자인권자)</label>
						  <input type="text" name="owner" id="owner" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="owner_of" required="" />
					  </div>	
					  <div>
						  <label htmlFor="creater" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">발명자 , 창작자</label>
						  <input type="text" name="creater" id="creater" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="block_number" required="" />
					  </div> 
					  
					  <div className="w-full">
						  <label htmlFor="product_info" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">상표를 사용할 상품 , 디자인의 대상이 되는 물품</label>
						  <input type="text" name="product_info" id="product_info" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="token_uri" required="" />
					  </div>					  
					  <div>
						  <label htmlFor="part_info" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">상표를 사용할 구분</label>
						  <input type="text" name="part_info" id="part_info" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="synced_at" required="" />
					  </div> 
					  <div className="sm:col-span-2">
						  <label htmlFor="ip_info_01" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">추가적인 정보 01</label>
						  <textarea id="ip_info_01" name="ip_info_01" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your metadata here"></textarea>
					  </div>	
					  <div className="sm:col-span-2">
						  <label htmlFor="ip_info_02" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">추가적인 정보 02</label>
						  <textarea id="ip_info_02" name="ip_info_02" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your metadata here"></textarea>
					  </div>	
					  <div className="sm:col-span-2">
						  <label htmlFor="ip_info_03" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">추가적인 정보 03</label>
						  <textarea id="ip_info_03" name="ip_info_03" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your metadata here"></textarea>
					  </div>
				  </div>
				  <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
					  등록
				  </button>
			  </form>
		  </div>
		</section>
    </Layout>
  )
}
