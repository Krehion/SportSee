import Logo from "../../assets/logo.svg";

import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";

function Header() {
	const { userId } = useUser();

	return (
		<header className="header">
			<img src={Logo} alt="SportSee" />
			<nav>
				<ul>
					<li>
						<Link to="/">Accueil</Link>
					</li>
					<li>
						<Link to={`/user/${userId}`}>Profil</Link>
					</li>
					<li>
						<Link to="/settings">Réglages</Link>
					</li>
					<li>
						<Link to="/community">Communauté</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
