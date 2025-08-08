import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const apiurl = import.meta.env.VITE_API_URL;
  const { store, dispatch } = useGlobalReducer();
  const { theId } = useParams();

  const singleContact = store.contactos.find(c => c.id === parseInt(theId));

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (singleContact) {
      setForm({
        name: singleContact.name,
        phone: singleContact.phone,
        email: singleContact.email,
        address: singleContact.address,
      });
    }
  }, [singleContact]);

function editContact() {
  const optionsRequest = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  };
  fetch(`${apiurl}/agendas/Anthony_agenda/contacts/${theId}`, optionsRequest)
    .then((res) => res.json())
    .then((result) => {
      setForm({ name: "", phone: "", email: "", address: "" });
    });
}

  return (
    <div className="container">
      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        id="name"
        className="form-control"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <br />
      <label htmlFor="phone">Teléfono:</label>
      <input
        type="text"
        id="phone"
        className="form-control"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <br />
      <label htmlFor="email">Correo electrónico:</label>
      <input
        type="text"
        id="email"
        className="form-control"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <br />
      <label htmlFor="address">Dirección:</label>
      <input
        type="text"
        id="address"
        className="form-control"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <br />
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="button" onClick={editContact}>
          Guardar cambios
        </button>
      </div>
      <Link to="/">
        <p>Regresar</p>
      </Link>
    </div>
  );
};
