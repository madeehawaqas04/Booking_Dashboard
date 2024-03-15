import { NavLink, Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SideBarContext } from '../context/sideBarContext';

const Sidebar = () => {
    var userName = "";
    var userImage = "";

    const { user } = useContext(AuthContext);
    const isOpen = useContext(SideBarContext);

   // console.log("isOpen", isOpen.isOpen);

    userName = user.userdetails.username;
    userImage = user.userdetails.img;
    //{`sidebar sidebar-offcanvas ${isOpen == true ? 'active' : ''}`}

    return (
        <>
            <nav className={`sidebar sidebar-offcanvas ${isOpen.isOpen === true ? 'active' : ''}`} id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <i className="icon-grid menu-icon" />
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                            <i className="icon-layout menu-icon" />
                            <Link to="/users" ><span className="menu-title">Users</span></Link>
                            <i className="menu-arrow" />
                        </div>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link className="nav-link" to="/users/new">Create Users</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                            <i className="icon-columns menu-icon" />
                            <Link to="/hotels" ><span className="menu-title">Hotels</span></Link>
                            <i className="menu-arrow" />
                        </div>
                        <div className="collapse" id="form-elements">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/hotels/new">Create Hotels</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                            <i className="icon-bar-graph menu-icon" />
                           <Link to="/rooms"> <span className="menu-title">Rooms</span></Link>
                            <i className="menu-arrow" />
                        </div>
                        <div className="collapse" id="charts">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item">
                            <Link className="nav-link" to="/rooms/new">Create Room</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link" data-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                            <i className="icon-grid-2 menu-icon" />
                            <span className="menu-title">Reports</span>
                            <i className="menu-arrow" />
                        </div>
                        <div className="collapse" id="tables">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link className="nav-link" >Hotels</Link></li>
                                <li className="nav-item"> <Link className="nav-link" >Rooms</Link></li>
                            </ul>
                        </div>
                    </li>
                   
                </ul>
            </nav>
        </>
        // 	<>
        //       {/* Main Sidebar Container */}
        // <aside className="main-sidebar sidebar-dark-primary elevation-4">
        //   {/* Brand Logo */}
        //   <a href="" className="brand-link">
        //     <img src={"/dist/img/AdminLTELogo.png"}  className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        //     <span className="brand-text font-weight-light">Admin</span>
        //   </a>
        //   {/* Sidebar */}
        //   <div className="sidebar">
        //     {/* Sidebar user panel (optional) */}
        //     <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        //       <div className="image">
        //         <img src={userImage} className="img-circle elevation-2" alt="User Image" />
        //       </div>
        //       <div className="info">
        //         <a href="#" className="d-block">{userName}</a>
        //       </div>
        //     </div>

        //     <nav className="mt-2">
        //       <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        //         {/* Add icons to the links using the .nav-icon class
        //          with font-awesome or any other icon font library */}
        //         <li className="nav-item menu-open">
        //           <NavLink to="/" className="nav-link active">
        //             <i className="nav-icon fas fa-tachometer-alt" />
        //             <p>
        //               Dashboard

        //             </p>
        //           </NavLink>
        //           <ul className="nav nav-treeview">

        //           </ul>
        //         </li>

        //         <li className="nav-item">
        //           <NavLink to="/products" className="nav-link">
        //             <i className="nav-icon fas fa-edit" />
        //             <p>
        //               Products
        //               <i className="fas fa-angle-left right" />
        //             </p>
        //           </NavLink>
        //           <ul className="nav nav-treeview">
        //             <li className="nav-item">
        //               <NavLink to="/newproduct" className="nav-link">
        //                 <i className="far fa-circle nav-icon" />
        //                 <p>Create Product</p>
        //               </NavLink>
        //             </li>

        //           </ul>
        //         </li>
        //         <li className="nav-item">
        //           <NavLink to="/users" className="nav-link">
        //             <i className="nav-icon fas fa-table" />
        //             <p>
        //               Users
        //               <i className="fas fa-angle-left right" />
        //             </p>
        //           </NavLink>
        //           <ul className="nav nav-treeview">
        //             <li className="nav-item">
        //               <NavLink to="/newUser" className="nav-link">
        //                 <i className="far fa-circle nav-icon" />
        //                 <p>Create User</p>
        //               </NavLink>
        //             </li>

        //           </ul>
        //         </li>
        //         {/* <li className="nav-header">EXAMPLES</li> */}
        //         <li className="nav-item">
        //           <NavLink to="/orders" className="nav-link">
        //             <i className="nav-icon far fa-calendar-alt" />
        //             <p>
        //               Orders
        //               {/* <span className="badge badge-info right">2</span> */}
        //             </p>
        //           </NavLink>
        //         </li>

        //         <li className="nav-item">
        //           <a href="" className="nav-link">
        //             <i className="nav-icon fas fa-columns" />
        //             <p>
        //               Reports
        //             </p>
        //           </a>
        //         </li>

        //       </ul>
        //     </nav>
        //     {/* /.sidebar-menu */}
        //   </div>
        //   {/* /.sidebar */}
        // </aside>


        // 		</>
    )
}

export default Sidebar

