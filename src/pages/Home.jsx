import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
  const apiurl = import.meta.env.VITE_API_URL;
  const { store, dispatch } = useGlobalReducer();

  // load contacts  from api 
  function loadContact() {

    fetch(`${apiurl}/agendas/Anthony_agenda/contacts`)
      .then((res) => res.json())
      .then((data) => {

        dispatch({
          type: "load_contacto",
          payload: data.contacts,
        });
      })
      .catch((err) => console.error("Error al cargar contactos:", err));
  }


  // delete contact by id (api)
  function deleteContact(id) {

    fetch(`${apiurl}/agendas/Anthony_agenda/contacts/${id}`, {
      method: "DELETE",
    })
      .then((res) =>  res)
      .then((data) => {
        loadContact(); 
      })
      .catch((err) => {
        console.error("Error eliminando contacto:", err);
      });
  }

  useEffect(() => {
    loadContact();
  }, []);

  return (
    <div className="text-start">
      <ul className="list-group ">
        {store?.contactos?.map((item) => (
          <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center">

              <div className="d-flex align-items-start">
                <img src={rigoImageUrl} alt="rigo" style={{ borderRadius: "40%" }}/>
                <div>
                  <h2>{item.name}</h2>
                  <p className="text-body-secondary">
                    <i className="fa-solid fa-location-dot"></i> {item.address}
                  </p>
                  <p className="text-body-secondary">
                    <i className="fa-solid fa-phone"></i> {item.phone}
                  </p>
                  <p className="text-body-secondary">
                    <i className="fa-solid fa-envelope"></i> {item.email}
                  </p>
                </div>
              </div>
 
              <div className="d-flex justify-content-between">
                <Link to={`/Single/${item.id}`}>
                <i className="fa-solid fa-pen me-2" style={{ cursor: "pointer", fontSize: "30px" }}></i>
                </Link>
                  <i className="fa-solid fa-trash ms-2" style={{ cursor: "pointer", fontSize: "30px" }}
                    onClick={() => deleteContact(item.id)}
                  ></i>
                    
                  
              </div>
 
          </li>
        ))}
      </ul>
    </div>
  );
};
