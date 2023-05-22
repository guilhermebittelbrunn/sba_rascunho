import { useEffect, useState } from "react"
import moment from "moment/moment"

export default function SubDetail({dado, type}){

        return(
            <>
                <details className="ml-4"> 
                    <summary className="py-2 uppercase font-semibold hover:bg-slate-100 transition-all hover:cursor-pointer text-sm">{dado.nome || 'informações detalhadas'}</summary>
                    <div id="Content-info"> 
                      {type != 'estabelecimento' ? <SocioDetail info={dado}/> : <EstabelecimentoDetail info={dado}/>}
                    </div>
                </details>
            </>
        )
} 


function SocioDetail({info}){

    const [arr,setArr] = useState([]);

    useEffect(()=>{
        const cleanInfo = {
            cpf_cnpj_socio: info.cpf_cnpj_socio,
            nome: info.nome,
            tipo: info.tipo,
            data_entrada: moment(info.data_entrada).format('DD/MM/YYYY'),
            cpf_representante_legal: info.cpf_representante_legal,
            faixa_etaria: info.faixa_etaria,
            atualizado_em: moment(info.atualizado_em).format('DD/MM/YYYY'),
            qualificação_sócio: info.qualificacao_socio?.descricao,
            pais: info.pais?.nome
        }
            
       for(let key in cleanInfo){
            setArr((preventValue)=>{
                return [...preventValue, [key, cleanInfo[key]]]
            })
       }
    }, [info])

    return(
        <>
            <ul>
                {arr.map(item=>{
                    return(
                        <li className="flex flex-col justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 text-sm" key={item[0]}>
                            <div className="uppercase font-semibold">{String(item[0]).replace(/_/g, ' ')}</div>
                            <div>{item[1]  ? JSON.stringify(item[1]).replace(/"/g, '') : 'Sem registro'.replace(/"/g, '')}</div>
                        </li>)
                })}
            </ul>
        </>
    )
}
function EstabelecimentoDetail({info}){
    const [arr,setArr] = useState([]);

    useEffect(()=>{
        const cleanInfo = {
            cnpj : info.cnpj,
            atividade_principal: info.atividade_principal?.descricao,
            atividades_secundárias : info.atividades_secundarias.descricao || 'Sem registro',
            cnpj_raiz: info.cnpj_raiz,
            cnpj_ordem: info.cnpj_ordem,
            cnpj_digito_verificador: info.cnpj_digito_verificador,
            tipo: info.tipo,
            nome_fantasia: info.nome_fantasia,
            situação_cadastral: info.situacao_cadastral,
            motivo_situacao_cadastral: info.motivo_situacao_cadastral?.descricao ?? 'Sem registro',
            data_situação_cadastral: moment(info.data_situacao_cadastral).format('DD/MM/YYYY'),
            data_inicio_atividade: moment(info.data_inicio_atividade).format('DD/MM/YYYY'),
            pais: info.pais.nome,
            estado: `${info.estado.sigla}-${info.estado.nome}`,
            cidade: info.cidade.nome ?? 'Sem registro',
            bairro: info.bairro,
            logradouro: `${info.tipo_logradouro} ${info.logradouro}`,
            numero: info.numero,
            cep: info.cep,
            telefone_1: `${info['ddd1'] ?? 'Sem'}-${info.telefone1 ?? 'registro'}`,
            telefone_2: `${info['ddd2'] ?? 'Sem'}-${info.telefone2 ?? 'registro'}`,
            email: info.email,
            situacao_especial: info.situacao_especial,
            data_situação_especial: info.data_situacao_especial,
            atualizado_em: moment(info.atualizado_em).format('DD/MM/YYYY'),
            atividade_principal: info.atividade_principal?.descricao,
            inscrição_estadual: `Número: ${info.inscricoes_estaduais[0].inscricao_estadual ?? 'Não possui'}, situação: ${info.inscricoes_estaduais[0].ativo ? 'Ativo' : 'Inativo'}, Atualizado em: ${moment(info.inscricoes_estaduais.atualizado_em).format('DD/MM/YYYY')}`
            

        }
       for(let key in cleanInfo){
            setArr((preventValue)=>{
                return [...preventValue, [key, cleanInfo[key]]]
            })
       }

    }, [info])

    return(
        <>
            <ul>
                {arr.map(item=>{
            
                    return(
                        <li className="flex flex-col justify-between p-2 border-2 bg-slate-100 border-white border-b-gray-700 my-2 text-sm" key={item[0]}>
                            <div className="uppercase font-semibold">{String(item[0]).replace(/_/g, ' ')}</div>
                            <div>{item[1]  ? JSON.stringify(item[1]).replace(/"/g, '') : 'Sem registro'.replace(/"/g, '')}</div>
                        </li>)
                })}
            </ul>
        </>
    )
}