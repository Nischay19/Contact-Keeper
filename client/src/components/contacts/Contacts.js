import React, {useContext, Fragment} from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';



const Contacts = () => {
  const contactContext = useContext(ContactContext);                                              //we need to initialise context here so we can now get any state /// actions /// methodsin the context in this conponent   ..we have only one state that is contacts

  const { contacts } = contactContext;  //destructuring 

  return (
    <Fragment>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact}/>              //we need t auto pass a key as a prop in it
      ))}
    </Fragment>
  );
};

export default Contacts;