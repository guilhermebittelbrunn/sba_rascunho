"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.situacao = exports.turno = void 0;
var turno;
(function (turno) {
    turno[turno["matutino"] = 0] = "matutino";
    turno[turno["vespertino"] = 1] = "vespertino";
    turno[turno["noturno"] = 2] = "noturno";
})(turno || (exports.turno = turno = {}));
var situacao;
(function (situacao) {
    situacao[situacao["aprovado"] = 0] = "aprovado";
    situacao[situacao["reprovado"] = 1] = "reprovado";
})(situacao || (exports.situacao = situacao = {}));
