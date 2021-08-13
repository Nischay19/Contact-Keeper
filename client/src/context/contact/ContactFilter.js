import React, {useContext, useRef, useEffect} from 'react'                          //useref hook , it is like refrences in react....   //it is a way to refrence a dom object .. alternative for forms ..    
import ContactContext from './contactContext';                                         //so instead of creating a input for our input of the filter, we are going to use s=useref







 const ContactFilter = () => {
  
  const contactContext =useContext(ContactContext);
  const {filterContacts,clearFilter, filtered } = contactContext;
  

  const text =useRef('');               // here we initialise the text with useref hook and defaut the value of it to be empty..
  
  useEffect(() => {
    if(filtered === null) {
      text.current.value = '';          //no we ca access the   text.current.value   because we have initialised it in the useref
    }
  });
  
  
  const onChange=(e) =>{
    if (text.current.value !== '') {                                      //------------text.current.value  -------------------so this can giveus the actual value of the input.........   we did ref={text } in the input form so we get it taken to text. that is initalised by useref hook
      filterContacts(e.target.value);                        //so the e.target.value is basically the input we did                          //then we run that filter contacts tmethod taht we have, which is part of contecxt
    } else{
      clearFilter();
    }
  }




  return (
    <form>
      <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange} />
      
    </form>
  )
}


export default ContactFilter;