import React from 'react';
import axios from 'axios';
import {
    formatMoney,
    timeForma24,
    spinnerLoading,
    ModalAlertDialog,
    ModalAlertInfo,
    ModalAlertSuccess,
    ModalAlertWarning,
    ModalAlertError
} from '../tools/Tools';
import Paginacion from '../tools/Paginacion';

class Clientes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idCliente: '',

            loading: false,
            lista: [],

            opcion: 0,
            paginacion: 0,
            totalPaginacion: 0,
            filasPorPagina: 10,
            messageTable: 'Cargando información...',
            messagePaginacion: 'Mostranto 0 de 0 Páginas'
        }
        this.refTxtSearch = React.createRef();

        this.idCodigo = "";
        this.abortControllerTable = new AbortController();
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {
        this.loadInit();
    }

    componentWillUnmount() {
        this.abortControllerTable.abort();
    }

    loadInit = async () => {
        if (this.state.loading) return;

        await this.setStateAsync({ paginacion: 1 });
        this.fillTable(0, "");
        await this.setStateAsync({ opcion: 0 });
    }

    async searchText(text) {
        if (this.state.loading) return;

        if (text.trim().length === 0) return;

        await this.setStateAsync({ paginacion: 1 });
        this.fillTable(1, text.trim());
        await this.setStateAsync({ opcion: 1 });
    }

    paginacionContext = async (listid) => {
        await this.setStateAsync({ paginacion: listid });
        this.onEventPaginacion();
    }

    onEventPaginacion = () => {
        switch (this.state.opcion) {
            case 0:
                this.fillTable(0, "");
                break;
            case 1:
                this.fillTable(1, this.refTxtSearch.current.value);
                break;
            default: this.fillTable(0, "");
        }
    }

    fillTable = async (opcion, buscar) => {
        try {
            await this.setStateAsync({ loading: true, lista: [], messageTable: "Cargando información...", messagePaginacion: "Mostranto 0 de 0 Páginas" });

            const result = await axios.get('/api/cliente/list', {
                signal: this.abortControllerTable.signal,
                params: {
                    "opcion": opcion,
                    "buscar": buscar,
                    "posicionPagina": ((this.state.paginacion - 1) * this.state.filasPorPagina),
                    "filasPorPagina": this.state.filasPorPagina
                }
            });

            let totalPaginacion = parseInt(Math.ceil((parseFloat(result.data.total) / this.state.filasPorPagina)));
            let messagePaginacion = `Mostrando ${result.data.result.length} de ${totalPaginacion} Páginas`;

            await this.setStateAsync({
                loading: false,
                lista: result.data.result,
                totalPaginacion: totalPaginacion,
                messagePaginacion: messagePaginacion
            });
        } catch (error) {
            if (error.message !== "canceled") {
                await this.setStateAsync({
                    loading: false,
                    lista: [],
                    totalPaginacion: 0,
                    messageTable: "Se produjo un error interno, intente nuevamente por favor.",
                    messagePaginacion: "Mostranto 0 de 0 Páginas",
                });
            }
        }
    }

    onEventNuevoCliente() {
        this.props.history.push({
            pathname: `${this.props.location.pathname}/proceso`
        })
    }

    onEventEditarCliente(idCliente) {
        this.props.history.push({
            pathname: `${this.props.location.pathname}/proceso`,
            search: "?idCliente=" + idCliente
        })
    }

    onEventEliminarCliente(idCliente) {
        ModalAlertDialog("Eliminar cliente", "¿Está seguro de que desea eliminar el contacto? Esta operación no se puede deshacer.", async (value) => {
            if (value) {

            }
        })
    }

    render() {
        return (
            <>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <div className="form-group">
                            <h5>Clientes <small className="text-secondary">LISTA</small></h5>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="bi bi-search"></i></div>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar..."
                                    ref={this.refTxtSearch}
                                    onKeyUp={(event) => this.searchText(event.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <div className="form-group">
                                <button className="btn btn-outline-info" onClick={() => this.onEventNuevoCliente()}>
                                    <i className="bi bi-file-plus"></i> Nuevo Registro
                                </button>
                                {" "}
                                <button className="btn btn-outline-secondary" onClick={() => this.loadInit()}>
                                    <i className="bi bi-arrow-clockwise"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered rounded">
                                <thead>
                                    <tr>
                                        <th width="5%">#</th>
                                        <th width="20%">DNI / RUC</th>
                                        <th width="20%">Cliente</th>
                                        <th width="15%">Cel. / Tel.</th>
                                        <th width="10%">Dirección</th>
                                        <th width="12%">Estado</th>
                                        <th width="5%">Editar</th>
                                        <th width="5%">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.loading ? (

                                            <tr>
                                                <td className="text-center" colSpan="8">
                                                    {spinnerLoading()}
                                                </td>
                                            </tr>
                                        ) : this.state.lista.length === 0 ? (
                                            <tr className="text-center">
                                                <td colSpan="8">¡No hay datos registrados!</td>
                                            </tr>
                                        ) : (
                                            this.state.lista.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.id}</td>
                                                        <td>{item.documento}</td>
                                                        <td>{item.informacion}</td>
                                                        <td>{item.telefono}</td>
                                                        <td>{item.direccion}</td>
                                                        <td className="text-center">
                                                            <div className={`badge ${item.estado === 1 ? "badge-info" : "badge-danger"}`}>
                                                                {item.estado === 1 ? "ACTIVO" : "INACTIVO"}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-outline-warning btn-sm" title="Editar" onClick={() => this.onEventEditarCliente(item.idCliente)}><i className="bi bi-pencil"></i></button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-outline-danger btn-sm" title="Editar" onClick={() => this.onEventEliminarCliente(item.idCliente)}><i className="bi bi-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-5">
                        <div className="dataTables_info mt-2" role="status" aria-live="polite">{this.state.messagePaginacion}</div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                        <div className="dataTables_paginate paging_simple_numbers">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-end">
                                    <Paginacion
                                        loading={this.state.loading}
                                        totalPaginacion={this.state.totalPaginacion}
                                        paginacion={this.state.paginacion}
                                        fillTable={this.paginacionContext}
                                    />
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Clientes;