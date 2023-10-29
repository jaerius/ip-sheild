'use client'
import Layout from "../components/layout";
import { useRouter } from 'next/router'

export default function UserRegForm() {
	const router = useRouter()
  return (
    <Layout >
		<section className="bg-white dark:bg-gray-900">
		  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
			  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">사용자 등록하기</h2>
			  <form id="sbtForm" onSubmit={ async (e) => {
				e.preventDefault()
	
				const frmData ={
					"email": e.target.email.value,
					"name": e.target.name.value,
					"birth": e.target.birth.value,
					"hp": e.target.hp.value,
					"address": e.target.address.value,
					"image_src": e.target.image_src.value,
				}

				const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=UTF-8"
					},
					body: JSON.stringify(frmData)
				}

				await fetch('/user' ,options)
				.then(function(response) {
					return response.json()
				})
				.then(function(myJson) {
					console.log(JSON.stringify(myJson))
					router.push('/ip-member')
				});
					
				
					  
			}} >
				  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
					  <div className="sm:col-span-2">
						  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">email</label>
						  <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="이메일 정보를 입력해주세요" required="" />
					  </div>
					  <div className="w-full">
						  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
						  <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="이름 정보를 입력해주세요" required="" />
					  </div>
					  <div className="w-full">
						  <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">birth</label>
						  <input type="text" name="birth" id="birth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="생년월일 정보를 입력해주세요" required="" />
					  </div>					  
					  <div>
						  <label htmlFor="hp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">hp</label>
						  <input type="text" name="hp" id="hp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="전화번호 정보를 입력해주세요" required="" />
					  </div> 
					  
					  <div className="w-full">
						  <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">address</label>
						  <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="주소정보를 입력해주세요" required="" />
					  </div>					  
					  <div>
						  <label htmlFor="image_src" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image_src</label>
						  <input type="file" name="image_src" id="image_src" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="img" required="" />
					  </div> 
					  
				  </div>
				  <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
					  사용자등록
				  </button>
			  </form>
		  </div>
		</section>
    </Layout>
  )
}
