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
    const hotelId = location?.pathname.split("/")[2];
    //const [file, setFile] = useState("");
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState(["https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"]);
    const navigate = useNavigate();
    const [isloading, setIsloading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [files, setFiles] = useState("");

   // console.log("hotelId", hotelId);

    const getHotel = async () => {
        try {
            const res = await userRequest.get(`/hotels/find/${hotelId}`);
            console.log(res.data);
            const hotel = res.data;
            setInputs({ ...hotel })
            setImage(hotel.photos);
        } catch (err) {
            toast.error("Something went wrong! Error" + err, { position: "top-center" });
            console.log(err);
        }
    };

    useEffect(() => {
        if (hotelId !== "new") {
            getHotel();
            setDisabled(true);
        }
    }, [])

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        var isFileExists = "";

        // if (hotelId === "new") {
        //     isFileExists = file;
        // }
        // else {
        //     isFileExists = "kjk";
        // }

        console.log("isFileExists", isFileExists);
        const { name, type, city, address, distance, title, desc, featured } = inputs;
        console.log("inputs", inputs);
        if (!name || !type || !city || !address || !distance || !title || featured === "" || !desc) {
            toast.error("Please fill all fields", { position: "top-center" });
        }
        else {
            setIsloading(true);
            try {
                if (files) {
                    var newhotel = {};
                    //     console.log("file", files);

                    const list = await Promise.all(
                        Object.values(files).map(async (file) => {
                            const data = new FormData();
                            data.append("file", file);
                            data.append("upload_preset", "upload");
                            const uploadRes = await axios.post(
                                "https://api.cloudinary.com/v1_1/madiha/image/upload",
                                data
                            );

                            const { url } = uploadRes.data;
                            return url;
                        })
                    );

                    //   console.log("list", list);

                    newhotel = {
                        ...inputs,
                        photos: list,
                    };
                }
                else {
                    newhotel = {
                        ...inputs,
                        photos: image,
                    };
                }

                if (hotelId === "new") {
                    await userRequest.post("hotels", newhotel);
                    setTimeout(function () {
                        toast.success("Hotel added successfully", { position: "top-center" });
                    }, 2000);
                    navigate("/hotels")
                }
                else {
                    await userRequest.put(`hotels/${hotelId}`, newhotel);
                    setTimeout(function () {
                        toast.success("Hotel updated successfully", { position: "top-center" });
                    }, 2000);
                    navigate("/hotels")
                }


            } catch (err) {
                setIsloading(true);
                toast.error("Something went wrong! Error" + err, { position: "top-center" });
                console.log(err);
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
                                                <h2 className="mb-5">{hotelId === "new" ? "Create Hotel" : "Update Hotel"}</h2>
                                                <Link to='/hotels' className="link">
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
                                                                    files
                                                                        ? URL.createObjectURL(files[0])
                                                                        : image[0]
                                                                }
                                                                alt=""
                                                            />
                                                            <label htmlFor="file">
                                                                <DriveFolderUploadOutlinedIcon className="uploadicon " style={{ fontSize: 20 }} />
                                                            </label>

                                                            <div className="formInput">
                                                                <input
                                                                    type="file"
                                                                    id="file"
                                                                    multiple
                                                                    onChange={(e) => setFiles(e.target.files)}
                                                                    style={{ display: "none" }}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="form-group">
                                                        <label> Name <code className="text-danger">*</code></label>
                                                        <input type="text" class="form-control"
                                                            name="name" placeholder="My Hotel" value={inputs.name}
                                                            onChange={handleChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Type <code className="text-danger">*</code></label>
                                                        <input name="type" placeholder="hotel" value={inputs.type}
                                                            type="text" className="form-control"
                                                            onChange={handleChange} />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Title <code className="text-danger">*</code></label>
                                                        <input type="text" class="form-control"
                                                            name="title" placeholder="The best Hotel" value={inputs.title}
                                                            onChange={handleChange} />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Price <code className="text-danger">*</code></label>
                                                        <input type="number" class="form-control" placeholder="100"
                                                            name="cheapestPrice" value={inputs.cheapestPrice}
                                                            onChange={handleChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label >Featured <code className="text-danger">*</code></label>
                                                        <select name="featured" id="featured" class="form-control-lg custom-select"
                                                            onChange={handleChange} value={inputs.featured}>
                                                            <option value="" selected="" disabled="">Select one</option>
                                                            <option value="true">Yes</option>
                                                            <option value="false">No</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 pl-3">

                                                    <div className="form-group">
                                                        <label>City <code className="text-danger">*</code></label>
                                                        <input type="text" class="form-control" value={inputs.city}
                                                            name="city" placeholder="New York"
                                                            onChange={handleChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label >Address <code className="text-danger">*</code></label>
                                                        <textarea class="form-control" type="text" value={inputs.address}
                                                            name="address" rows="4" placeholder="Address..."
                                                            onChange={handleChange} ></textarea>

                                                    </div>
                                                    <div className="form-group">
                                                        <label >Distance <code className="text-danger">*</code></label>
                                                        <textarea class="form-control" type="text" value={inputs.distance}
                                                            name="distance" rows="2" placeholder="elton st, 216..."
                                                            onChange={handleChange} ></textarea>

                                                    </div>
                                                    <div className="form-group">
                                                        <label >Description <code className="text-danger">*</code></label>
                                                        <textarea class="form-control" type="text" value={inputs.desc}
                                                            name="desc" rows="4" placeholder="description..."
                                                            onChange={handleChange} ></textarea>

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
                                                                    {hotelId === "new" ? "Create" : "Update"}
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

                        <Footer />
                    </div>
                </div >
            </div >


            <ToastContainer />
        </>
    );
};
