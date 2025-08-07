export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    contactos: [
      {
        name: "batman",
        phone: 1,
      },
       {
        name: "batman2",
        phone: 22,
      },
    ],
    contactos: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'delete_contacto':
      const { indexDelete } = action.payload
      console.log('Store delete contact'+ indexDelete)
      return {
        ...store,
          contactos: store.contactos.filter(  (contactos,index) => index != indexDelete)
      };
       case 'load_contacto':

      console.log('Store load contact')
      return {
        ...store,
          contactos: action.payload
      };
    default:
      throw Error('Unknown action.');
  }    
}
