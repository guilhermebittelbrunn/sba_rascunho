import { useState, useEffect } from "react";
import axios from "axios"
import fs from 'fs'

export default function useFetch(cnpj){
    const [info,setInfo] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);


    useEffect(()=>{
        (async()=>{
            setLoading(true);
            try{
                // const {data} = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
                setInfo({"cnpj_raiz":"05896570","razao_social":"ROSEMEIRE APARECIDA DE SIQUEIRA","capital_social":"0.00","responsavel_federativo":"","atualizado_em":"2023-05-13T03:00:00.000Z","porte":{"id":"01","descricao":"Micro Empresa"},"natureza_juridica":{"id":"2135","descricao":"Empresário (Individual)"},"qualificacao_do_responsavel":{"id":50,"descricao":"Empresário "},"socios":[],"simples":{"simples":"Não","data_opcao_simples":"2007-07-01","data_exclusao_simples":"2008-06-04","mei":"Não","data_opcao_mei":null,"data_exclusao_mei":null,"atualizado_em":"2023-04-08T03:00:00.000Z"},"estabelecimento":{"cnpj":"05896570000125","atividades_secundarias":[],"cnpj_raiz":"05896570","cnpj_ordem":"0001","cnpj_digito_verificador":"25","tipo":"Matriz","nome_fantasia":null,"situacao_cadastral":"Baixada","data_situacao_cadastral":"2008-06-05","data_inicio_atividade":"2003-09-25","nome_cidade_exterior":null,"tipo_logradouro":"RUA","logradouro":"ANTONIO PRADO","numero":"106","complemento":null,"bairro":"CENTRO","cep":"19900080","ddd1":null,"telefone1":null,"ddd2":null,"telefone2":null,"ddd_fax":null,"fax":null,"email":null,"situacao_especial":null,"data_situacao_especial":null,"atualizado_em":"2023-04-08T03:00:00.000Z","atividade_principal":{"id":"4781400","secao":"G","divisao":"47","grupo":"47.8","classe":"47.81-4","subclasse":"4781-4/00","descricao":"Comércio varejista de artigos do vestuário e acessórios"},"pais":{"id":"1058","iso2":"BR","iso3":"BRA","nome":"Brasil","comex_id":"105"},"estado":{"id":26,"nome":"São Paulo","sigla":"SP","ibge_id":35},"cidade":{"id":3660,"nome":"Ourinhos","ibge_id":3534708,"siafi_id":"6795"},"motivo_situacao_cadastral":{"id":54,"descricao":"Baixa - Tratamento Diferenciado Dado As Me E Epp (Lei Complementar Numero 123/2006)"},"inscricoes_estaduais":[{"inscricao_estadual":"495137484115","ativo":false,"atualizado_em":"2023-03-23T03:00:00.000Z","estado":{"id":26,"nome":"São Paulo","sigla":"SP","ibge_id":35}}]}});
                
                setLoading(false)
            }catch(err){
                setError(err);
            }
        })()
    }, [cnpj])

    console.log(info);
    return [info, loading, error]
}

