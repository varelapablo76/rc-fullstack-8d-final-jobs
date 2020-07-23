import React, { useState } from "react";
import { BsFileText } from "react-icons/bs";
import { AiTwotoneEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
// import { Link } from "react-router-dom";

const Table = (props) => {
  const [estado, setestado] = useState(props.c.state);
  const [flag, setflag] = useState(true);
  const modificar = async (e) => {
    e.preventDefault();
    try {
      setflag(false);
      await axios.put(
        `http://localhost:3001/api/v1/offer/postulates/${props.c._id}/admin`,
        { state: estado }
      );
      await Swal.fire(
        "genial",
        "se modifico correctamente la postulación",
        "success"
      );
      setflag(true);
    } catch (err) {
      if (err.response.data.message === undefined) {
        Swal.fire(
          `Error de ${err.response.data.errors[0].param}`,
          err.response.data.errors[0].msg,
          "error"
        );
      } else {
        Swal.fire("Oops..", err.response.data.message, "error");
      }
    }
  };

  return (
    <tr>
      <td>
      {props.d.cv !== undefined ? (
      <a className="btn btn-outline-secondary btn-sm text-white"  href={"http://localhost:3001" + props.d.cv}>
        <BsFileText />
      </a>):( <button className="btn btn-outline-secondary btn-sm text-white" onClick={() => {
        Swal.fire("Oops..","no tiene CV añadido", "error")
      }}  >
        <BsFileText />
      </button> )}</td>
      <td>{props.d.firstname} {props.d.lastname}</td>
      <td>{props.c.emailcandidate}</td>
      <td>{props.c.experiences}</td>
      <td className="text-center">{props.c.intendedsalary}</td>
      <td>{props.c.studies}</td>
      <td>
        <form onSubmit={modificar}>
          <div className="form-group d-flex flex-nowrap">
            <select
              className="form-control"
              name="state"
              required
              onChange={(e) => setestado(e.target.value)}
              defaultValue={props.c.state}
            >
              <option value="">Pendiente</option>
              <option value="Aceptado">Aceptado</option>
              <option value="Desestimado">Desestimado</option>
            </select>
            {flag ? (
             <button type="submit" className="btn btn-outline-secondary btn-sm text-white ml-2">
             <AiTwotoneEdit />
           </button>
            ) : (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Loading...</span>
              </button>
            )}
          </div>
        </form>
      </td>
    </tr>
  );
};

export default Table;
