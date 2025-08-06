import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

    function deleteContact(index){
    console.log('delete' + index);
    dispatch({type: 'delete_contacto',
      payload: {indexDelete: index}
    })
	 }

	 useEffect( ()=>{  
		console.log('cargo')
	 	let contactosIniciales = [      {
        name: "batmanGomw",
        phone: 1,
      }, 
		      {
        name: "batmanHome2",
        phone: 1,
      }]
	  fetch('https://playground.4geeks.com/contact/agendas/Batman/contacts')
	  .then((res)=> res.json())
	  .then((data)=> console.log(data.contactos))
	  dispatch({type: 'load_contacto',
      payload: {favoritos: contactosIniciales}
    })
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