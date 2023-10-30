import Layout from "../components/layout";
import SbtInfo from "../components/ip-sbt/sbt-info"

export default function SbtView(sbtData) {
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
    return {
      props: {sbtData}, 
    }
}