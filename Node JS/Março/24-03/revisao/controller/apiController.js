module.exports = {
    true: (req, res) => {
        res.send({ ok: true });
    },
    false: (req, res) => {
        res.send({ ok: false });
    },
};
