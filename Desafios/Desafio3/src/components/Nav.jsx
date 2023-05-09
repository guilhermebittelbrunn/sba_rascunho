import img from './spotify.png'

export default function Nav(){
    return(
        <>
            <nav className="w-scree bg-black text-white flex justify-center">
                <div className='flex justify-between max-w-screen-lg w-full p-5 text-sm items-center font-bold'>
                    <div className='Logo'>
                     <img src={img} alt="img" className='w-28'/>
                    </div>
                    <div className='Links'>
                        <ul className='flex gap-4 items-center'>
                            <li><a href="/" className='hover:text-green-500 max-md:hidden'>Premium</a></li>
                            <li><a href="/" className='hover:text-green-500 max-md:hidden'>Suporte</a></li>
                            <li><a href="/" className='hover:text-green-500 max-md:hidden'>Baixar</a></li>
                            <li><a href="/" className='hover:text-green-500 max-md:hidden'>|</a></li>
                            <li><a href="/" className='hover:text-green-500 max-md:hidden'>Inscrever-se</a></li>
                            <li><a href="/" className='hover:text-green-500 max-md:hidden'>Entrar</a></li>
                            <li>
                                <ul className='hidden flex-col gap-1 max-md:flex'>
                                    <div className='w-5 h-0.5 rounded-lg bg-white'></div>
                                    <div className='w-5 h-0.5 rounded-lg bg-white'></div>
                                    <div className='w-5 h-0.5 rounded-lg bg-white'></div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
