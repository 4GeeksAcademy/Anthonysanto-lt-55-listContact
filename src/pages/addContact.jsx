import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useState } from "react";

export const AddContact = () => {
  const apiurl = import.meta.env.VITE_API_URL;
  const { store, dispatch } = useGlobalReducer()

  //empieza en blanco
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  function addContact() {

      const optionsRequest = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address,
          })
      }
      fetch(`${apiurl}/agendas/Anthony_agenda/contacts`, optionsRequest)
        .then(res => res.json())
        .then(data => {//limpar 
          setName("")
          setPhone("")
          setEmail("")
          setAddress("")
        })

    }


  return (
    <div className="container">
      <label htmlFor="name">Nombre:</label>
      <input type="text" id="name" className="form-control" placeholder="Ingresar nombre completo" value={name} onChange={(e) => setName(e.target.value)} />
       <br/>
      <label htmlFor="phone">Teléfono:</label>
      <input type="text" id="phone" className="form-control" placeholder="Ingresar teléfono de contacto" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <br/>
      <label htmlFor="email">Correo electrónico:</label>
      <input type="text" id="email" className="form-control" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br/>
      <label htmlFor="address">Dirección:</label>
      <input type="text" id="address" className="form-control" placeholder="Dirección residencial" value={address} onChange={(e) => setAddress(e.target.value)} />
            <br/>
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="button" onClick={addContact}>Agregar contacto</button>
      </div>
      <Link to="/">
        <p>Regresar</p>
      </Link>

    </div>

  );
};