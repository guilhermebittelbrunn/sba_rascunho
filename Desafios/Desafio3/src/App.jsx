import './App.css'
import Nav from './components/Nav'
import Header from './components/Header'
import Benefits from './components/Benefits'
import Plans from './components/Plans'

const benefits = [
  {
    tittle: 'Modo Offline',
    description: 'Ouça música onde estiver.',
  },
  {
    tittle: 'Ouça músicas sem anúncios.',
    description: 'Curta música sem anúncios',
  },
  {
    tittle: 'Ouça na ordem que quiser',
    description: 'Qualquer música em qualquer ordem',
  },
  {
    tittle: 'Qualidade de som superior',
    description: 'Sinta o som.',
  },
]

const plans = [
  {
    free_time: "3 meses grátis com a assinatura",
    tittle: "Individual",
    price_description: "R$ 19,90/mês após o período da oferta",
    num_accounts: "1 conta",
    benefits: [
        "Ouça músicas sem anúncios", "Ouça músicas sem anúncios",
        "Ouça músicas sem anúncios", "Ouça músicas sem anúncios"
    ],
    terms_and_conditions: "Somente no plano Individual. Depois, é só R$ 19,90/mês. Sujeito a Termos e Condições. Disponível apenas para quem nunca usou o Premium. A oferta termina em 16/05/2023",
  },
  {
    free_time: "3 meses grátis com a assinatura",
    tittle: "Individual",
    price_description: "R$ 19,90/mês após o período da oferta",
    num_accounts: "1 conta",
    benefits: [
        "Ouça músicas sem anúncios", "Ouça músicas sem anúncios",
        "Ouça músicas sem anúncios", "Ouça músicas sem anúncios"
    ],
    terms_and_conditions: "Somente no plano Individual. Depois, é só R$ 19,90/mês. Sujeito a Termos e Condições. Disponível apenas para quem nunca usou o Premium. A oferta termina em 16/05/2023",
  },
  {
    free_time: "3 meses grátis com a assinatura",
    tittle: "Individual",
    price_description: "R$ 19,90/mês após o período da oferta",
    num_accounts: "1 conta",
    benefits: [
        "Ouça músicas sem anúncios", "Ouça músicas sem anúncios",
        "Ouça músicas sem anúncios", "Ouça músicas sem anúncios"
    ],
    terms_and_conditions: "Somente no plano Individual. Depois, é só R$ 19,90/mês. Sujeito a Termos e Condições. Disponível apenas para quem nunca usou o Premium. A oferta termina em 16/05/2023",
  },
  {
    free_time: "3 meses grátis com a assinatura",
    tittle: "Individual",
    price_description: "R$ 19,90/mês após o período da oferta",
    num_accounts: "1 conta",
    benefits: [
        "Ouça músicas sem anúncios", "Ouça músicas sem anúncios",
        "Ouça músicas sem anúncios", "Ouça músicas sem anúncios"
    ],
    terms_and_conditions: "Somente no plano Individual. Depois, é só R$ 19,90/mês. Sujeito a Termos e Condições. Disponível apenas para quem nunca usou o Premium. A oferta termina em 16/05/2023",
  },
]

function App() {
  

  return (
    <>
      <Nav/>
      <Header/>
      <Benefits benefits={benefits}/>
      <Plans plans={plans}/>
    </>
  )
}

export default App
