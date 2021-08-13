import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';





export default (state, action) => {            //boiler plate code      //we have a js switch to look at the types


  switch(action.type){
    case ADD_CONTACT:
      return{
        ...state,             //here below we are changing the state which has contacts and putting it equal to contact array whoch we defined in the ContactForm.js
        contacts: [ ...state.contacts, action.payload ]                    //we wanna just add the contact , we cant just change the contacts, state is immutable, we wanna copy what is their by spread operator, and then add data we sent in payload
      }; 
                                                             //this updates our state
    case UPDATE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.map( (contact) => 
          contact.id === action.payload.id ? action.payload : contact )          //so idf it matches ,because action.payload is the entire contact, and the we return the new updated contact which is in action.payload
      };
    case DELETE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)                     //state.contacts is the current array and we want to filter ,taht takes in a function that for each contact we call a contact and then we want to evaluvate if id is not equal to payload that is going to be returned
      };  
    case SET_CURRENT:
      return{
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return{
        ...state,
        current: null
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered : state.contacts.filter(contact => {             //filtered part of state that is null , we mak this to a filter of contacts .,,, so that for each contact ,and then we create a regular expression,                                                                                                       //filter is a high order array mtehod  similar to map and forEach,,,
          const regex = new RegExp(`${action.payload}`, 'gi');                                     //and that is going to be the text ,so we just want to match that text   and the text is coming in through the payload ,,so then in the parameter we put in the gi---   G-GLOBAL /// I - CASE INSENSITIVE ..  
          return contact.name.match(regex) || contact.email.match(regex);                                                     //so we are still in the filter so this contact.name is the individual contact , and then we are going to call the regex so that will return anything which matchs=es with the name and the regex,that is the text that is passed in///////////////  then we will also match the email with the text that is the regex
        })
      };
    case CLEAR_FILTER:
      return{
        ...state,
        filtered: null
      };

    default:
      return state;
  }
}