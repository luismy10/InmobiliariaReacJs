const express = require('express');
const router = express.Router();
const { decrypt } = require('../tools/CryptoJS');
const { generateExcelCliente, generateExcelDeudas } = require('../excel/FileClientes')
const Sede = require('../services/Sede');
const Cliente = require('../services/Cliente');
const RepCliente = require('../report/RepCliente');

const sede = new Sede();
const cliente = new Cliente();
const repCliente = new RepCliente();

router.get('/list', async function (req, res) {
    const result = await cliente.list(req)
    if (typeof result === 'object') {
        res.status(200).send(result);
    } else {
        res.status(500).send(result);
    }
});
 
router.post('/add', async function (req, res) {
    const result = await cliente.add(req)
    if (result === 'insert') {
        res.status(201).send("Se registró correctamente el cliente.");
    } else {
        res.status(500).send(result);
    }
});

router.get('/id', async function (req, res) {
    const result = await cliente.id(req)
    if (typeof result === 'object') {
        res.status(200).send(result);
    } else {
        res.status(500).send(result);
    }
});

router.post('/update', async function (req, res) {
    const result = await cliente.update(req)
    if (result === 'update') {
        res.status(201).send("Se actualizó correctamente el cliente.");
    } else {
        res.status(500).send(result);
    }
});

router.delete('/', async function (req, res) {
    const result = await cliente.delete(req)
    if (result === 'delete') {
        res.status(201).send("Se eliminó correctamente el cliente.");
    } else {
        res.status(500).send(result);
    }
});

router.get('/listcombo', async function (req, res) {
    const result = await cliente.listcombo(req)
    if (Array.isArray(result)) {
        res.status(200).send(result);
    } else {
        res.status(500).send(result);
    }
});

router.get('/listfiltrar', async function (req, res) {
    const result = await cliente.listsearch(req)
    if (Array.isArray(result)) {
        res.status(200).send(result);
    } else {
        res.status(500).send(result);
    }
});

router.get('/listventasasociadas', async function (req, res) {
    const result = await cliente.listventasasociadas(req);
    if(typeof result === 'object'){
        res.status(200).send(result);
    }else{
        res.status(500).send(result);
    }
});

router.get('/repcliente', async function (req, res) {
    const decryptedData = decrypt(req.query.params, 'key-report-inmobiliaria');
    req.query.idSede = decryptedData.idSede;
    req.query.fechaIni = decryptedData.fechaIni;
    req.query.fechaFin = decryptedData.fechaFin;
    req.query.idCliente = decryptedData.idCliente;
    req.query.cliente = decryptedData.cliente;

    const sedeInfo = await sede.infoSedeReporte(req);

    if (typeof sedeInfo !== 'object') {
        res.status(500).send(sedeInfo);
        return;
    }

    const detalle = await cliente.listapagos(req)

    if (Array.isArray(detalle)) {
        let data = await repCliente.repGeneral(req, sedeInfo, detalle);

        if (typeof data === 'string') {
            res.status(500).send(data);
        } else {
            res.setHeader('Content-disposition', `inline; filename=REPORTE DE APORTACIONES DE LOS CLIENTES.pdf`);
            res.contentType("application/pdf");
            res.send(data);
        }
    } else {
        res.status(500).send(detalle);
    }
});

router.get('/repclientehistorial', async function (req, res) {
    const decryptedData = decrypt(req.query.params, 'key-report-inmobiliaria');
    req.query.idSede = decryptedData.idSede;
    req.query.idCliente = decryptedData.idCliente;

    const sedeInfo = await sede.infoSedeReporte(req);

    if (typeof sedeInfo !== 'object') {
        res.status(500).send(sedeInfo);
        return;
    }

    const detalle = await cliente.listventasasociadas(req)

    if (typeof detalle === 'object') {
        let data = await repCliente.repHistorial(req, sedeInfo, detalle);

        if (typeof data === 'string') {
            res.status(500).send(data);
        } else {
            res.setHeader('Content-disposition', `inline; filename=HISTORIAL DEL CLIENTE.pdf`);
            res.contentType("application/pdf");
            res.send(data);
        }
    } else {
        res.status(500).send(detalle);
    }
});

router.get('/excelcliente', async function (req, res) {
    const decryptedData = decrypt(req.query.params, 'key-report-inmobiliaria');
    req.query.idSede = decryptedData.idSede;
    req.query.fechaIni = decryptedData.fechaIni;
    req.query.fechaFin = decryptedData.fechaFin;
    req.query.idCliente = decryptedData.idCliente;
    req.query.cliente = decryptedData.cliente;

    const sedeInfo = await sede.infoSedeReporte(req);

    if (typeof sedeInfo !== 'object') {
        res.status(500).send(sedeInfo);
        return;
    }

    const detalle = await cliente.listapagos(req)

    if (Array.isArray(detalle)) {
        
        if(req.query.idCliente == ''){
            const data = await generateExcelCliente(req, sedeInfo, detalle, 0);

            if (typeof data === 'string') {
                res.status(500).send(data);
            } else {
                res.end(data);
            }
        }else{
            console.log(detalle);
            const data = await generateExcelCliente(req, sedeInfo, detalle, 1);

            if (typeof data === 'string') {
                res.status(500).send(data);
            } else {
                res.end(data);
            }
        }
    } else {
        res.status(500).send(detalle);
    }
});

router.get('/repdeudas', async function (req, res) {
    const decryptedData = decrypt(req.query.params, 'key-report-inmobiliaria');
    req.query.idSede = decryptedData.idSede;
    req.query.frecuencia = decryptedData.frecuencia;

    const sedeInfo = await sede.infoSedeReporte(req);

    if (typeof sedeInfo !== 'object') {
        res.status(500).send(sedeInfo);
        return;
    }

    const detalle = await cliente.listadeudas(req)

    if (Array.isArray(detalle)) {
        let data = await repCliente.repDeudas(req, sedeInfo, detalle);

        if (typeof data === 'string') {
            res.status(500).send(data);
        } else {
            res.setHeader('Content-disposition', `inline; filename=LISTA DE DEUDAS.pdf`);
            res.contentType("application/pdf");
            res.send(data);
        }
    } else {
        res.status(500).send(detalle);
    }
});

router.get('/exceldeudas', async function (req, res) {
    const decryptedData = decrypt(req.query.params, 'key-report-inmobiliaria');
    req.query.idSede = decryptedData.idSede;
    req.query.frecuencia = decryptedData.frecuencia;

    const sedeInfo = await sede.infoSedeReporte(req);

    if (typeof sedeInfo !== 'object') {
        res.status(500).send(sedeInfo);
        return;
    }

    const detalle = await cliente.listadeudas(req)

    if (Array.isArray(detalle)) {
        const data = await generateExcelDeudas(req, sedeInfo, detalle);

        if (typeof data === 'string') {
            res.status(500).send(data);
        } else {
            res.end(data);
        }
    } else {
        res.status(500).send(detalle);
    }
});

module.exports = router;