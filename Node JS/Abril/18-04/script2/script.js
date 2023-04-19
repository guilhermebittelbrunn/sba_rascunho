const fs = require('fs');
const csv = require('csv-parser');
const moment = require('moment');

let info = [];

// fs.createReadStream('./form.csv')
//     .pipe(
//         csv(
//             [
//                 //Sessão 1
//                 'data_form',
//                 'email',
//                 'data_entrevista',
//                 'como_soube_da_vaga',
//                 'nome_completo',
//                 'data_nascimento',
//                 'cpf',
//                 'estado_civil',
//                 'filhos',
//                 'qtd_filhos',
//                 'grau_escolaridade',
//                 'cursos_na_area',
//                 'endereco',
//                 'cidade',
//                 'estado',
//                 'profissao_conjuge',
//                 //Sessão 2
//                 'razao_social',
//                 'cnpj',
//                 'socios',
//                 'espresas_possui_restricoes',
//                 'tipo_empresa',
//                 'CNAE_461680001',
//                 'servico1009',
//                 'emite_nota_fical',
//                 'conta_pessoa_juridica',
//                 //Sessão 3
//                 'possui_core',
//                 'core',
//                 'numero_core',
//                 'pagamento_em_dia',
//                 //Sessão 4
//                 'quais_empresas_atua',
//                 'sites_empresas',
//                 'segmento_empresas',
//                 'nome_gerentes',
//                 'telefone_gerentes',
//                 'percentual_renda_empresas',
//                 //Sessão 5
//                 'servico_ultimos_3_anos',
//                 'site_empresa',
//                 'segmento_empresa',
//                 'nome_gerente',
//                 'telefone_gerente',
//                 'motivo_saida',
//                 'tempo_de_servico',
//                 //Sessão 6
//                 'cidadades_atuacao',
//                 'qtd_clientes',
//                 'frequencia_visitacao',
//                 'forma_de_registro',
//                 //Sessão 7
//                 'tempo_percentual_participacao_empresa',
//                 'prepostos',
//                 'proposto_sba',
//                 'viajar',
//                 'aceita_meta_minima',
//                 'aceita_meta_clientes',
//                 'participar_reunioes',
//                 'aceita_vir_a_empresa',
//                 'valoriza_empresa',
//                 'tempo_retorno',
//                 'valor_comissao',
//                 'motivo_cliente_comprar',
//                 //Sessão 8
//                 'indicadores',
//                 'roteiro_viagens',
//                 'dias_inuteis',
//                 'abertura_clientes',
//                 'motivo_abertura_clientes',
//                 'informacoes_necessarias',
//                 'lida_pressao',
//                 //Sessão 9
//                 'modelo_carro',
//                 'carro_quitado',
//                 'situacao_moradia',
//                 'showroom',
//                 'showroom_itinerante',
//                 'capital_giro',
//                 'custo_mensal',
//                 'faturamento_anual',
//                 'renda_extra',
//                 'secretaria',
//                 //Sessão 10
//                 'processo_juridico',
//                 'motivo_processo',
//                 'planos_metas',
//                 'assunto_sobre_a_empresa',
//             ],
//             { separator: ',' }
//         )
//     )
//     .on('data', (data) => {
//         info.push(data);
//     })
//     .on('error', (error) => {
//         console.log(error);
//     })
//     .on('end', (end) => {
//         console.log(info);
//     });

// const date = new Date('1996-03-13');
// console.log(date.getTime());

//Data de nascimento
//Adicionar perguntas

const nascimento = '1996-03-13';
const nascimento_stamp = moment(nascimento).unix();

const current_date = moment();
const current_date_stamp = moment(current_date).unix();

const resultDate_stamp = current_date_stamp - nascimento_stamp;
const resultDate = moment(resultDate_stamp);

console.log(nascimento, nascimento_stamp);
console.log(current_date, current_date_stamp);
console.log(resultDate, resultDate_stamp);

console.log(Math.floor(new Date(resultDate_stamp) / 31556952));

console.log(String(Math.floor((moment() - moment(nascimento)) / 31556952)).slice(0, 2));
