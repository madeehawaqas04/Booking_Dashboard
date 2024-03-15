import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { NavLink } from 'react-router-dom';
import { format } from "timeago.js"

export default function WidgetLg() {
  const [hotels, sethotels] = useState([]);

  const accessToken = JSON.parse(localStorage.getItem("user"))?.token;
  console.log("accessToken_Home", accessToken);


  useEffect(() => {
    const gethotels = async () => {
      try {
        const res = await userRequest(accessToken).get("hotels?limit=5");
        sethotels(res.data);
      } catch (error) {
        //showError(error);
      }
    };
    gethotels();
  }, []);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-title mb-0">Latest Hotels</p>
              <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>

                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <tr key={hotel._id}>
                      <td className="task-card-img m-l-40">
                        <img src={hotel.photos ||
                          "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} 
                          alt="hotel" className="img-40 mr-2" />
                        {hotel.name}
                      </td>
                      <td>{hotel.type}</td>

                      <td>
                        <NavLink to={`/hotels/${hotel._id}`} className="btn btn-info btn-icon waves-effect waves-light">
                          <i  className="icofont icofont-search-alt-2"></i>
                        </NavLink>
                      </td>
                    </tr>
                  ))}


                </tbody>
              </table>

              </div>
            </div>
          </div>
        </div>
    </>

  );
}
