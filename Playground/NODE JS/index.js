require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4444;

function authenticator(req, res, next) {
    const teste = req.params;
    console.log(teste);
    next();
}

app.get("/:id", authenticator, (req, res) => {
    console.log(2);
    res.send({ ok: true });
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
});
