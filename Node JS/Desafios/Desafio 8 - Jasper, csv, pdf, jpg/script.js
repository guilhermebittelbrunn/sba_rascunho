const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const list_rep = [];
const pdfConverter = require('pdf-poppler');

const jasper = require('node-jasper')({
    path: './reports',
    reports: {
        folder_metas: {
            jasper: './reports/folder_metas.jasper',
            conn: 'in_memory_json',
        },
    },
});

const report = {
    report: 'folder_metas',
    data: {},
    dataset: undefined,
};

function convertImage(pdfPath) {
    let option = {
        format: 'jpeg',
        out_dir: './folder_metas/jpg',
        out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
        page: 1,
        scale: 2048,
    };
    pdfConverter
        .convert(pdfPath, option)
        .then(() => {
            console.log('file converted');
        })
        .catch((err) => {
            console.log('an error has occurred in the pdf converter ' + err);
        });
}

fs.createReadStream(path.join(__dirname, 'folder_metas/rep.csv'))
    .pipe(
        csv({
            separator: ',',
        })
    )
    .on('data', (data) => {
        list_rep.push(data);
    })
    .on('error', (error) => {
        console.log(error);
    })
    .on('end', () => {
        let param = process.argv[2] ?? 'g';
        let index = process.argv[3] ?? 0;
        report.dataset = list_rep.slice(index);

        if (index === 'g' || param === 'g') {
            setTimeout(() => {
                let pdf = jasper.pdf(report);
                pathpdf = `./folder_metas/rep${index}-${list_rep.length}.pdf`;
                console.log('pdf gerado: ' + pdf.length);
                fs.writeFileSync(
                    path.join(__dirname, `folder_metas/pdf/rep${parseInt(index) + 1}-${list_rep.length}.pdf`),
                    Buffer.from(pdf)
                );
            }, 1000);
        }

        if (index === 's' || param === 's') {
            setTimeout(() => {
                report['dataset'].forEach((representante) => {
                    report['dataset'] = representante;
                    let pdf = jasper.pdf(report);
                    console.log('pdf gerado: ' + pdf.length);
                    fs.writeFileSync(
                        path.join(__dirname, `folder_metas/pdf/${representante['razao_social'].slice(0, 14)}.pdf`),
                        Buffer.from(pdf)
                    );
                    convertImage(`./folder_metas/pdf/${representante['razao_social'].slice(0, 14)}.pdf`);
                });
            }, 1000);
        }
    });
