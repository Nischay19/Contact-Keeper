import React, { useReducer }from 'react';
import {v4 as uuid} from 'uuid';                          //this is for id generation, a module , check notion for extra info
import ContactContext from './contactContext';
import contactReducer from './contactReducer'; //till now it is boiler plate code



import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';


const ContactState = props => {          //this is our initial state
  const initialState = {                           //set the initial state to an object.. and that will be our contacts. now inityially it will be empty and they will get fikled by the contacts in our database and so rn we are just hardcoding it here.
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-1111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'harry@gmail.com',
        phone: '333-333-333',
        type: 'professional'
      }
    ],
    current: null            //when i click edit the contact we want to edit will be put in this object in state and then we are able to change the contacts info
  };




      //pull out the state  and dispatch from our reducer from our useReducer hook
  const [state, dispatch] = useReducer(contactReducer, initialState);                       //so state allows to access anything in state and dispatch allows to dispatch objects to the reducer     //for usereducer hook this is syntax ----     const [state, dispatch]  =useReducer(reducer, initialState, init)









// mention all of the ACTIONS
  //add contact
  const addContact = (contact) =>{                          //contact comes in and we send it to our payload
     contact.id = uuid.v4;                                   //now we just want to give the conact a id so we use uuid and its method v4()
    dispatch({ type:ADD_CONTACT, payload: contact });                         //later we will have backend to send the data to here and send it by payload       //so we are dispatching to our reduucer that type is add_contact and payload will be new contact which is edited
  };

  //delete contact
  const deleteContact =( id ) => {
    dispatch({ type: DELETE_CONTACT, payload: id });           //so we get the id and send it payload / reducer straight away
  };

  //set current contact

  //cleaar current contact

  //update contact

  //filter contacts

  //clear filter




  return (                   //this is return our providerso that we can wrap the entire application with this provider
    <ContactContext.Provider
    value={{                                                //anything we wantto access from other components like state and actions need to go here
      contacts: state.contacts,                                          //we want contacts and that we get from state that we get from usereducer bought in and we have contacts
      addContact,
      deleteContact                                         //this is how we provide our methods to the all components
    }}>
      {props.children}
    </ContactContext.Provider>
  )
};


export default ContactState;