import { NavLink } from "react-router-dom"
import "../MainNavigation/navbar.css"
function Index (){
  function closeMobileMenu() {
    console.log('');
  }

  function login() {
    console.log('Iniciar sesion clicked');
  }

	return(
		<div className='buttons'>
		<li className='nav-buttonC'>
			<NavLink
				to={'/login'}
				className={({ isActive }) =>
					'nav-links' + (isActive ? ' activated' : '')
				}
			>
				<button className='btn-header-a'>Login</button>
			</NavLink>
		</li>
		<li className='nav-button'>
			<NavLink
				to={'/register'}
				className={({ isActive }) =>
					'nav-links' + (isActive ? ' activated' : '')
				}
			>
				<button onClick={login} className='btn-header'>
					Sign Up
				</button>
			</NavLink>
		</li>
	</div>
	)

	

}

export default Index