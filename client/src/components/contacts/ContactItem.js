import React, { useContext } from 'react'

import ContactContext from '../../context/contact/contactContext';
import PropTypes from 'prop-types';



const ContactItem = ({ contact }) => {
  const contactContext =useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;                            //pull out the method




  const {id, name ,email, phone, type} =contact;                  //destructured
  
  const onDelete =() =>{
    deleteContact(id);                                           //we have pulled the id out of contact and destructured it
    clearCurrent();
  }

 



  
  return (
    <div className='card bg-light'>
      <h3 className=" text-primary text-left">
        {name}{' '}<span style={{ float : 'right' }} className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }>  {type.charAt(0).toUpperCase() + type.slice(1)}  </span>
      </h3>   
      <ul className="list">
        {/* if their is a email then display this li list  */}
        {email && (<li>                                                           
          <i className="fas fa-envelope-open"></i> {email}
        </li>)}
        {phone && (<li>                                                           
          <i className="fas fa-phone"></i> {phone}
        </li>)}
      </ul>   
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>Edit</button>    
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};









ContactItem.propTypes ={
  contact: PropTypes.object.isRequired
}

export default ContactItem;
