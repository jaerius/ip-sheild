import Link from 'next/link';
import DarkModeToggleButton from './elements/dark-mode-toggle-button';

export default function Header(){
    return (
        <>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

                    <Link href="/">
                        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                            <span className="ml-3 text-xl">인천블록체인 칼리지 ipsheild</span>
                        </a>
                    </Link>


                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

                        <Link href="/">
                            <a className="mr-5 hover:text-gray-900">홈</a>
                        </Link>                      
                        <Link href="/intro">
                            <a className="mr-5 hover:text-gray-900">소개</a>
                        </Link>
                        <Link href="/ip-category">
                            <a className="mr-5 hover:text-gray-900">카테고리</a>
                        </Link>                          
                        <Link href="/ip-member">
                            <a className="mr-5 hover:text-gray-900">사용자</a>
                        </Link>						
                        <Link href="/ip-sbt">
                            <a className="mr-5 hover:text-gray-900">SBT정보</a>
                        </Link>
                        <Link href="/login">
                            <a className="mr-5 hover:text-gray-900">로그인</a>
                        </Link>
                    </nav>
                    {/* 다크모드 토글 버튼 작업해야함 */}
                    <DarkModeToggleButton/>
                </div>     
            </header>          
        </>
    );
}
