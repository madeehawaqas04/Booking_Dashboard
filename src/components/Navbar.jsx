import { useState } from "react";
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SideBarContext } from "../context/sideBarContext";
import { DarkModeContext } from "../context/darkModeContext";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DarkModeIcon from '@mui/icons-material/DarkMode';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from "../redux/userRedux";

const Navbar = () => {
  // const isToggle = useContext(DarkModeContext);
  const { loading, error, dispatch } = useContext(AuthContext);
  const { dispatchSidebar } = useContext(SideBarContext);
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/login')
  }
  const [isOpen, setIsopen] = useState(false);
  const [isDark, setDark] = useState(false);


  const ToggleSidebar = () => {

    if (isOpen === true) {
      setIsopen(false)
      document.body.classList.remove('sidebar-icon-only');
      dispatchSidebar({ type: "Close" })
    }
    else {
      setIsopen(true);
      document.body.classList.add('sidebar-icon-only');
      dispatchSidebar({ type: "Open" })
    }
  }


  const ToggleDarkMode = () => {

    if (isDark === true) {
      // console.log("dispatchDarkMode", isToggle,isDark);
      document.body.classList.add('sidebar-light');
      document.body.classList.remove('sidebar-dark');
      // dispatchSidebar({ type: "LIGHT" })
      setDark(false);
    }
    else {
      //console.log("dispatchDarkMode", isToggle,isDark);
      document.body.classList.remove('sidebar-light');
      document.body.classList.add('sidebar-dark');
      // dispatchSidebar({ type: "DARK" })
      setDark(true);
    }
  }


  var userName = "";
  var userImage = "";
  const { user } = useContext(AuthContext);
  userName = user.userdetails.username;
  userImage = user.userdetails.img;
  console.log("user", user);
  return (
    <>

      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo mr-5" href="index.html"><img src="/images/logo.svg" className="mr-2" alt="logo" /></a>
          <a className="navbar-brand brand-logo-mini" href="index.html"><img src="/images/logo-mini.svg" alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <button onClick={ToggleSidebar}
            className="navbar-toggler navbar-toggler align-self-center"
            type="button" data-toggle="minimize">
            <span className="icon-menu" />
          </button>
          {/* <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div className="input-group-prepend hover-cursor" id="navbar-search-icon">
                  <span className="input-group-text" id="search">
                    <i className="icon-search" />
                  </span>
                </div>
                <input type="text" className="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
              </div>
            </li>
          </ul> */}
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-search d-none d-lg-block">
              {
                !isDark ?
                  <DarkModeOutlinedIcon
                    className="icon"
                    onClick={ToggleDarkMode}
                  />
                  :
                  <DarkModeIcon
                    className="icon"
                    onClick={ToggleDarkMode}
                  />
              }

            </li>
            <li className="nav-item dropdown">
              <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                <i className="icon-bell mx-0" />
                <span className="count" />
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="ti-info-alt mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">Application Error</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Just now
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="ti-settings mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">Settings</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      Private message
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="ti-user mx-0" />
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">New user registration</h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      2 days ago
                    </p>
                  </div>
                </a>
              </div>
            </li>
            <li className="nav-item nav-profile dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                {
                  userImage ?
                    <img src={userImage} alt="profile" /> : <img src="https://i.ibb.co/MBtjqXQ/no-avatar.gif" alt="profile"></img>
                }
                <span>{userName}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <a className="dropdown-item">
                  <i className="ti-settings text-primary" />
                  Settings
                </a>
                <a className="dropdown-item" onClick={onLogout}>
                  <i className="ti-power-off text-primary" />
                  Logout
                </a>
              </div>
            </li>
            {/* <li className="nav-item nav-settings d-none d-lg-flex">
              <a className="nav-link" href="#">
                <i className="icon-ellipsis" />
              </a>
            </li> */}
          </ul>
          <button onClick={ToggleSidebar} className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="icon-menu" />
          </button>
        </div>
      </nav>

    </>
  )
}

export default Navbar
