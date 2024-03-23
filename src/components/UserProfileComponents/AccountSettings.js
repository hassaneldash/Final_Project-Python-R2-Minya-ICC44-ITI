import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AccountSettings = () => {


/**---------- Start get Products with id ----------**/
const [user, setUser] = useState({});
const { id } = useParams();


useEffect(() => {
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/user/${id}/`
      );
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  getUser();
}, [id]);

/** End get Products with id  **/


  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'>Personal Information</h1>

      <div className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Your Name <span>*</span></label>
          <input type='text' name='name' id='name' />
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Phone/Mobile <span>*</span></label>
          <input type='text' name='phone' id='phone'

          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email <span>*</span></label>
          <input type='email' name='email' id='email'

          />
        </div>

      
      </div>

      <button className='mainbutton1'
        
        >Save Changes</button>
    </div>
  )
}

export default AccountSettings