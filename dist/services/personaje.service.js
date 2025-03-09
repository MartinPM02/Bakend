"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePersonajeSrv = exports.deletePersonajeSrv = exports.getPersonajeSrv = exports.getListaPersonajeSrv = exports.createPersonajeSrv = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPersonajeSrv = async ({ id, foto, nombre }) => {
    if (!nombre) {
        return { error: "Es requerido" };
    }
    const response = await prisma.personaje.create({
        data: {
            nombre,
            foto
        }
    });
    return response;
};
exports.createPersonajeSrv = createPersonajeSrv;
const getListaPersonajeSrv = async () => {
    const response = await prisma.personaje.findMany();
    return response;
};
exports.getListaPersonajeSrv = getListaPersonajeSrv;
const getPersonajeSrv = async (id) => {
    const response = await prisma.personaje.findFirst({
        where: {
            id
        }
    });
    if (!response) {
        return 405;
    }
    return response;
};
exports.getPersonajeSrv = getPersonajeSrv;
const deletePersonajeSrv = async (id) => {
    //Hard delete
    const response = await prisma.personaje.delete({
        where: {
            id
        }
    });
    //soft delete
    // const response = await prisma.personaje.update({
    //   where: {
    //     id
    //   },
    //   data: {
    //     flag: false
    //   }
    // });
    return response;
};
exports.deletePersonajeSrv = deletePersonajeSrv;
const updatePersonajeSrv = async ({ id, nombre, foto }) => {
    if (!nombre) {
        return { error: "Es requerido" };
    }
    const response = await prisma.personaje.update({
        where: {
            id
        },
        data: {
            nombre, foto
        }
    });
    return response;
};
exports.updatePersonajeSrv = updatePersonajeSrv;
