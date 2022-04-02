import React from 'react';
import { Switch, Route, Redirect, } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from '../layouts/menu/Menu';
import Head from '../layouts/head/Head';
import Footer from '../layouts/footer/Footer';
import Dashboard from '../dashboard/Dashboard';
import Clientes from '../facturacion/Clientes';
import Ventas from '../facturacion/Ventas';
import Cobros from '../facturacion/Cobros';
import Creditos from '../facturacion/Creditos';
import Cotizaciones from '../facturacion/Cotizaciones';
import Reservas from '../facturacion/Reservas';
import Monedas from '../ajustes/Monedas';
import Comprobantes from '../ajustes/Comprobantes';
import Bancos from '../ajustes/Bancos';
import Sedes from '../ajustes/Sedes';
import Proyectos from '../ajustes/Proyectos';
import ProcesoProyecto from '../ajustes/proyecto/ProcesoProyecto';
import Manzanas from '../logistica/Manzanas';
import Lotes from '../logistica/Lotes';
import VentaProceso from '../facturacion/registros/VentaProceso';
import ClienteProceso from '../facturacion/registros/ClienteProceso'
import Perfiles from '../seguridad/Perfiles'
import Usuarios from '../seguridad/Usuarios'
import Accesos from '../seguridad/Accesos'

function Page404(props) {
    return (
        <div className="px-4 py-5 my-5 text-center">
            <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
            <h1 className="display-5 fw-bold">Error 404 página no encontrada</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">No se encuentra la página que ha solicitado.</p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button" onClick={() => props.history.goBack()} className="btn btn-outline-secondary btn-lg px-4"><i className="bi bi-arrow-left"></i> Regresar</button>
                </div>
            </div>
        </div>
    )
}

class Inicio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModal: false
        }
        this.menuRef = React.createRef();
    }

    setOpen = () => {
        this.setState({ isModal: !this.state.isModal }, () => {
            this.menuRef.current.handleToggleSidebar(this.state.isModal);
        });
    }

    setMinimun = () => {
        this.setState({ isModal: !this.state.isModal }, () => {
            this.menuRef.current.handleCollapsedSidebar(this.state.isModal);
        });
    }

    render() {
        if (this.props.token.userToken == null) {
            return <Redirect to="/login" />
        }

        const { path, url } = this.props.match;
        return (
            <div className='app'>
                <Menu ref={this.menuRef} url={url} />
                <main>
                    <Head setOpen={this.setOpen} setMinimun={this.setMinimun} />

                    <Switch>
                        <Route
                            path="/inicio"
                            exact={true}>
                            <Redirect to={`${path}/dashboard`} />
                        </Route>
                        <Route
                            path={`${path}/dashboard`}
                            render={(props) => <Dashboard {...props} />}
                        />
                        <Route
                            path={`${path}/perfiles`}
                            render={(props) => <Perfiles {...props} />}
                        />
                        <Route
                            path={`${path}/usuarios`}
                            render={(props) => <Usuarios {...props} />}
                        />
                        <Route
                            path={`${path}/accesos`}
                            render={(props) => <Accesos {...props} />}
                        />
                        <Route
                            path={`${path}/clientes`}
                            exact={true}
                            render={(props) => <Clientes {...props} />}
                        />
                        <Route
                            path={`${path}/clientes/proceso`}
                            exact={true}
                            render={(props) => <ClienteProceso {...props} />}
                        />
                        <Route
                            path={`${path}/ventas`}
                            exact={true}
                            render={(props) => <Ventas {...props} />}
                        />
                        <Route
                            path={`${path}/ventas/proceso`}
                            exact={true}
                            render={(props) => <VentaProceso {...props} />}
                        />
                        <Route
                            path={`${path}/cobros`}
                            render={(props) => <Cobros {...props} />}
                        />
                        <Route
                            path={`${path}/creditos`}
                            render={(props) => <Creditos {...props} />}
                        />
                        <Route
                            path={`${path}/cotizaciones`}
                            render={(props) => <Cotizaciones {...props} />}
                        />
                        <Route
                            path={`${path}/reservas`}
                            render={(props) => <Reservas {...props} />}
                        />
                        <Route
                            path={`${path}/monedas`}
                            render={(props) => <Monedas {...props} />}
                        />
                        <Route
                            path={`${path}/comprobantes`}
                            render={(props) => <Comprobantes {...props} />}
                        />
                        <Route
                            path={`${path}/bancos`}
                            render={(props) => <Bancos {...props} />}
                        />
                        <Route
                            path={`${path}/sedes`}
                            render={(props) => <Sedes {...props} />}
                        />
                        <Route
                            path={`${path}/proyecto`}
                            exact={true}
                            render={(props) => <Proyectos {...props} />}
                        />
                        <Route
                            path={`${path}/proyecto/proceso`}
                            exact={true}
                            render={(props) => <ProcesoProyecto {...props} />}
                        />
                        <Route
                            path={`${path}/manzanas`}
                            render={(props) => <Manzanas {...props} />}
                        />
                        <Route
                            path={`${path}/lotes`}
                            render={(props) => <Lotes {...props} />}
                        />
                        <Route component={Page404} />
                    </Switch>

                    <Footer />

                </main>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        token: state.reducer
    }
}

export default connect(mapStateToProps, null)(Inicio);
