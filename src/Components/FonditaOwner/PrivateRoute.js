import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';



const PrivateRoute = ({ children, ...rest}) => {
    
    const authedUser = useSelector((state) => state.authedUser);
    

    return (
    
        <Route  {...rest} render={ ({location}) => (
            !isEmpty(authedUser) ? 
            children :
            <Redirect to={{
                pathname: '/sign-in',
                state: { from : location }
            }} />
        )} />
    )
} 

export default PrivateRoute;