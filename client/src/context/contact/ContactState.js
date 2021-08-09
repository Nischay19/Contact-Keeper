import React, { useReducer }from 'react';
import uuid from 'uuid';                          //this is for id generation, a module , check notion for extra info
import contactContext from './contactContext';
import contactReducer from './contactReducer'; //till now it is boiler plate code



import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
}   from '../types'             






export const ContactState = props =>{          //this is our initial state
  const initialState ={                           //set the initial state to an object.. and that will be our contacts. now inityially it will be empty and they will get fikled by the contacts in our database and so rn we are just hardcoding it here.
    contacts: [
      {
        id: 'jill hohn',
        email: 'jill@gmail.com',
        phone: '111111111',
        type: 'personal'
      },
      {
        id: 'sara hohn',
        email: 'sara@gmail.com',
        phone: '111173781',
        type: 'personal'
      },
      {
        id: 'harry white',
        email: 'harry@gmail.com',
        phone: '111880271',
        type: 'personal'
      }
    ]
  }



      //pull out the state  and dispatch from our reducer from our useReducer hook
  const [state, dispatch]  = useReducer(contactReducer, initialState);                       //so state allows to access anything in state and dispatch allows to dispatch objects to the reducer     //for usereducer hook this is syntax ----     const [state, dispatch]  =useReducer(reducer, initialState, init)



// mention all of the ACTIONS
  //add contact

  //delete contact

  //set current contact

  //cleaar current contact

  //update contact

  //filter contacts

  //clear filter




  return (                   //this is return our providerso that we can wrap the entire application with this provider
    <contactContext.Provider
    value={{                                                //anything we wantto access from other components like state and actions need to go here
      contacts: state.contacts                                          //we want contacts and that we get from state that we get from usereducer bought in and we have contacts
    }}>
      {props.children}
    </contactContext.Provider>
  )
};


