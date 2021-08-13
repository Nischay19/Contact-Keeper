import React, {useState, useContext, useEffect } from 'react';                  //useeffect hook basically mimics the lifecycle method COMPONENTDIDMOUNT
import ContactContext from '../../context/contact/contactContext';






 const ContactForm = () => {

  const contactContext = useContext(ContactContext);                    //now we use context to change the state so initialize it          //now we have access to any method or state


  const  { addContact, clearCurrent, updateContact, current } =contactContext;




  useEffect(()=> {                      //so we are mounting the contact which is stored in the current in the contact details
    if(current !== null){
      setContact(current);             //so current will be sent to the setcontact method which has the whole contact array which of which we clicked the edit button. 
    } else{
      setContact({                     //so else we just set it to nothung
        name:'',
        email: '',
        phone: '',
        type: 'personal'         
      });
    }
  } , [contactContext , current])               //we only want this to happen on certain occasions   ,,so if current value/ contactContext is changed then we want the USEEFFECT to start




  const [contact, setContact] =useState({                                     //this is a form so we do need a component level state for each field of form// instead of putting each field to states we will use one state called contact that wil be object with all the fields
    name:'',
    email: '',
    phone: '',
    type: 'personal'          //default is personal
  });

  const { name, email, phone, type } = contact;       //pulling out the values, destructuring
  



  const onChange =(e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });    //we use the spread operator with the contact to get whatever is in the currnt state and then we target the particular field in the contact object  ,, so we do that by getting the name attribute and that gets it..  and what to change is we get by the value attribute
  };
  
  const onSubmit=(e) => {
    e.preventDefault();
    if(current === null){                             //if nothing in current
      addContact(contact);
    } else{
      updateContact(contact);                     //so we are just going to add the contact which ever is in the form  //which is the state ,and whenerver we change it gets submitted in the update
    }
    setContact({
      name:'',
      email: '',
      phone: '',
      type: 'personal'
    });
    console.log(contact);
  };

  const clearAll =() => {
      clearCurrent();
  };







  return (
    <form onSubmit= {onSubmit}>
      
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add contact'}</h2>
      <input type="text" placeholder="Name" name="name" value={name}                  //value is going to be the name state 
        onChange= {onChange}/>    
      <input type="email" placeholder="Email" name="email" value={email}                  //value is going to be the name state 
        onChange= {onChange}/>   
      <input type="phone" placeholder="Phone" name="phone" value={phone}                  //value is going to be the name state 
        onChange= {onChange}/>         
      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal"                     //checked value is also their,if current value is personal then personal should be checked otherwise proffesional checked
        checked= {type==='personal'} onChange= {onChange}/>{' '}Personal{' '}
      <input type="radio" name="type" value="professional"                 //checked value is also their,if current value is personal then personal should be checked otherwise proffesional checked
        checked ={type==='professional'} onChange= {onChange}/>{' '}Professional{' '}
      <div>
        <input type="submit" value={current ? 'Update Contact' : 'Add contact'} className="btn btn-primary btn-block" />
      </div>

      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            clear
          </button>
        </div>
      )}
    
    </form>
  )
}
export default ContactForm;