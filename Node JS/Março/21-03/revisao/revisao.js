// // const csv = require('csv-parser');
// // const fs = require('fs');
// // const result = [];

// // const formatter = Intl.DateTimeFormat('pt-BR', {
// //     dateStyle: "short"
// // })


// // fs.createReadStream('./forms.csv')
// // .pipe(csv({
// //     separator: ','
// // }))
// // .on('data', (data)=>{
// //     result.push(data);
// // })
// // .on('error', (error)=>{
// //     console.log(error);
// // })
// // .on('end', ()=>{
// //     result.forEach(element=>{
// //         element.Data = typeof Date.parse(new Date);
// //     })
// //     console.log(result[1]);
// // })


// // // let date_now = new Date();
// // // date_now = Date.parse(date_now);



// // // let objt = {

// // //     date_format: undefined

// // // }


// // // objt.date_format = formatter.format(date_now);
// // // console.log(objt);


// let x = false

// let idade = x ?? 5

// console.log(idade);



create table auditoria_regions (
    operacao varchar(10),
    data_hora timestamp,
    regiao_id number(10),
    nome_antigo varchar(50),
    nome_novo varchar(50),
    constraint pk_auditoria_regions primary key (operacao, data_hora, regiao_id)
);

create or replace trigger tr_auditoria_regions
after insert or update or delete on hr.regions
for each row
declare
    nome_antigo varchar(50);
    nome_novo varchar(50);
begin

    if inserting then
        insert into auditoria_regions (operacao, data_hora, regiao_id, nome_novo)
        values ('insert', systimestamp, :new.region_id, :new.region_name);
    elsif updating then
        select region_name into nome_antigo from hr.regions where region_id = :old.region_id;
        nome_novo := :new.region_name;
        insert into auditoria_regions (operacao, data_hora, regiao_id, nome_antigo, nome_novo)
        values ('update', systimestamp, :old.region_id, nome_antigo, nome_novo);
    elsif deleting then
        select region_name into nome_antigo from hr.regions where region_id = :old.region_id;
        insert into auditoria_regions (operacao, data_hora, regiao_id, nome_antigo)
        values ('delete', systimestamp, :old.region_id, nome_antigo);
    end if;
end;
