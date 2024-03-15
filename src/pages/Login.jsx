import { useContext, useState } from "react";
// import { publicRequest } from "../requestMethods";
import { NavLink, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../src/context/AuthContext";
import axios from "axios";

const Login = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { loading, error, dispatch } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill all data", { position: "top-center" });
    }
    else {
      try {
        dispatch({ type: "LOGIN_START" });
        const res = await axios.post(API_URL +"auth/login", { username, password });
        if (res.data != null) {
          if (res.data.isAdmin) {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate("/");
          }
          else {
            dispatch({
              type: "LOGIN_FAILURE",
              payload: { message: "You are not allowed!" },
            });
            toast.error("Access denied, You are not admin", { position: "top-center" })
          }
        }

      }
      catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        toast.error(err.response.data, { position: "top-center" });
      }
    }
  };


  return (
    <>
    <div className="container-scroller">
  <div className="container-fluid page-body-wrapper full-page-wrapper">
    <div className="content-wrapper d-flex align-items-center auth px-0 common-img-bg">
      <div className="row w-100 mx-0">
        <div className="col-lg-4 mx-auto">
          <div className="auth-form-light text-left py-5 px-4 px-sm-5">
            <div className="brand-logo">
              <img src="../../images/logo.svg" alt="logo" />
            </div>
            <h4>Hello! let's get started</h4>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            <form className="pt-3">
              <div className="form-group">
              <input type="text" className="form-control"
                    placeholder="user name" id="username"
                    onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
              <input type="password" className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mt-3 mb-3">
                {
                  loading ?
                    <button id="btnLoading" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button>
                    :
                    <button type="submit"
                      className="btn btn-primary btn-blockbtn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleClick}
                    >Sign In</button>
                }
                {error && <span>{error.message}</span>}

              </div>
              <div className="my-2 d-flex justify-content-between align-items-center">
                <div className="form-check">
                  {/* <label className="form-check-label text-muted">
                    <input type="checkbox" className="form-check-input" />
                    Keep me signed in
                  </label> */}
                   <input type="checkbox" id="remember" />
                      <label htmlFor="remember" className=" p-3">
                        Remember Me
                      </label>
                </div>
              </div>
              
              <div className="text-center mt-2 font-weight-light">
                <NavLink to="/register" className="text-primary p-2">Forgot password?</NavLink>
              </div>

              <div className="text-center mt-2 font-weight-light">
                Don't have an account? 
                <NavLink to="/register" className="text-primary p-2">Register</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* content-wrapper ends */}
  </div>
  {/* page-body-wrapper ends */}
</div>


{/* 
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a className="h1"><b>Admin</b>Dashboard</a>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Login</p>
              <form action="../../index3.html" method="post">
                <div className="input-group mb-3">
                  <input type="text" className="form-control"
                    placeholder="user name" id="username"
                    onChange={(e) => setUsername(e.target.value)} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">
                        Remember Me
                      </label>
                    </div>
                  </div>

                </div>
              </form>
              <div className="social-auth-links text-center mt-2 mb-3">
                {
                  loading ?
                    <button id="btnLoading" className="btn btn-primary btn-block float-right" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button>
                    :
                    <button type="submit"
                      className="btn btn-primary btn-block"
                      onClick={handleClick}
                    >Sign In</button>
                }
                {error && <span>{error.message}</span>}
              </div>
              <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
              </p>
              <p className="mb-0">
                <NavLink to="/register" className="text-center">Register a new membership</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <ToastContainer />
    </>
  )
}

export default Login
