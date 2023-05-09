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
                        <ul className='flex gap-4'>
                            <li><a href="/" className='hover:text-green-500'>Premium</a></li>
                            <li><a href="/" className='hover:text-green-500'>Suporte</a></li>
                            <li><a href="/" className='hover:text-green-500'>Baixar</a></li>
                            <li><a href="/" className='hover:text-green-500'>|</a></li>
                            <li><a href="/" className='hover:text-green-500'>Inscrever-se</a></li>
                            <li><a href="/" className='hover:text-green-500'>Entrar</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}