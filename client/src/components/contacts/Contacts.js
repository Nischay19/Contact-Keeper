import React, {useContext, Fragment} from 'react';
import ContactContext from '../../context/contact/contactContext';



export const Contacts = () => {
  const contactContext = useContext(ContactContext);            //we need to initialise context here so we can now get any state /// actions /// methodsin the context in this conponent   ..we have only one state that is contacts
  
  const { contacts } = contactContext;                       //destructuring 
  
  return (
    <Fragment>
      {contacts.map(contact => (
      <h3>{contact.id}</h3>
      ))}
    </Fragment>
  );
};