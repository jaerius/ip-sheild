import Layout from "../components/layout"
import React, { useState } from 'react'  
import {useRouter} from 'next/router'


export default function Login() {
  
    const router = useRouter()
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');

    const onChange = (e) => {
      const {name, value} = e.target;
      if(name === 'id') setId(value);
      if(name === 'email') setEmail(value);
    }

    const letsLogin = async (id, email) => {
      const response = await fetch(`http://localhost:8080/user?id=${id}`);
      const [user] = await response.json();
      if (user&&user.email === email) {
        console.log("로그인 성공");
        window.location.href = 'http://localhost:3000';
      }else{
        alert('로그인 실패');
        router.push('/login');
      }
    }


    return (

        <Layout>
	    <section className="text-gray-600 body-font">
            <form className="Login-input">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
      <h1 className="title-font font-medium text-3xl text-gray-900">소상공인 지적재산권 보호 서비스 IP SHIELD</h1>
      <p className="leading-relaxed mt-4">IP SHIELD에 접속하기 위해 로그인하세요.</p>
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
      <div className="relative mb-4">
        <label for="id" className="leading-7 text-sm text-gray-600">ID</label>
        <input type="text" id="id" name="id" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange}/>
      </div>
      <div className="relative mb-4">
        <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={onChange}/>
      </div>
      <button 
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        onClick={() => letsLogin(id, email)}
      >
        로그인
      </button>
      
    </div>
  </div>
  </form>
</section>
    </Layout>

  );
}