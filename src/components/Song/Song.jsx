import { FaRegHeart, FaHeart } from 'react-icons/fa6'
import './Song.css'

//Define Song component which takes in several props
const Song = ({ currentSong, favoriteSongs, setFavoriteSongs }) => {
	// Check if the current song is already in the list of favorite songs
	const isFavorite = favoriteSongs.some(song => song.id === currentSong.id)

	// Event handler for adding/removing the current song to/from favorites
	const addToFavoriteHandler = () => {
		if (isFavorite) {
			// If the song is already in favorites, remove it from the list
			setFavoriteSongs(favoriteSongs.filter(song => song.id !== currentSong.id))
		} else {
			// If the song is not in favorites, add it to the list
			setFavoriteSongs([...favoriteSongs, currentSong])
		}
	}

	// JSX to render the Song component UI
	return (
		<div className='song-container'>
			<img className='current-song-img' src={currentSong.cover} alt={currentSong.name} />
			<h2 className='current-song-h1'>{currentSong.name}</h2>
			<h3 className='current-song-h2'>{currentSong.artist}</h3>
			<button className={`add-to-fav-button ${isFavorite ? 'favorited' : ''}`} onClick={addToFavoriteHandler}>
				{isFavorite ? 'Favorited' : 'Add to favorite'}
				{isFavorite ? <FaHeart /> : <FaRegHeart />}
			</button>
		</div>
	)
}

export default Song
