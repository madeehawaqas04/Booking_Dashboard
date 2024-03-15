import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link, useLocation, useFormAction } from "react-router-dom";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";

export default function New() {
    const location = useLocation();
    const roomId = location?.pathname.split("/")[2];
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const [isloading, setIsloading] = useState(false);
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);

    const { data, loading, error } = useFetch("/hotels");

    console.log("roomId", roomId);
    const accessToken = JSON.parse(localStorage.getItem("user"))?.token;
    console.log("accessToken_Home", accessToken);
    
    const getRoom = async () => {
        try {
            const res = await userRequest(accessToken).get(`/rooms/find/${roomId}`);
            const room = res.data;
            setHotelId(res.data.hotelId);
            setInputs({ ...room });

            console.log("res.data", res.data, hotelId);

            // setImage(room.img);
        } catch (err) {
            toast.error("Something went wrong! Error" + err, { position: "top-center" });
            console.log(err);
        }
    };

    useEffect(() => {
        if (roomId !== "new") {
            getRoom();
        }
    }, [])

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const { title, price, maxPeople, desc } = inputs;
        console.log("inputs", title, price, maxPeople, desc, hotelId, rooms);
        if (!title || !price || !maxPeople || !desc || !hotelId || !rooms) {
            toast.error("Please fill all fields", { position: "top-center" });
        }
        else {
            setIsloading(true);
            try {

                const roomNumbers = rooms?.split(",").map((room) => ({ number: room }));
                setInputs((prev) => ({ ...prev, [hotelId]: hotelId }));

                console.log("setInputs", inputs);
                if (roomId === "new") {
                    await userRequest(accessToken).post(`/rooms/${hotelId}`, { ...inputs, roomNumbers, hotelId });
                    setTimeout(function () {
                        toast.success("room added successfully", { position: "top-center" });
                    }, 2000);
                    navigate("/rooms")
                }
                else {
                    await userRequest(accessToken).put(`rooms/${roomId}`, { ...inputs, roomNumbers });
                    setTimeout(function () {
                        toast.success("room updated successfully", { position: "top-center" });
                    }, 2000);
                    navigate("/rooms")
                }


            } catch (err) {
                setIsloading(false);
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
                                            <h2 className="mb-5">{roomId === "new" ? "Create Room" : "Update Room" }</h2>
                                                <Link to='/rooms' className="link">
                                                    <button type="button" className="btn btn-primary btn-icon-text">
                                                        <i className="ti-arrow-left mdi mdi-arrow-left"></i>
                                                        Back
                                                    </button>
                                                </Link>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 pl-3">
                                                    <div className="form-group">
                                                        <label>Title <code className="text-danger">*</code></label>
                                                        <input type="text" className="form-control"
                                                            name="title" placeholder="2 bed room" value={inputs.title}
                                                            onChange={handleChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label >Description <code className="text-danger">*</code></label>
                                                        <textarea className="form-control" type="text" value={inputs.desc}
                                                            name="desc" rows="4" placeholder="King size bed, 1 bathroom..."
                                                            onChange={handleChange} ></textarea>

                                                    </div>

                                                    <div className="form-group">
                                                        <label>Price <code className="text-danger">*</code></label>
                                                        <input type="number" className="form-control" value={inputs.price}
                                                            name="price" placeholder="100"
                                                            onChange={handleChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label >Choose a hotel <code className="text-danger">*</code></label>
                                                        <select className="form-control-lg custom-select"
                                                            id="hotel" name="hotel" value={inputs.hotelId}
                                                            onChange={(e) => setHotelId(e.target.value)}>
                                                            <option value="" disabled="">Select Hotel</option>
                                                            {loading
                                                                ? "loading"
                                                                : data &&
                                                                data.map((hotel) => (
                                                                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 pl-3">

                                                    <div className="form-group">
                                                        <label>Max People <code className="text-danger">*</code></label>
                                                        <input type="text" className="form-control" value={inputs.maxPeople}
                                                            name="maxPeople" placeholder="2"
                                                            onChange={handleChange} />
                                                    </div>


                                                    <div className="form-group">
                                                        <label >Rooms <code className="text-danger">*</code></label>
                                                        <textarea className="form-control" type="text" value={inputs.rooms}
                                                            rows="3"
                                                            onChange={(e) => setRooms(e.target.value)}
                                                            placeholder="give comma between room numbers."></textarea>

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
                                                                    {roomId === "new" ? "Create" : "Update"}
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
