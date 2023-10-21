import Layout from '../components/layout';
import Link from 'next/link';
import Image from 'next/image'

export default function Home() {
  return (
    <Layout>
        <div className="flex items-center justify-center bg-gradient-to-t via-[#c8ebfd] to-[#e7e9fe] h-screen p-6">
            <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                  <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        IP-SHEILD
                    </h1>
                    <p className="mb-8 leading-relaxed">
                    방어형 지식재산권
                    </p>
                    <div className="flex justify-center">
                        <Link href="/ip-sbt">
                            <a className="btn-project">
                                SBT
                            </a>
                        </Link>
                    </div>
                  </div>
                  <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <Image alt="profil" src="/images/profile/hand-illustration.png" width="500" height="500" className="mx-auto object-cover "/>
                  </div>
                </div>
            </section>
        </div>
    </Layout>
  );
}
