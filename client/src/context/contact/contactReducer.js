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
    case DELETE_CONTACT:
      return{
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)                     //state.contacts is the current array and we want to filter ,taht takes in a function that for each contact we call a contact and then we want to evaluvate if id is not equal to payload that is going to be returned
      };

    default:
      return state;
  }
}