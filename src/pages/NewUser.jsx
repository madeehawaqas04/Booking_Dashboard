import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { userRequest } from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

export default function New() {
  const location = useLocation();
  const userId = location?.pathname.split("/")[2];
  const [file, setFile] = useState("");
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState("https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg");
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  console.log("userId", userId);
  const accessToken = JSON.parse(localStorage.getItem("user"))?.token;
  console.log("accessToken_Home", accessToken);

  const getUser = async () => {
    try {
      const res = await userRequest(accessToken).get(`/users/find/${userId}`);
      console.log(res.data);
      const user = res.data;
      setInputs({ ...user })
      setImage(user.img);
    } catch (err) {
      toast.error("Something went wrong! Error" + err, { position: "top-center" });
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId !== "new") {
      getUser();
      setDisabled(true);
    }
  }, [])

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    var isFileExists = "";

    if (userId === "new") {
      isFileExists = file;
    }
    else {
      isFileExists = "kjk";
    }

    console.log("isFileExists", isFileExists);
    const { username, email, phone, password, cpassword, city, country, isAdmin } = inputs;
    console.log("inputs", inputs);
    if (!username || !email || !city || !phone || !password || !cpassword || !country || isAdmin === "" || !isFileExists) {
      toast.error("Please fill all fields", { position: "top-center" });
    }
    else if (cpassword != password) {
      toast.error("Password and confirm password must be same!", { position: "top-center" });
    }
    else {
      setIsloading(true);
      try {
        if (file) {
          var newUser = {};
          console.log("file", file);
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/madiha/image/upload",
            data
          );

          console.log("uploadRes.data", uploadRes.data);
          const { url } = uploadRes.data;

          newUser = {
            ...inputs,
            img: url,
          };
        }
        else {
          newUser = {
            ...inputs,
            img: image,
          };
        }

        if (userId === "new") {
          await userRequest(accessToken).post("auth/register", newUser);
          setTimeout(function () {
            toast.success("user added successfully", { position: "top-center" });
          }, 2000);
          navigate("/users")
        }
        else {
          await userRequest(accessToken).put(`users/${userId}`, newUser);
          setTimeout(function () {
            toast.success("user updated successfully", { position: "top-center" });
          }, 2000);
          navigate("/users")
        }


      } catch (err) {
        setIsloading(true);
        toast.error("Something went wrong! Error" + err, { position: "top-center" });
        console.log(err.response.data?.message);
      }
    }
  };
  console.log(inputs);
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">

              <div className="row">
                <div className="col-md-12">
                  <div className="card card-primary">

                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h2 className="mb-5">{userId === "new" ? "Create User" : "Update User"}</h2>
                        <Link to='/Users' className="link">
                          <button type="button" className="btn btn-primary btn-icon-text">
                            <i className="ti-arrow-left mdi mdi-arrow-left"></i>
                            Back
                          </button>
                        </Link>

                      </div>
                      <div className="row">

                        <div className="col-md-6 pl-3">
                          <div className="form-group">
                            <label>Image <code className="text-danger">*</code>   </label>
                            <div >
                              <img className="img-circle "
                                src={
                                  file
                                    ? URL.createObjectURL(file)
                                    : image
                                }
                                alt=""
                              />
                              <label htmlFor="file">
                                <DriveFolderUploadOutlinedIcon className="uploadicon " style={{ fontSize: 20 }} />
                              </label>
                              <input className="form-control"
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                              />
                            </div>

                          </div>

                          <div className="form-group">
                            <label> User Name <code className="text-danger">*</code></label>
                            <input type="text" class="form-control" disabled={disabled}
                              name="username" placeholder="john_doe" value={inputs.username}
                              onChange={handleChange} />
                          </div>
                          {
                            userId === "new" &&
                            <div className="form-group">
                              <label>Password <code className="text-danger">*</code></label>
                              <input type="password" class="form-control"
                                name="password"
                                onChange={handleChange} />
                            </div>

                          }
                          {
                            userId === "new" &&
                            <div className="form-group">
                              <label>Confirm Password <code className="text-danger">*</code></label>
                              <input type="cpassword" class="form-control"
                                name="cpassword"
                                onChange={handleChange} />
                            </div>

                          }



                          <div className="form-group">
                            <label>Email <code className="text-danger">*</code></label>
                            <input type="text" class="form-control" disabled={disabled}
                              name="email" placeholder="john_doe@gmail.com" value={inputs.email}
                              onChange={handleChange} />
                          </div>
                          {/* <div className="form-group">
                            <label >Address <code className="text-danger">*</code></label>
                            <textarea class="form-control" type="text"
                              name="address" rows="4" placeholder="description..."
                              onChange={handleChange} ></textarea>

                          </div> */}
                        </div>

                        <div className="col-md-6 pl-3">
                          <div className="form-group">
                            <label>Phone <code className="text-danger">*</code></label>
                            <input name="phone" placeholder="+1 234 567 89" value={inputs.phone}
                              type="number" className="form-control"
                              onChange={handleChange} />
                          </div>
                          <div className="form-group">
                            <label>Country <code className="text-danger">*</code></label>
                            <input type="text" class="form-control"
                              name="country" placeholder="USA" value={inputs.country}
                              onChange={handleChange} />
                          </div>
                          <div className="form-group">
                            <label>City <code className="text-danger">*</code></label>
                            <input type="text" class="form-control" value={inputs.city}
                              name="city" placeholder="New York"
                              onChange={handleChange} />
                          </div>
                          {/* <div className="form-group">
                            <label>Confirm Password <code className="text-danger">*</code></label>
                            <input type="text" class="form-control"
                              name="cpassword"
                              onChange={handleChange} />
                          </div> */}

                          <div className="form-group">
                            <label >IsAdmin <code className="text-danger">*</code></label>
                            <select name="isAdmin" id="isAdmin" class="form-control-lg custom-select"
                              onChange={handleChange} value={inputs.isAdmin}>
                              <option value="" selected="" disabled="">Select one</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
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
                                  className="btn btn-primary float-right">
                                  {userId === "new" ? "Create" : "Update"}
                                </button>
                            }
                          </div>

                        </div>
                      </div>


                    </div>

                  </div>
                </div>


              </div>


            </div>
            {/* <div className="content-wrapper">
          <div className="row">
            <div className="top">
              <h1>{title}</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img className="img-circle"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <form>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>

                  {inputs.map((input) => (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        onChange={handleChange}
                        type={input.type}
                        placeholder={input.placeholder}
                        id={input.id}
                      />
                    </div>
                  ))}
                  <button onClick={handleClick}>Send</button>
                </form>
              </div>
            </div>
          </div> 
          </div> */}
            <Footer />
          </div>
        </div >
      </div >


      <ToastContainer />
    </>
  );
};
