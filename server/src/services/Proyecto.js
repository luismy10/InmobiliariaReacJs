const Conexion = require('../database/Conexion');
const { currentDate, currentTime } = require('../tools/Tools');
const conec = new Conexion();


class Proyecto {

    async list(req) {
        try {
            let lista = await conec.query(`SELECT  
            p.idProyecto,
            p.nombre,
            p.ubicacion,
            p.area,
            p.idMoneda,
            p.preciometro,
            m.simbolo,
            p.estado
            FROM proyecto AS p INNER JOIN moneda AS m
            ON m.idMoneda = p.idMoneda 
            WHERE 
            ? = 0
            OR
            ? = 1 AND p.nombre LIKE concat(?,'%')
            LIMIT ?,?`, [
                parseInt(req.query.opcion),

                parseInt(req.query.opcion),
                req.query.buscar,

                parseInt(req.query.posicionPagina),
                parseInt(req.query.filasPorPagina)
            ])

            let resultLista = lista.map(function (item, index) {
                return {
                    ...item,
                    id: (index + 1) + parseInt(req.query.posicionPagina)
                }
            });

            let total = await conec.query(`SELECT COUNT(*) AS Total 
            FROM proyecto AS p INNER JOIN moneda AS m
            ON m.idMoneda = p.idMoneda 
            WHERE 
            ? = 0
            OR
            ? = 1 AND p.nombre LIKE concat(?,'%')`, [
                parseInt(req.query.opcion),

                parseInt(req.query.opcion),
                req.query.buscar,

            ]);

            return { "result": resultLista, "total": total[0].Total };
        } catch (error) {
            return "Se produjo un error de servidor, intente nuevamente.";
        }
    }

    async add(req) {
        let connection = null;
        try {
            connection = await conec.beginTransaction();

            let result = await conec.execute(connection, 'SELECT idProyecto FROM proyecto');
            let idProyecto = "";
            if (result.length != 0) {

                let quitarValor = result.map(function (item) {
                    return parseInt(item.idProyecto.replace("PR", ''));
                });

                let valorActual = Math.max(...quitarValor);
                let incremental = valorActual + 1;
                let codigoGenerado = "";
                if (incremental <= 9) {
                    codigoGenerado = 'PR000' + incremental;
                } else if (incremental >= 10 && incremental <= 99) {
                    codigoGenerado = 'PR00' + incremental;
                } else if (incremental >= 100 && incremental <= 999) {
                    codigoGenerado = 'PR0' + incremental;
                } else {
                    codigoGenerado = 'PR' + incremental;
                }

                idProyecto = codigoGenerado;
            } else {
                idProyecto = "PR0001";
            }

            await conec.execute(connection, `INSERT INTO proyecto (
                idProyecto,
                nombre, 
                idSede, 
                area,
                estado, 
                ubicacion,
                idUbigeo, 
                lnorte,
                leste, 
                lsur, 
                loeste, 
                idMoneda,
                tea, 
                preciometro, 
                costoxlote,
                numContratoCorrelativo, 
                numRecibocCorrelativo, 
                imagen,
                extension,
                fecha,
                hora,
                fupdate,
                hupdate,
                idUsuario) 
                values (?, ?,?,?,?, ?,?, ?,?,?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                idProyecto,
                //datos
                req.body.nombre,
                req.body.idSede,
                req.body.area,
                req.body.estado,
                //ubicacion
                req.body.ubicacion,
                req.body.idUbigeo,
                //limite
                req.body.lnorte,
                req.body.leste,
                req.body.lsur,
                req.body.loeste,
                //ajustes
                req.body.idMoneda,
                req.body.tea,
                req.body.preciometro,
                req.body.costoxlote,
                req.body.numContratoCorrelativo,
                req.body.numRecibocCorrelativo,
                //imagen
                req.body.imagen,
                req.body.extension,
                currentDate(),
                currentTime(),
                currentDate(),
                currentTime(),
                req.body.idUsuario,
            ])

            await conec.commit(connection);
            return "insert";
        } catch (err) {
            if (connection != null) {
                await conec.rollback(connection);
            }
            return "Se produjo un error de servidor, intente nuevamente.";
        }
    }

    async id(req) {
        try {
            let result = await conec.query(`SELECT 
            p.idProyecto,
            p.nombre,
            p.idSede,
            p.area,
            p.estado,
            p.ubicacion,

            p.idUbigeo,
            u.ubigeo,
            u.departamento,
            u.provincia,
            u.distrito,

            p.lnorte,
            p.leste,
            p.lsur,
            p.loeste,
            p.idMoneda,
            p.tea,
            p.preciometro,
            p.costoxlote,
            p.numContratoCorrelativo,
            p.numRecibocCorrelativo,
            p.imagen,
            p.extension
            FROM proyecto AS p
            INNER JOIN ubigeo AS u ON u.idUbigeo = p.idUbigeo
            WHERE p.idProyecto = ?`, [
                req.query.idProyecto,
            ]);

            if (result.length > 0) {
                return result[0];
            } else {
                return "Datos no encontrados";
            }
        } catch (error) {
            return "Error interno de conexión, intente nuevamente.";
        }
    }

    async edit(req) {
        let connection = null;
        try {
            connection = await conec.beginTransaction();

            await conec.execute(connection, `UPDATE proyecto SET
                nombre=?, 
                idSede=?,
                area=?,
                estado=?, 
                ubicacion=?,
                idUbigeo=?, 
                lnorte=?, 
                leste=?,
                lsur=?,
                loeste=?, 
                idMoneda=?,
                tea=?, 
                preciometro=?,
                costoxlote=?, 
                numContratoCorrelativo=?, 
                numRecibocCorrelativo=?,
                imagen=?,
                extension=?,
                fupdate=?,
                hupdate=?,
                idUsuario=?
                WHERE idProyecto=?`, [
                //datos
                req.body.nombre,
                req.body.idSede,
                req.body.area,
                req.body.estado,
                //ubicacion
                req.body.ubicacion,
                req.body.idUbigeo,
                //limite
                req.body.lnorte,
                req.body.leste,
                req.body.lsur,
                req.body.loeste,
                //ajustes
                req.body.idMoneda,
                req.body.tea,
                req.body.preciometro,
                req.body.costoxlote,
                req.body.numContratoCorrelativo,
                req.body.numRecibocCorrelativo,
                //imagen
                req.body.imagen,
                req.body.extension,
                currentDate(),
                currentTime(),
                req.body.idUsuario,
                req.body.idProyecto
            ])

            await conec.commit(connection)
            return 'update';
        } catch (error) {
            if (connection != null) {
                await conec.rollback(connection);
            }
            return "Se produjo un error de servidor, intente nuevamente.";
        }
    }

    async delete(req) {
        let connection = null;
        try {
            connection = await conec.beginTransaction();

            let manzana = await conec.execute(connection, `SELECT * FROM manzana WHERE idProyecto = ?`, [
                req.query.idProyecto
            ]);

            if (manzana.length > 0) {
                await conec.rollback(connection);
                return 'No se puede eliminar el proyecto ya que esta ligada a una manzana.';
            }

            await conec.execute(connection, `DELETE FROM proyecto WHERE idProyecto = ?`, [
                req.query.idProyecto
            ]);

            await conec.commit(connection);
            return "delete";
        } catch (error) {
            if (connection != null) {
                await conec.rollback(connection);
            }
            return "Se produjo un error de servidor, intente nuevamente.";
        }
    }

    async inicio(req) {
        try {
            let result = await conec.query(`SELECT 
            p.idProyecto,
            p.nombre,
            p.ubicacion,
            p.area,
            m.codiso,
            m.nombre as moneda,
            m.simbolo,
            p.imagen,
            p.extension,
            p.estado
            FROM proyecto AS p
            INNER JOIN moneda AS m ON m.idMoneda = p.idMoneda
            `);

            let proyectos = await Promise.all(result.map(async (proyecto) => {
                let lotes = await conec.query(`SELECT estado FROM 
                lote AS l INNER JOIN manzana AS m
                ON l.idManzana = m.idManzana
                WHERE m.idProyecto = ?`, [
                    proyecto.idProyecto
                ]);
                return await {
                    ...proyecto,
                    lotes
                }
            }))

            return proyectos;
        } catch (error) {
            return "Se produjo un error de servidor, intente nuevamente.";
        }
    }

}

module.exports = Proyecto;