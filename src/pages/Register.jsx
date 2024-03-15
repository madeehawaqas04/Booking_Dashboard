import React, { useState } from 'react'
import { publicRequest } from "../requestMethods";
import { NavLink } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [FormError, setFormError] = useState({});
    const [agreement, setAgreement] = useState(false);
    const [isloading, setIsloading] = useState(false);

    const handleInputs = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleChange = (event) => {
        setAgreement(event.target.checked);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const { username, email, password, cpassword } = user;

        if (!username || !email || !password || !cpassword) {
            toast.error("Please fill all feilds", { position: "top-center" });
        } else if (!regex.test(email)) {
            toast.error("Invalid email!", { position: "top-center" });
        }
        else if (password.length < 4) {
            toast.error("Password must be more than 4 characters!", { position: "top-center" });
        }
        else if (cpassword != password) {
            toast.error("Password and confirm password must be same!", { position: "top-center" });
        }
        else {
            try {
                setIsloading(true);
                const res = await publicRequest.post("/auth/register", user);
                console.log("register", res);

                navigate("/login")
                setIsloading(false);
            } catch (err) {
                console.log(err);
                setIsloading(false);
                toast.error(err.response.data.message, { position: "top-center" });
            }
        }

    }

 

    return (
        <>
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0 common-img-bg">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        {/* <img src="../../images/logo.svg" alt="logo" /> */}
                                        <h2 className='align-items text-center pb-3 pt-3'>Register</h2>

                                    </div>
                                   

                                    <div className="input-group mb-3">

                                        <input type="text" className="form-control"
                                            name="username"
                                            onChange={handleInputs}
                                            placeholder="User name" />

                                        <p className='error invalid-feedback'>{FormError.username}</p>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control"
                                            name="email"
                                            onChange={handleInputs}
                                            placeholder="Email" />

                                        <p className='error invalid-feedback'>{FormError.email}</p>

                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control"
                                            placeholder="Password"
                                            name="password"
                                            onChange={handleInputs}
                                        />

                                        <p className='error invalid-feedback'>{FormError.password}</p>
                                    </div>
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control"
                                            placeholder="Retype password"
                                            name="cpassword"
                                            onChange={handleInputs}
                                        />

                                        <p className='error invalid-feedback'>{FormError.cpassword}</p>
                                    </div>
                                    <div className="row">
                                        <div className="col-8">
                                            {/* <div className="icheck-primary">
                                                <input type="checkbox" id="agreeTerms"
                                                    name="terms" value="agree" onChange={handleChange} />
                                                <label htmlFor="agreeTerms">
                                                    I agree to the <a href="#">terms</a>
                                                </label>
                                            </div> */}
                                            <div class="form-check">
                                                <label class="form-check-label text-muted">
                                                    <input type="checkbox" class="form-check-input" id="agreeTerms"
                                                        value="agree" onChange={handleChange} />
                                                    I agree to all Terms &amp; Conditions
                                                    <i class="input-helper"></i></label>
                                            </div>

                                        </div>

                                        <div className="col-4">
                                            {
                                                isloading ?
                                                    <button id="btnLoading" className="btn btn-primary btn-block float-right " type="button" disabled>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        Loading...
                                                    </button>
                                                    :
                                                    <button type="submit" disabled={!agreement}
                                                        className="btn btn-primary btn-block"
                                                        onClick={handleClick}
                                                    >Register</button>
                                            }

                                        </div>

                                    </div>
                                    <div className="text-center mt-4 font-weight-light">
                                        Already have an account? <NavLink to="/login" className="text-primary">Login</NavLink>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* content-wrapper ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>

            <ToastContainer />
        </>
    )
}

export default Register
