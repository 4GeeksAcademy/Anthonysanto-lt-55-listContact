import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const apiurl = import.meta.env.VITE_API_URL
  console.log(apiurl)
  const {store, dispatch} =useGlobalReducer()
  
  function loadContact(){
    console.log('cargados los contactos')
    fetch('https://playground.4geeks.com/contact/agendas/superman/contacts')
    .then((res)=> res.json())
    .then((data)=> {
      console.log(data.contacts)
      dispatch({
        type: 'load_contacto',
        payload: data.contacts
    })
    })
 
    };

    function deleteContact(index){
    console.log('delete' + index)
    .fetch(`${apiurl}/agendas/superman/contacts/${id}`)
    .then((res)=> res.json)
    .then((data)=> console.log(data))
  /* dispatch({type: 'delete_contacto',
      payload: {indexDelete: index}
    })*/
	 }

	 useEffect( ()=>{  
     loadContact()

	 	let contactosIniciales = [      {
        name: "batman1",
        phone: 1,
      }, 
		      {
        name: "batman2",
        phone: 1,
      }]
    },[])

	return (
		<div className="text-center mt-5">
			            <ul className="list-group">
        {/* Map over the 'todos' array from the store and render each item as a list element */}
        {store && store.contactos?.map((item,index) => {
          return (
            <li
              key={index}  // React key for list items.
              className="list-group-item d-flex justify-content-between"> 
              <div>
                <p> name {item.name} </p>
                <p> number {item.phone} </p>
                <p> index {index} </p>
              </div>
              <button onClick={()=>deleteContact(index)} >Eliminar</button>
            </li>
          );
        })}
      </ul>
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
}; 