'use client'
import Layout from "../components/layout";
import { useRouter } from 'next/router'

export default function CategoryRegForm() {
	const router = useRouter()
  return (
    <Layout >
		<section className="bg-white dark:bg-gray-900">
		  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
			  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">카테고리 등록하기</h2>
			  <form id="categoryForm" onSubmit={ async (e) => {
				e.preventDefault()
	
				const frmData ={
					"name": e.target.name.value,
					"code": e.target.code.value,
					"use_yn": e.target.use_yn.value
				}

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=UTF-8"
					},
					body: JSON.stringify(frmData)
				}

				await fetch('/category' ,options)
				.then(function(response) {
					return response.json()
				})
				.then(function(myJson) {
					console.log(JSON.stringify(myJson))
					router.push('/ip-category')
				});
			}} >
				  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
					  <div className="sm:col-span-2">
						  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">카테고리명</label>
						  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="카테고리 명칭정보" required="" />
					  </div>
					  <div className="w-full">
						  <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">카테고리코드</label>
						  <input type="text" name="code" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="카테고리 코드정보" required="" />
					  </div>
					  <div>
						  <label htmlFor="use_yn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">사용여부</label>
						  <select id="use_yn" name="use_yn" defaultValue="default" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
							  <option value="default">선택</option>
							  <option value="Y">사용</option>
							  <option value="N">미사용</option>
						  </select>
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
