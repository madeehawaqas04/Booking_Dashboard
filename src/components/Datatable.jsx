import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { userColumns } from "../datatablesource";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react'
import useFetch from "../hooks/useFetch";
import Dialog from '../components/Dialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { userRequest } from "../../src/requestMethods";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  // console.log("path", path);
  const { data, loading, error } = useFetch(`${path}`);
  const idRef = useRef();
  const hospitalidRef = useRef();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    name: ""
  });

  //console.log(loading);
  useEffect(() => {
    setList(data);
  }, [data,path]);
  // useEffect(() => {
  //   setList([]);
  //   const fetchData = async () => {
  //     try {
  //       const res = await userRequest.get(path);
  //       console.log("res.data.fetch",res.data);
  //       setList(res.data);
  //     } catch (err) {
  //       console.log("err",err);
  //     }
  //   };
  //   fetchData();
  // }, [path]);

  //console.log("list count",path , list);

  const handleDelete = (e, row) => {
    //Update
   // console.log("row",row);
    e.stopPropagation();
    handleDialog("Are you sure you want to delete?", true, row.name);
    idRef.current = row._id;
    if (path === "rooms") {
      hospitalidRef.current = row.hotelId;
    }
  };
  const handleDialog = (message, isLoading, name) => {
    setDialog({
      message,
      isLoading,
      //Update
      name
    });
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      deleteData(idRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const deleteData = async (id) => {
    try {
      //console.log("path",path);
      if (path === "rooms") {
        const hotelId = hospitalidRef.current;
        await userRequest.delete(`/${path}/${id}/${hotelId}`);
      } else {
        await userRequest.delete(`/${path}/${id}`);
      }
      setList(list.filter((item) => item._id !== id));
      toast.error(`${path} has been deleted successfully`, { position: "top-right" });

    } catch (err) {
      toast.error("Something went wrong, error" + err, { position: "top-right" });

    }
  };

  //console.log("list count",Object.keys(list).length);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/${path}/${params.row._id}`} >
              <button className="btn btn-md btn-success mr-2"><CreateIcon />
              </button></Link>
            <button className="btn btn-md btn-danger deleteButton"
              onClick={(e) => handleDelete(e, params.row)}
            ><DeleteOutlineIcon /></button>
          </>

        );
      },
    }
  ];
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p className="card-title"> {path}</p>
              <Link to={`/${path}/new`} className="link">

                <button type="button" className="btn btn-primary btn-icon-text">
                  <i className="ti-plus mdi mdi-plus"></i>
                  Add New
                </button>
              </Link>

            </div>

            {/* <div className="table-responsive"> */}
            {/* <table className="table table-hover"> */}
            <div className="datatable">
              {
                //list &&
                loading
                ? "loading"
                : 
                list &&
                  <DataGrid sx={{
                    m: 2,
                    boxShadow: 2,
                    border: 2,
                    borderColor: '#e8ebed',
                    '& .MuiDataGrid-cell:hover': {
                      color: 'primary.main',
                    },
                  }}
                    slots={{ toolbar: GridToolbar }}
                    className="datagrid"
                    rows={list}
                    columns={columns.concat(actionColumn)}
                    initialState={{
                      pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                      },
                    }}
                    pageSizeOptions={[3, 10]}
                    getRowId={(row) => row._id}
                  />
                  // :
                  // "No Record Found"
              }
            </div>
            {/* </table> */}
            {/* </div> */}
          </div>
        </div>


      </div>
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

      {dialog.isLoading && (
        <Dialog
          //Update
          nameProduct={dialog.name}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}

    </>
  );
};

export default Datatable;
