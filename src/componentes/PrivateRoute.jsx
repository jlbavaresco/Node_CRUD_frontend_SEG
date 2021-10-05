import React from 'react'
import { Redirect, Route } from 'react-router-dom';

import pegaAutenticacao from './Autenticacao';

const PrivateRoute = ({ component: Component, ...rest})=> (
    <Route {...rest} render={
        props=>pegaAutenticacao()?
        ( <Component {...props} />)   :   (<Redirect to={{ pathname:"/login",  state: { from : props.location} }}/> )
    }/>
);

export default PrivateRoute