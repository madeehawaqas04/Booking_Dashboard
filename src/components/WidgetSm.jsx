import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { NavLink, Link } from 'react-router-dom'

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  const accessToken = JSON.parse(localStorage.getItem("user"))?.token;
  console.log("accessToken_Home", accessToken);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest(accessToken).get("users?limit=5");
        setUsers(res.data);
      } catch (error) {
        showError(error);
      }
    };
    getUsers();
  }, []);

  return (
    <>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-title mb-0">Latest Users</p>
              <div className="table-responsive">

                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>

                      <th>More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="task-card-img m-l-40">
                          <img src={user.img ||
                            "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                            alt="Product 1" className="img-40 mr-2" />
                          {user.username}
                        </td>
                        <td>{user.email}</td>

                        <td>
                          <NavLink to={`/users/${user._id}`} className="btn btn-info btn-icon waves-effect waves-light">
                            <i className="icofont icofont-search-alt-2"></i>
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
