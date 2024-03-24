import React, { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import UserSidebar from "../../components/UserProfileComponents/UserSidebar";
import AccountSettings from "../../components/UserProfileComponents/AccountSettings";
import "./UserProfile.css";
import ChangePassword from "../../components/UserProfileComponents/ChangePassword";
import YourOrders from "../../components/UserProfileComponents/YourOrders";
import UserAddress from "../../components/UserProfileComponents/UserAddress";
import LegalNotice from "../../components/UserProfileComponents/LegalNotice";

const UserProfile = () => {
  //Basic of profile Active page
  const { activepage } = useParams();

  /** Redirection */
  const navigate_login = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      const user = JSON.parse(localStorage.getItem("login"));
      redirectBasedOnRole(user.role);
    } else {
      navigate_login("/user");
    }
  }, []);

  const redirectBasedOnRole = (role) => {
    if (role === "seller") {
      navigate_login("/");
    }
  };
  /** End of Redirection */

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });

  /** Redirection */
  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      const user = JSON.parse(localStorage.getItem("login"));
      if (user.role === "seller") {
        navigate("/Dashboard");
      } else {
        // Set name and email from local storage
        setFormData((prevData) => ({
          ...prevData,
          name: user.name,
          email: user.email,
        }));
      }
    } else {
      navigate("/user");
    }
  });

  // alert(activepage)
  return (
    <div className="userprofile">
      <div className="userprofilein">
        <div className="left">
          <div className="card">
            <img
              height="250px"
              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
              alt="Person"
              class="card__image"
            />
            <h1 style={{ textAlign: "center", fontSize: "20px" }}>
              Welcome {formData.name}
            </h1>
          </div>
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === "accountsettings" && <AccountSettings />}
          {/* {activepage === 'changepassword' && <ChangePassword/>} */}
          {activepage === "yourorders" && <YourOrders />}
          {/* {activepage === 'address' && <UserAddress/>} */}
          {activepage === "legalnotice" && <LegalNotice />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
