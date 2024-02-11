import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarOn, setSidebarOff } from '../../store/sidebarSlice';
import { getAllCategories } from '../../store/categorySlice';
import { getAllCarts, getCartItemsCount, getCartTotal } from '../../store/cartSlice';
import CartModal from "../CartModal/CartModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const itemsCount = useSelector(getCartItemsCount);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const isUserLoggedIn = sessionStorage.getItem("login") === null;

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchTerm.trim() !== '') {
  //     navigate(`/search/${searchTerm}`);
  //   }
  // }

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSearch(e);
  //   }
  // }
  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim() !== '') {
      navigate(`/search/${newSearchTerm}`);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  }

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("cart");
    navigate('/');
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [carts])

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
    if (isSidebarVisible) {
      dispatch(setSidebarOff());
    } else {
      dispatch(setSidebarOn());
    }
  }

  return (
    <nav className='navbar'>
      <div className='navbar-cnt flex align-center'>
        <div className='brand-and-toggler flex align-center'>
        <button type="button" className='sidebar-show-btn text-white' onClick={toggleSidebar}>
            <i className='fas fa-bars'></i>
          </button>
          <Link to = "/" className='navbar-brand flex align-center'>
            <span className='navbar-brand-ico'>
            <i class="fa-brands fa-shopify"></i>
            </span>
            <span className='navbar-brand-txt mx-2'>
              <span className='fw-7'>Easy</span>Trade.
            </span>
          </Link>
        </div>



        <div className='navbar-collapse w-100'>





          {/* <div className='navbar-search bg-white'>
            <form onSubmit={handleSearch}>
              <div className='flex align-center'>
                <input type="text" className='form-control fs-14' placeholder='Search items here' value={searchTerm}
                onChange={
                  handleSearch
                }
                  // (e) => setSearchTerm(e.target.value)} 
                  onKeyDown={handleKeyDown}/>
              <Link to={`search/${searchTerm}`} className='text-white search-btn flex align-center justify-center' >
                <i className='fa-solid fa-magnifying-glass'></i>
              </Link>
              </div>
            </form>
          </div> */}

          <div className='navbar-search bg-white'>
            <form>
              <div className='flex align-center'>
                <input
                  type="text"
                  className='form-control fs-14'
                  placeholder='Search your preferred items here'
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Link to={`search/${searchTerm}`} className='text-white search-btn flex align-center justify-center' disabled={searchTerm.trim() === ''}>
                  <i className='fa-solid fa-magnifying-glass'></i>
                </Link>
              </div>
            </form>
          </div>


          <ul className='navbar-nav flex align-center fs-12 fw-4 font-manrope'>
            {
              categories.slice(0, 11)
              // .sort(() => Math.random() - 0.5)
              .map((category, idx) => (
                <li className='nav-item no-wrap' key = {idx}>
                  <Link to = {`category/${category}`} className='nav-link text-capitalize'>{category.replace("-", " ")}</Link>
                </li>
              ))
            }
          </ul>
        </div>

        <div className='navbar-cart flex align-center'>
          <Link to = "/cart" className='cart-btn'>
            <i className='fa-solid fa-cart-shopping'></i>
            <div className='cart-items-value'>{itemsCount}</div>
            <CartModal carts = {carts} />
          </Link>
        </div>


        {isUserLoggedIn && (
          <div className='navbar-cart flex align-center'>
            <Link to="/userx" className='cart-btn'>
              <i className="fa-solid fa-user"></i>
            </Link>
          </div>
        )}


        {!isUserLoggedIn && (
          <div className='navbar-cart flex align-center'>
            <a href='#'onClick={handleLogout}> <i class="fa-solid fa-right-from-bracket"></i> </a>
          </div>
        )}

          <div className='navbar-cart flex align-center'>
            <Link to="/wishlist" className='cart-btn'>
            <i class="fa-solid fa-hand-holding-heart"></i>
            </Link>
          </div>


      </div>
    </nav>
  )
}

export default Navbar