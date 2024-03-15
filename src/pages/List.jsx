import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
 import Datatable from "../components/Datatable"
//import Datatable from "../../components/datatable/Datatable"
import Footer from "../components/Footer"

const List = ({ columns }) => {
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
              <Datatable columns={columns} />
              </div> </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default List