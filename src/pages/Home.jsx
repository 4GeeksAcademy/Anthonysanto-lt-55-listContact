import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const apiurl = import.meta.env.VITE_API_URL;
  const { store, dispatch } = useGlobalReducer();

  // Cargar contactos desde la API
  function loadContact() {
    console.log("Cargando contactos...");
    fetch(`${apiurl}/agendas/superman/contacts`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Contactos recibidos:", data.contacts);
        dispatch({
          type: "load_contacto",
          payload: data.contacts,
        });
      })
      .catch((err) => console.error("Error al cargar contactos:", err));
  }

  // Eliminar contacto por ID
  function deleteContact(id) {
    console.log("Eliminando contacto con id:", id);
    fetch(`${apiurl}/agendas/superman/contacts/${id}`, {
      method: "DELETE",
    })
      .then((res) =>  res)
      .then((data) => {
        console.log("Contacto eliminado:", data);
        loadContact(); // Recargar lista después de borrar
      })
      .catch((err) => {
        console.error("Error eliminando contacto:", err);
      });
  }

  // Ejecutar carga al montar componente
  useEffect(() => {
    loadContact();
  }, []);

  return (
    <div className="text-center mt-5">
      <ul className="list-group">
        {store?.contactos?.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <p>name: {item.name}</p>
              <p>number: {item.phone}</p>
              <p>id: {item.id}</p>
            </div>
            <button onClick={() => deleteContact(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} alt="rigo" />
      </p>
    </div>
  );
};
