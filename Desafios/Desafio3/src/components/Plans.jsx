import {BsCheck2} from 'react-icons/bs'
import img from './cards.png'

export default function Plans({plans}){
    return(
        <>
            <section className="bg-gray-100 w-full flex pb-16 rounded">
                <div className="max-w-screen-lg flex-col m-auto justify-center py-12 flex gap-12 items-center">
                    <div className="section-header text-center">
                        <h1 className="text-3xl font-bold">Escolha seu plano Premium</h1>
                        <p className="mt-2">Ouça sem limites no seu celular, alto-falante e em outros dispositivos</p>
                        <img src={img} className='w-56 m-auto mt-4' alt="tipos de cobranças" />
                    </div>
                    <div className="section-body">
                        <div className="cards flex flex-wrap flex-row gap-4 justify-center">
                            {plans.map((plan,k) =>{
                               
                                return <Card key={k} plan={plan}/>
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

function Card({plan}){
    return(
        <>
            <div className="main bg-white rounded-lg shadow-2xl px-4 py-6 w-60 max-lg:w-80">
                <div className="card-header200 gap-1 flex flex-col items-start">
                    <span className="font-black text-white bg-blue-500 rounded-md text-xs p-2">{plan.free_time}</span>
                    <span className="text-blue-500 font-bold text-xs p-1 border-2 border-blue-500 rounded-md">Pagamento único disponível</span>
                    <h2 className="font-bold text-xl">{plan.tittle}</h2>
                    <p className="text-sm">{plan.price_description}</p>
                    <p className="text-sm">{plan.num_accounts}</p>
                </div>
                <div className="line w-full h-0.5 bg-gray-300 my-4"/>
                <div className="card-main h-80 max-lg:h-56">
                    {plan.benefits.map((benefit, key)=>{
                        return <p className={`w-full flex text-base ${key} mt-1`}><BsCheck2 className='mx-2 mt-1 text-[24px]'/>{benefit}</p>
                    })}
                </div>
                <div className="card-footer text-center max-lg:mt-8">
                    <button className="w-full rounded-3xl  uppercase text-white py-3 font-bold text-sm bg-gray-900">COMECE AGORA</button>
                    <p className="text-xs text-start mt-4 text-gray-700 w-full pb-4">{plan.terms_and_conditions}</p>
                </div>
            </div>
        </>
    )
}