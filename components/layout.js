import Head from 'next/head';
import Header from './header';
import Footer from './footer';

export default function Layout({ children }) {
    return (
        <div className="bg-primary">   
            <Head>
                <title>IP-SHEILD</title>
                <meta name="description" content="방어형 지식재산권" />
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            <Header/>              
            <div>{children}</div>
            <Footer/>
        </div>
    );
}
