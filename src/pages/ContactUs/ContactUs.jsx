import {useContext} from 'react'
import "./Contact.css"
import { ThemeContext } from '../../contexts/DarkModeContext'

function ContactUs() {

    const {darkMode} = useContext(ThemeContext);
  return (
    <div className={
      darkMode?
      'contact-container'
      :
      'contact-container dark-contact-container'
    }>
        <div className={
          darkMode?
          'form-container'
          :
          'form-container dark-form-container'
        }>
            <h1>Contact Us</h1>
            <input type="text" placeholder='First Name'/>
            <input type="text" placeholder='Last Name'/>
            <input type="text" placeholder='Write your message here'/>
            <button>Submit</button>
        </div>
    </div>
  )
}

export default ContactUs
