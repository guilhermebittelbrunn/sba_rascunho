const fs = require('fs');
const csv = require('csv-parser');
const data_csv = []

fs.createReadStream('./forms.csv')
    .pipe(csv([
        'data_form', 'email', 'data_entrevista', 'como_soube_da_vaga',
        'nome_completo', 'data_nascimento', 'idade', 'cpf', 'estado_civil',
        'filhos', 'qtd_filhos', 'grau_escolaridade', 'cursos_na_area', 'endereco',
        'cidade', 'estado', 'profissao_conjuge', 'razao_social', 'cnpj', 'socios',
        'espresas_possui_restricoes', 'possui_core', 'core', 'numero_core',
        'pagamento_em_dia', , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 
        , , , , , , , , , , , , , , , , , , , , , , , 
        'cidadades_atuacao', 'qtd_clientes', 'qtd_clientes_ativos', 'qtd_clientes_inativos'
        ,'frequencia_visitacao','forma_de_registro','clientes_interesse_de_compra',
        'cliente_para_contato', , , , , , , , , , , , , , , , 
        'tempo_percentual_participacao_empresa','prepostos','proposto_sba',
        'viajar','aceita_meta_minima','aceita_vir_a_empresa','valoriza_empresa','tempo_retorno',
        'valor_comissao','motivo_cliente_comprar','indicadores','dias_inuteis','abertura_clientes',
        'motivo_abertura_clientes','informacoes_necessarias','lida_pressao','cobranca_inaceitavel',
        'modelo_carro','carro_quitado','situacao_moradia','showroom','showroom_itinerante',
        'capital_giro','custo_mensal','faturamento_anual','renda_extra','secretaria','processo_juridico',
        'motivo_processo','planos_metas','assunto_sobre_a_empresa'
    ], 
    {
        separator: ',',
    }))
    .on('data', (data) => {
       
        let index;

        data['empresas'] = [];
        data['trabalhos'] = [];
        data['clientes'] = [];

        index = 19;
        for(let qtd_empresa = 0; qtd_empresa < 4; qtd_empresa++){
            index += 6
            if (data[`_${index}`] !== ''){
                data['empresas'].push({
                    nome: data[`_${index}`],
                    site: data[`_${index + 1}`],
                    segmento: data[`_${index + 2}`],
                    gerente: data[`_${index + 3}`],
                    telefone_gerente: data[`_${index + 4}`],
                    renda_percentual: data[`_${index + 5}`],
                })
            }
        }
        
        index--;
        for(let qtd_trabalho = 0; qtd_trabalho < 4; qtd_trabalho++){
            index += 7
            if (data[`_${index}`] !== ''){
                data['trabalhos'].push({
                    nome: data[`_${index}`],
                    site: data[`_${index + 1}`],
                    segmento: data[`_${index + 2}`],
                    gerente: data[`_${index + 3}`],
                    telefone_gerente: data[`_${index + 4}`],
                    motivo_saida: data[`_${index + 5}`],
                    tempo_empregado: data[`_${index + 6}`],
                })
            }
        }

        index = 82;
        for(let qtd_clientes = 0; qtd_clientes < 5; qtd_clientes++){
            index += 3
            if (data[`_${index}`] !== ''){
                data['clientes'].push({
                    cidade: data[`_${index}`],
                    telefone: data[`_${index + 1}`],
                    contato: data[`_${index + 2}`],
                })
            } 
        }

        for (let teste = 25; teste <= 99; teste++){
            delete data[`_${teste}`];
        } 
        data_csv.push(data);
        
    })
    .on('end', () =>console.log(data_csv))
    .on('error', (error) => console.log(error))



