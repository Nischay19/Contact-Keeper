import React, {useContext, Fragment} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';





const Contacts = () => {
  const contactContext = useContext(ContactContext);                                              //we need to initialise context here so we can now get any state /// actions /// methodsin the context in this conponent   ..we have only one state that is contacts

  const { contacts , filtered } = contactContext;  //destructuring 

  if(contacts.length === 0){
    return <h4>Please Add a Contact</h4>
  }

  return (
    <Fragment>
      <TransitionGroup>
      {filtered !== null                                             //checking of their is anything in filtered 

        ? filtered.map(contact =>                                                       //if their is in filtered               //we need t auto pass a key as a prop in it  , in the CONTACTITEM component
          ( <CSSTransition key={contact.id} timeout={500} classNames="item">                                         
              <ContactItem contact={contact}/> 
            </CSSTransition> ) ) 

        : contacts.map(contact =>                                                              //else, filtered is empty
          ( <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem  contact={contact}/>
            </CSSTransition> )  )       
      }
      </TransitionGroup> 
    </Fragment>
  );
};

export default Contacts;