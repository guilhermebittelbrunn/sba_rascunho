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
