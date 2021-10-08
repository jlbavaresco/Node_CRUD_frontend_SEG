import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom';

import AutenticacaoContext from './AutenticacaoContext';

const PrivateRoute = ({ component: Component, ...otherProps }) => {

    const { pegaAutenticacao } = useContext(AutenticacaoContext)

    return (
        <Route {...otherProps} render={
            props => pegaAutenticacao() ?
                (<Component {...props} />) : (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
        } />
    )
}

export default PrivateRoute