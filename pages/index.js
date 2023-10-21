import Image from 'next/image'
import Layout from '../components/layout';
import Hero from '../components/home/hero';
import Animation from '../components/home/animation';

export default function Home() {
  return (
    <Layout>
        <div className="flex items-center justify-center bg-gradient-to-t from-[#e7e9fe] via-[#c8ebfd] to-[#e7e9fe] h-screen p-6">
            <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <Hero/>
                </div>
            </section>
        </div>
    </Layout>
  );
}
