import Layout from "../components/layout"
import MemberItem from "../components/ip-member/member-info"
import {useRouter} from 'next/router'

export default function Projects({resData}) {
    const router = useRouter();
    
    function regSbt() {
        router.push('/user-reg-form')
    }    
    
    return (
        <Layout >
            <div className="flex flex-col items-center justify-center min-h-screen px-3 mb-10">
                <h1 className="text-4xl font-bold sm:text-6xl">
                    전체 사용자 : <span className="pl-4 text-blue-500">{resData.length}</span>              
                </h1>
                <br/>
                <br/>
                <br/>
                <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" onClick={regSbt}>
                    사용자등록
                </button>                      

                <div className="grid grid-cols-1 gap-8 p-12 m-4 md:grid-cols-4">
                    {resData.map((list, index) => (
                        <MemberItem data={list} key={index}></MemberItem>
                    ))}
                </div>            
            </div>
        </Layout>
    );
}

// 각 요청 때마다 호출
export async function getServerSideProps(context) {
    const res = await fetch('http://localhost:8080/user')
    const resData = await res.json()    
    
    return {
      props: {resData},
    }
}
