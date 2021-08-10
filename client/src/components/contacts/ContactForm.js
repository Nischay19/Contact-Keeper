import React, {useState, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';




 const ContactForm = () => {

  const contactContext = useContext(ContactContext);                    //now we use context to change the state so initialize it          //now we have access to any method or state




  const [contact, setContact] =useState({                                     //this is a form so we do need a component level state for each field of form// instead of putting each field to states we will use one state called contact that wil be object with all the fields
    name:'',
    email: '',
    phone: '',
    type: 'personal'          //default is personal
  });

  const { name, email, phone, type } = contact;       //pulling out the values, destructuring
  

  const onChange =(e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });    //we use the spread operator with the contact to get whatever is in the currnt state and then we target the particular field in the contact object  ,, so we do that by getting the name attribute and that gets it..  and what to change is we get by the value attribute
  }

  const onSubmit=(e) => {
    e.preventDefault();
    contactContext.addContact(contact);
    setContact({
      name:'',
      email: '',
      phone: '',
      type: 'personal'
    });
    console.log(contact);

    
  };



  return (
    <form onSubmit= {onSubmit}>
      
      <h2 className="text-primary">Add Contact</h2>
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
        <input type="submit" value="Add Contact" className="btn btn-primary btn-block" />
      </div>
    
    </form>
  )
}
export default ContactForm;