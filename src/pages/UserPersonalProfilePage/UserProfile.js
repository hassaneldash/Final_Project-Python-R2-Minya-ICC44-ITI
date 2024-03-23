import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import UserSidebar from '../../components/UserProfileComponents/UserSidebar'
import AccountSettings from '../../components/UserProfileComponents/AccountSettings'
import './UserProfile.css'
import ChangePassword from '../../components/UserProfileComponents/ChangePassword'
import YourOrders from '../../components/UserProfileComponents/YourOrders'
import UserAddress from '../../components/UserProfileComponents/UserAddress'
import LegalNotice from '../../components/UserProfileComponents/LegalNotice'

const UserProfile = () => {

    const {activepage} = useParams()

    


  
    // alert(activepage)
  return (
    <div className='userprofile'>
 

         <div className='userprofilein'>
            <div className='left'>
              <UserSidebar activepage={activepage}/>
            </div>
            <div className='right'>
              {activepage === 'accountsettings' && <AccountSettings/>}
              {activepage === 'changepassword' && <ChangePassword/>}
              {activepage === 'yourorders' && <YourOrders/>}
              {activepage === 'address' && <UserAddress/>}
              {activepage === 'legalnotice' && <LegalNotice/>}
            </div>
         </div>
  </div>
  )
}

export default UserProfile