import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { NavLink, Link } from 'react-router-dom'
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../redux/userRedux";
import { useNavigate } from 'react-router-dom'

export default function FeaturedInfo() {
  const [totalHotel, setTotalHotel] = useState([]);
  const [totalApartments, setTotalApartments] = useState([]);
  const [totalResorts, setTotalResorts] = useState([]);
  const [totaluser, setTotaluser] = useState([]);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  //let accessToken = null;
  // const user = useSelector((state) => state.user);
  // const accessToken = useSelector((state) => state.user.currentUser.accessToken);
  // console.log("user.currentUser", user.currentUser + accessToken);


  useEffect(() => {
    const getTotalHotel = async () => {
      try {
        const res = await userRequest.get("hotels/countByType");
      //  console.log("hotels data", res.data);
        const list = res.data;
        //get total hotel
        setTotalHotel(list.filter((item) => item.type === "hotel"));
        console.log("totalHotel", totalHotel);

        //get total appartments
        setTotalApartments(list.filter((item) => item.type === "apartments"));
        console.log("totalApartments", totalApartments);

        //get total resort
        setTotalResorts(list.filter((item) => item.type === "resorts"));
        //console.log("totalResorts", totalResorts);


      } catch (error) {
        console.log(error);
      }
    };
    getTotalHotel();
    getTotalUser();
   
  }, []);

  const getTotalUser = async () => {
    try {
      const res = await userRequest.get("users/getUersCount");
      setTotaluser(res.data.count);
    } catch (error) { console.log(error); }
  }


  // console.log("totalorder", totalorder.length);
  // console.log("totalproduct", totalproduct.length);
  // console.log("totaluser", totaluser.length);

  return (
    <>
      <div className="row">
        <div className="col-md-6 col-xl-3">
          <div className="card widget-card-1">
            <div className="card-block-small">
            <Link to="/users">
              <i className="icofont icofont-pie-chart bg-c-blue card1-icon" />
              <span className="text-c-blue f-w-600">Users</span>
              <h4>{totaluser}</h4>
              <div>
                <span className="f-left m-t-10 text-muted">
                  <i className="text-c-blue f-16 icofont icofont-hand-drawn-right m-r-10" />More Detail
                </span>
              </div>
              </Link>
            </div>
            
          </div>
        </div>
        {/* card1 end */}
        {/* card1 start */}
        <div className="col-md-6 col-xl-3">
          <div className="card widget-card-1">
            <div className="card-block-small">
            <Link to="/hotels">
              <i className="icofont icofont-5-star-hotel bg-c-pink card1-icon" />
              <span className="text-c-pink f-w-600">Hotels</span>
              <h4>{totalHotel[0]?.count}</h4>
              <div>
                <span className="f-left m-t-10 text-muted">
                  <i className="text-c-pink f-16 icofont icofont-hand-drawn-right m-r-10" />More Detail
                </span>
              </div>
              </Link>
            </div>
          </div>
        </div>
        {/* card1 end */}
        {/* card1 start */}
        <div className="col-md-6 col-xl-3">
          <div className="card widget-card-1">
            <div className="card-block-small">
            <Link to="/hotels">
              <i className="icofont icofont-picture bg-c-green card1-icon" />
              <span className="text-c-green f-w-600">Resorts</span>
              <h4>{totalResorts[0]?.count}</h4>
              <div>
                <span className="f-left m-t-10 text-muted">
                  <i className="text-c-green f-16 icofont icofont-hand-drawn-right m-r-10" />More Detail
                </span>
              </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card widget-card-1">
            <div className="card-block-small">
            <Link to="/hotels">
              <i className="icofont icofont-hotel bg-c-yellow card1-icon" />
              <span className="text-c-yellow f-w-600">Apartments</span>
              <h4>{totalApartments[0]?.count}</h4>
              <div>
                <span className="f-left m-t-10 text-muted">
                  <i className="text-c-yellow f-16 icofont icofont-hand-drawn-right m-r-10" />More Detail
                </span>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>

    // <div className="row">
    //   <div className="col-lg-3 col-6">
    //     {/* small box */}
    //     <div className="small-box bg-info">
    //       <div className="inner">
    //         <h3>{totalorder.length}</h3>
    //         <p>New Orders</p>
    //       </div>
    //       <div className="icon">
    //         <i className="ion ion-bag" />
    //       </div>
    //       <NavLink to="/orders" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></NavLink>
    //     </div>
    //   </div>
    //   {/* ./col */}
    //   <div className="col-lg-3 col-6">
    //     {/* small box */}
    //     <div className="small-box bg-success">
    //       <div className="inner">
    //         <h3>{totalproduct.length}<sup style={{ fontSize: 20 }}></sup></h3>
    //         <p>Total Products</p>
    //       </div>
    //       <div className="icon">
    //         <i className="ion ion-stats-bars" />
    //       </div>
    //       <NavLink to="/products" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></NavLink>
    //     </div>
    //   </div>
    //   {/* ./col */}
    //   <div className="col-lg-3 col-6">
    //     {/* small box */}
    //     <div className="small-box bg-warning">
    //       <div className="inner">
    //         <h3>{totaluser.length}</h3>
    //         <p>User Registrations</p>
    //       </div>
    //       <div className="icon">
    //         <i className="ion ion-person-add" />
    //       </div>
    //       <NavLink to="/users" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></NavLink>
    //     </div>
    //   </div>
    //   {/* ./col */}
    //   <div className="col-lg-3 col-6">
    //     {/* small box */}
    //     <div className="small-box bg-danger">
    //       <div className="inner">
    //         <h3>65</h3>
    //         <p>Unique Visitors</p>
    //       </div>
    //       <div className="icon">
    //         <i className="ion ion-pie-graph" />
    //       </div>
    //       <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
    //     </div>
    //   </div>
    //   {/* ./col */}
    // </div>
  );
}
