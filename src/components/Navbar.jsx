import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container justify-content-end">
				<div className="ml-auto">
					<Link to="/addContact">
						<button className="btn btn-success">Agregar contacto</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};