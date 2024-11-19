import { FaMusic, FaRegHeart } from 'react-icons/fa'
import './Navbar.css'
import Logo from './logo_transparent.png'

// Define the Navbar component which takes in several props
const Navbar = ({ libraryStatus, setLibraryStatus, favoriteStatus, setFavoriteStatus }) => {
	return (
		<div className='nav-container'>
			<h1 className={`nav-logo ${!libraryStatus && !favoriteStatus && 'visible'}`}>
				<img src={Logo} width='100' height='100' />
			</h1>

			<div className='nav-buttons-flex'>
				<button
					className='nav-button'
					onClick={() => {
						setLibraryStatus(false)
						setFavoriteStatus(!favoriteStatus)
					}}>
					Favorites
					<FaRegHeart />
				</button>
				<button
					className='nav-button'
					onClick={() => {
						setFavoriteStatus(false)
						setLibraryStatus(!libraryStatus)
					}}>
					Library
					<FaMusic />
				</button>
			</div>
		</div>
	)
}

export default Navbar
