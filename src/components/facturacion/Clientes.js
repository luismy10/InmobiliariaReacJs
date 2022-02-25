import React from 'react';

class Clientes extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                {/* Inicio modal nuevo cliente*/}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Agregar nuevo cliente</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='row py-1'>
                                    <div className='col-lg-4 colmd-4 col-sm-12 col-xs-12'>
                                        <label >Nombre (s)</label>
                                    </div>
                                    <div className='col-lg-8 colmd-8 col-sm-12 col-xs-12'>
                                        <input  class="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className='row py-1'>
                                    <div className='col-lg-4 colmd-4 col-sm-12 col-xs-12'>
                                        <label >apellidos (s)</label>
                                    </div>
                                    <div className='col-lg-8 colmd-8 col-sm-12 col-xs-12'>
                                        <input  class="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className='row py-1'>
                                    <div className='col-lg-4 colmd-4 col-sm-12 col-xs-12'>
                                        <label >apellidos (s)</label>
                                    </div>
                                    <div className='col-lg-8 colmd-8 col-sm-12 col-xs-12'>
                                        <input  class="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className='row py-1'>
                                    <div className='col-lg-4 colmd-4 col-sm-12 col-xs-12'>
                                        <label >Dni/Ruc(s)</label>
                                    </div>
                                    <div className='col-lg-8 colmd-8 col-sm-12 col-xs-12'>
                                        <input  class="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className='row py-1'>
                                    <div className='col-lg-4 colmd-4 col-sm-12 col-xs-12'>
                                        <label >Telefono (s)</label>
                                    </div>
                                    <div className='col-lg-8 colmd-8 col-sm-12 col-xs-12'>
                                        <input  class="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                                <div className='row py-1'>
                                    <div className='col-lg-4 colmd-4 col-sm-12 col-xs-12'>
                                        <label >Observacion (s)</label>
                                    </div>
                                    <div className='col-lg-8 colmd-8 col-sm-12 col-xs-12'>
                                        <input  class="form-control" aria-describedby="emailHelp"/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* fin modal nuevo cliente*/}

                <div className='row pb-3'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <section className="content-header">
                            <h5 className="no-margin"> Clientes <small style={{ color: 'gray' }}> Lista </small> </h5>
                        </section>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <label>Nuevo Cliente/Socio</label>
                        <div className="form-group">
                            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                                <i className="bi bi-plus-lg"></i> Agregar Cliente
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <label>Opción.</label>
                        <div className="form-group">
                            <button className="btn btn-light">
                                <i className="bi bi-arrow-repeat"></i> Recargar
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <label>Filtrar por dni, apellidos y nombres.</label>
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Ingrese para buscar" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button">Button</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="table-responsive">
                            <table className="table table-striped" style={{ borderWidth: '1px', borderStyle: 'inset', borderColor: '#CFA7C9' }}>
                                <thead>
                                    <tr>
                                        <th width="5%" className="text-center">#</th>
                                        <th width="20%">Nombre</th>
                                        <th width="20%">Apellido</th>
                                        <th width="15%">Dni / Ruc</th>
                                        <th width="10%">Telefono</th>
                                        <th width="12%">Observacion</th>
                                        <th width="15%" colSpan="2">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>

                            </table>
                        </div>
                        <div className="col-md-12" style={{ textAlign: 'center' }}>
                            <nav aria-label="...">
                                <ul className="pagination justify-content-end">
                                    <li className="page-item disabled">
                                        <a className="page-link">Previous</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item active" aria-current="page">
                                        <a className="page-link" href="#">2</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
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