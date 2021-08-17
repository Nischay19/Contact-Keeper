import React, { useReducer }from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';


const AuthState = props => {                          //this is our initial state
  const initialState = {                          
    token: localStorage.getItem('token'),
    isAuthenticated: null ,
    loading: true,
    error: null
  };




      //pull out the state  and dispatch from our reducer from our useReducer hook
  const [state, dispatch] = useReducer(authReducer, initialState);                       //so state allows to access anything in state and dispatch allows to dispatch objects to the reducer     //for usereducer hook this is syntax ----     const [state, dispatch]  =useReducer(reducer, initialState, init)





// mention all of the ACTIONS
  //load user                            takes care of whoch user is logged in and gets to hit that auth endpoint and get their data

  //register user                         //sign the user up and give a token back

  //login user                           //log user in and give token back

  //logout                               //destroy token ,logout

  //clear errors                          //clear errors out in every state







  return (                   //this is return our providerso that we can wrap the entire application with this provider
    <ContactContext.Provider
    value={{                                                                //anything we wantto access from other components like state and actions need to go here
      auth,
      
    }}>
      {props.children}
    </ContactContext.Provider>
  )
};

export default AuthState;