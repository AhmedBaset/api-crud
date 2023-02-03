import logo from "./../assets/NinjaOneLogo.svg";

function Navbar() {
	return (
		<nav className="bg-dark p-2">
			<div className="container">
				<img className="h-8" src={logo} alt="ningaOne" />
			</div>
		</nav>
	);
}

export default Navbar;
