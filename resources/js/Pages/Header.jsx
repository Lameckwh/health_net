import React from 'react'

function Header() {
  return (
    <>
       <Head title="Welcome" />
       <header className="fixed top-0 w-full shadow-md py-4 px-4 sm:px-10 bg-[#07B0F1] font-[sans-serif] min-h-[70px] tracking-wide z-50">
    <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link href="javascript:void(0)">
            <img
                src="https://readymadeui.com/readymadeui.svg"
                alt="logo"
                className="w-36"
            />
        </Link>

        <div
            id="collapseMenu"
            className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        >
            <button
                id="toggleClose"
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 fill-black"
                    viewBox="0 0 320.591 320.591"
                >
                    <path
                        d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                        data-original="#000000"
                    ></path>
                    <path
                        d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                        data-original="#000000"
                    ></path>
                </svg>
            </button>

            <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                <li className="mb-6 hidden max-lg:block">
                    <Link href="#home">
                        <img
                            src="https://readymadeui.com/readymadeui.svg"
                            alt="logo"
                            className="w-36"
                        />
                    </Link>
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                    <a
                        href="#home"
                        className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]"
                    >
                        Home
                    </a>
                </li>

                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                    <a
                        href="#feature"
                        className="hover:text-[#007bff] text-white block font-semibold text-[15px]"
                    >
                        Feature
                    </a>
                </li>

                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                    <a
                        href="#about"
                        className="hover:text-[#007bff] text-white block font-semibold text-[15px]"
                    >
                        About
                    </a>
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                    <a
                        href="#contact"
                        className="hover:text-[#007bff] text-white block font-semibold text-[15px]"
                    >
                        Contact
                    </a>
                </li>
            </ul>
        </div>

        <div className="flex max-lg:ml-auto space-x-3">
            {auth.user ? (
                <Link
                    href={route("dashboard")}
                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href={route("login")}
                        className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-white  transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                    >
                        Log In
                    </Link>
                    <Link
                        href={route("register")}
                        className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
                    >
                        Sign Up
                    </Link>
                </>
            )}
        </div>
    </div>
</header>
    </>

  )
}

export default Header
