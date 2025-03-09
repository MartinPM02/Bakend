"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePersonajeCtrl = exports.deletePersonajeCtrl = exports.getPersonajeCtrl = exports.getListaPersonajeCtrl = exports.createPersonajeCtrl = void 0;
const personaje_service_1 = require("../services/personaje.service");
const createPersonajeCtrl = async ({ body }, res) => {
    try {
        const response = await (0, personaje_service_1.createPersonajeSrv)(body);
        res.status(200).json({ msg: 200, data: response, success: true });
    }
    catch (error) {
        res.status(500).json({ error, success: false });
    }
};
exports.createPersonajeCtrl = createPersonajeCtrl;
const getListaPersonajeCtrl = async (req, res) => {
    try {
        const response = await (0, personaje_service_1.getListaPersonajeSrv)();
        res.status(200).json({ msg: "Ejecución correcta", data: response, success: true });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getListaPersonajeCtrl = getListaPersonajeCtrl;
const getPersonajeCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await (0, personaje_service_1.getPersonajeSrv)(Number(id));
        res.status(200).json({ msg: 200, data: response, success: true });
    }
    catch (error) {
        res.status(500).json({ error, success: false });
    }
};
exports.getPersonajeCtrl = getPersonajeCtrl;
const deletePersonajeCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await (0, personaje_service_1.deletePersonajeSrv)(parseInt(id));
        res.status(200).json({ msg: 200, data: response, success: true });
    }
    catch (error) {
        res.status(500).json({ error, success: false });
    }
};
exports.deletePersonajeCtrl = deletePersonajeCtrl;
const updatePersonajeCtrl = async ({ body }, res) => {
    try {
        const response = await (0, personaje_service_1.updatePersonajeSrv)(body);
        res.status(200).json({ msg: 200, data: response, success: true });
    }
    catch (error) {
        res.status(500).json({ error, success: false });
    }
};
exports.updatePersonajeCtrl = updatePersonajeCtrl;
