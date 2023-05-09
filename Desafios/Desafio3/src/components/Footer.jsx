import img from './spotify.png'
import {BsFacebook, BsTwitter, BsInstagram} from 'react-icons/bs'

export default function Footer(){
    return(
        <>
            <footer className="w-full bg-black text-white">
                <div className="max-w-screen-lg px-4 pt-12 pb-6 m-auto">
                    <div className="grid grid-cols-6 w-full">
                        <div className="col-span-1">
                            <div className='Logo'>
                                <img src={img} alt="img" className='w-28'/>
                            </div>
                        </div>
                        <div className='col-span-3 flex gap-12  max-md:col-span-6 max-md:mt-12  max-md:gap-24 max-sm:flex-col max-sm:gap-16'>
                            <div className=''>
                                <ul className='flex flex-col gap-4'>
                                    <li><h3 className='text-gray-400 uppercase text-xs font-bold'>empresa</h3></li>
                                    <li><a href="/">Sobre</a></li>
                                    <li><a href="/">Empregos</a></li>
                                    <li><a href="/">For the Record</a></li>
                                </ul>
                            </div>
                            <div className=''>
                                <ul className='flex flex-col gap-4'>
                                    <li><h3 className='text-gray-400 uppercase text-xs font-bold'>Comunidades</h3></li>
                                    <li><a href="/">Para Artistas</a></li>
                                    <li><a href="/">Desenvolvedores</a></li>
                                    <li><a href="/">Publicidade</a></li>
                                    <li><a href="/">Investidores</a></li>
                                    <li><a href="/">Fornecedores</a></li>
                                    <li><a href="/">Spotify for Work</a></li>
                                </ul>
                            </div>
                            <div className=''>
                                <ul className='flex flex-col gap-4'>
                                    <li><h3 className='text-gray-400 uppercase text-xs font-bold'>links úteis</h3></li>
                                    <li><a href="/">Suporte</a></li>
                                    <li><a href="/">Player da Web</a></li>
                                    <li><a href="/">Aplicativo móvel grátis</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-span-2 flex flex-col justify-between items-end max-md:items-start  max-md:justify-between max-md:pt-24 max-md:flex-row  max-md:col-span-6'>
                            <ul className='flex gap-3'>
                                <li className='bg-gray-600 bg-opacity-50 rounded-full text-center p-3 font-black text-xl'><a href="/"><BsInstagram/></a></li>
                                <li className='bg-gray-600 bg-opacity-50 rounded-full text-center p-3 font-black text-xl'><a href="/"><BsTwitter/></a></li>
                                <li className='bg-gray-600 bg-opacity-50 rounded-full text-center p-3 font-black text-xl'><a href="/"><BsFacebook/></a></li>
                            </ul>
                            <div>
                                <span className='text-gray-400 text-xs font-bold'>Brasil (Português)</span>
                            </div>
                        </div>
                    </div>
                <section className='flex py-2 px-2 text-gray-400 text-xs justify-between mt-12'>
                    <ul className='flex gap-2'>
                        <li><a href="/" className='hover:text-green-500'>Legal</a></li>
                        <li><a href="/" className='hover:text-green-500'>Centro de Privacidede</a></li>
                        <li><a href="/" className='hover:text-green-500'>Política de privacidade</a></li>
                        <li><a href="/" className='hover:text-green-500'>Cookies</a></li>
                        <li><a href="/" className='hover:text-green-500'>Sobre anúncios</a></li>
                    </ul>
                    <span>°2023 Spotify AB</span>
                </section>
                </div>
            </footer>
        </>
    )
}

