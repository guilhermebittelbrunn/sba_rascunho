require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function authenticator(req, res, next) {
    const teste = req.query;
    console.log(JSON.parse(teste));
    next();
}

app.get("/:id", authenticator, (req, res) => {
    res.send({ ok: true });
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
});
