import { userRequest } from "../../src/requestMethods";
import React, { useEffect, useState, useMemo } from 'react'
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Chart from "../../src/components/chart/Chart";
import { logout } from "../redux/userRedux";


import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../src/firebase";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isloading, setIsloading] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const accessToken = useSelector((state) => state.user.currentUser.accessToken);
  console.log("user.currentUser", user.currentUser.email + accessToken);


  useEffect(() => {
    getUser();
  }, []);


  const showError = (error) => {
    console.log(error);
    if (error.response && error.response.data === 'Token is not valid!') {
      console.log("logout");
      dispatch(logout())
      navigate('/login')
    
    }
  }

  const getUser = async () => {
    try {
      const res = await userRequest(accessToken).get(`/users/find/${userId}`);
      console.log(res.data);
      const user = res.data;
      setInputs({ ...user })
      setImage(user.img);

    } catch (error) {
      
      console.log("getUser");
      showError(error);
    }
  };



  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });

  };
console.log("input",inputs);
  const handleClick = (e) => {
    e.preventDefault();
    try {

      const { name, email, address, phone, isAdmin } = inputs;

      console.log(inputs);
      console.log(file);
      console.log(isAdmin);
      if (!name || !email || !address || !phone) {
        toast.error("Please fill all fields", { position: "top-center" });
      }
      else {
        setIsloading(true);
        if (file != null) {
          const fileName = new Date().getTime() + file.name;
          const storage = getStorage(app);
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
              }
            },
            (error) => {
              // Handle unsuccessful uploads
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const user = { ...inputs, img: downloadURL };
                //updateuser(userId, user, dispatch);
                updateUser(user);
                //  toast.success("user updated successfully", { position: "top-right" });

                //navigate("/users")
              });
            }
          );
        }
        else {
          const user = { ...inputs, img: image };
          updateUser(user);
          // toast.success("user updated successfully", { position: "top-right" });

        }
      }
    } catch (error) {
      setIsloading(false);
      toast.error(error, { position: "top-center" });
      console.log(error);
      console.log("handle click");
      // showError(error);
    }
  };

  const updateUser = async (user) => {
    try {
      const res = await userRequest(accessToken).put(`/users/${userId}`, user);
      console.log(res.data);
      // setTimeout(function () {
      //   toast.success("User updated successfully", { position: "top-right" });
      // }, 2000);
      navigate("/users")
    } catch (error) {
      setIsloading(false);
      console.log("update");
      showError(error);
    }
  };




  return (
    <>

<div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">

              </div> </div>
            <Footer />
          </div>
        </div>
      </div>


      <Navbar />
      <Sidebar />
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">users</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <NavLink to='/users'>
                    <button type="submit" id="btnSubmit"
                      className="btn btn-primary float-right">
                      <i class="fas fa-arrow-left"></i> Back</button>
                  </NavLink>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">

              <div className="col-md-12">

                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Update User</h3>

                  </div>

                  <div className="card-body">
                    <div className="row">

                      <div className="col-md-6 pl-3">

                        <div className="form-group">
                          <label> Full Name <code className="text-danger">*</code></label>
                          <input type="text" class="form-control"
                            name="name" value={inputs.name}
                            onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label>Phone <code className="text-danger">*</code></label>
                          <input name="phone" value={inputs.phone}
                            type="number" className="form-control"
                            onChange={handleChange} />
                        </div>
                        <div className="form-group">
                          <label >Address <code className="text-danger">*</code></label>
                          <textarea class="form-control" type="text" value={inputs.address}
                            name="address" rows="4" placeholder="description..."
                            onChange={handleChange} ></textarea>

                        </div>
                      </div>

                      <div className="col-md-6 pl-3">

                        <div className="form-group">
                          <label>Email <code className="text-danger">*</code></label>
                          <input type="text" class="form-control" disabled
                            name="email" value={inputs.email}
                            onChange={handleChange} />
                        </div>

                        <div className="form-group">
                          <label >IsAdmin <code className="text-danger">*</code></label>
                          <select name="isAdmin" id="isAdmin" value={inputs.isAdmin}
                            class="form-control custom-select" onChange={handleChange}>
                            <option selected="" disabled="">Select one</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                        <div classNameName="form-group">
                          <div className="text-center">
                            {image ?
                              <img className="profile-user-img img-fluid img-circle" src={image} /> :
                              ""}

                          </div>
                        </div>
                        <div className="form-group">
                          <label>Image <code className="text-danger">*</code></label>
                          <input className="form-control"
                            type="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </div>
                        <div className="form-group">
                          {
                            isloading ?
                              <button id="btnLoading" className="btn btn-primary float-right" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                              </button>
                              :
                              <button type="submit" id="btnSubmit"
                                onClick={handleClick}
                                className="btn btn-primary float-right">Update</button>
                          }
                        </div>

                      </div>
                    </div>


                  </div>



                </div>
              </div>


            </div>
          </div>
        </section>

      </div>
      <Footer />
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </>
  );
}
