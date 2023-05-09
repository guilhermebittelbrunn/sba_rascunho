import './App.css'
import Nav from './components/Nav'
import Header from './components/Header'
import Benefits from './components/Benefits'
import Plans from './components/Plans'
import Footer from './components/Footer'

import {RiMusic2Fill} from 'react-icons/ri'
import {GoAlert} from 'react-icons/go'
import {SiYoutubemusic} from 'react-icons/si'
import {MdHeadset} from 'react-icons/md'

const benefits = [
  {
    tittle: 'Modo Offline',
    description: 'Ouça música onde estiver.',
    icon: <RiMusic2Fill/>
  },
  {
    tittle: 'Ouça músicas sem anúncios.',
    description: 'Curta música sem anúncios',
    icon: <GoAlert/>
  },
  {
    tittle: 'Ouça na ordem que quiser',
    description: 'Qualquer música em qualquer ordem',
    icon: <SiYoutubemusic/>
  },
  {
    tittle: 'Qualidade de som superior',
    description: 'Sinta o som.',
    icon: <MdHeadset/>
  },
]

const plans = [
  {
    free_time: "3 meses grátis com a assinatura",
    tittle: "Individual",
    price_description: "R$ 19,90/mês após o período da oferta",
    num_accounts: "1 conta",
    benefits: [
        "Ouça músicas sem anúncios", "Ouça em qualquer lugar — até quando estiver offline",
        "Ouça músicas na ordem que quiser", "Faça um plano pré-pago ou uma assinatura"
    ],
    terms_and_conditions: "Somente no plano Individual. Depois, é só R$ 19,90/mês. Sujeito a Termos e Condições. Disponível apenas para quem nunca usou o Premium. A oferta termina em 16/05/2023.",
  },
  {
    free_time: "1 mês grátis com a assinatura",
    tittle: "Duo",
    price_description: "R$ 24,90/mês após o período da oferta",
    num_accounts: "2 contas",
    benefits: [
        "2 contas Premium para pessoas que moram juntas", 
        "Música sem anúncios, no modo offline e na ordem que você quiser",
        "Faça um plano pré-pago ou uma assinatura"
    ],
    terms_and_conditions: "Sujeito a Termos e Condições. O mês grátis não está disponível para usuários que já usaram o Premium",
  },
  {
    free_time: "1 mês grátis com a assinatura",
    tittle: "Família",
    price_description: "R$ 34,90/mês após o período da oferta",
    num_accounts: "Até 6 contas",
    benefits: [
        "6 contas Premium para familiares que moram no mesmo endereço",
        "Bloqueie músicas com conteúdo explícito",
        "Música sem anúncios, no modo offline e na ordem que você quiser", 
        "Spotify Kids: um app separado, feito especialmente para crianças",
        "Faça um plano pré-pago ou uma assinatura"
    ],
    terms_and_conditions: "Sujeito a Termos e Condições. O mês grátis não está disponível para usuários que já usaram o Premium.",
  },
  {
    free_time: "1 mês grátis com a assinatura",
    tittle: "Universitário",
    price_description: "R$ 9,90/mês após o período da oferta",
    num_accounts: "1 conta",
    benefits: [
        "Desconto especial para estudantes universitários elegíveiss",
        "Ouça músicas sem anúncios",
        "Ouça em qualquer lugar — até quando estiver offline", 
        "Ouça músicas na ordem que quiser"
    ],
    terms_and_conditions: "Oferta disponível somente para estudantes de instituições de ensino superior credenciadas. O mês grátis não está disponível para usuários que já experimentaram o Premium. Sujeito aos Termos e Condições da oferta do Spotify de desconto para universitários.",
  },
]

function App() {
  

  return (
    <>
      <Nav/>
      <Header/>
      <Benefits benefits={benefits}/>
      <Plans plans={plans}/>
      <Footer/>
    </>
  )
}

export default App
