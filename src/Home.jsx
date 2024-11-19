import { useState, useRef } from 'react'
import './Home.css'
import Player from './components/Player/Player'
import Song from './components/Song/Song'
import SongsList from './components/SongsList/SongsList'
import Navbar from './components/Navbar/Navbar'
import Lofi from './data'
import Logo from './components/Navbar/logo_transparent.png'

// Define the Home component which takes in several props
const Home = () => {
	const audioRef = useRef(null) // Creating a ref to control the audio element directly

	const [songs, setSongs] = useState(Lofi())
	const [favoriteSongs, setFavoriteSongs] = useState([])
	const [currentSong, setCurrentSong] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [libraryStatus, setLibraryStatus] = useState(false)
	const [favoriteStatus, setFavoriteStatus] = useState(false)
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	})

	// Function to handle time update when the song is playing
	const updateTimeHandler = e => {
		const currentTime = e.target.currentTime // Getting the current playback time of the song
		const duration = e.target.duration // Getting the total duration of the song
		setSongInfo({ ...songInfo, currentTime, duration }) // Updating the songInfo state with the new values
	}

	// Function to play a random song from the list
	const playRandomSong = () => {
		const randomIndex = Math.floor(Math.random() * songs.length) // Generate a random index from the songs array
		const randomSong = songs[randomIndex] // Select the song at the random index
		setCurrentSong(randomSong) // Set the random song as the current song

		// Update the state of all songs to mark the current song as active
		const updatedSongs = songs.map(
			song =>
				song.id === randomSong.id
					? { ...song, active: true } // Mark the random song as active
					: { ...song, active: false } // Mark all other songs as inactive
		)
		setSongs(updatedSongs) // Update the songs state with the modified list

		// Automatically plays song after title logo click
		setIsPlaying(true)
		if (audioRef.current) {
			audioRef.current.src = randomSong.audio
			audioRef.current.play()
		}
	}

	// JSX to render the LibrarySongs component UI
	return (
		<div className={`app-container ${(libraryStatus || favoriteStatus) && 'library-open'}`}>
			{currentSong && (
				<Navbar
					libraryStatus={libraryStatus}
					setLibraryStatus={setLibraryStatus}
					favoriteStatus={favoriteStatus}
					setFavoriteStatus={setFavoriteStatus}
				/>
			)}
			{/* Render Song component if there is current song */}
			{currentSong ? (
				<Song
					currentSong={currentSong}
					setLibraryStatus={setLibraryStatus}
					setFavoriteStatus={setFavoriteStatus}
					favoriteSongs={favoriteSongs}
					setFavoriteSongs={setFavoriteSongs}
				/>
			) : (
				<div className='song-container'>
					<button className='logo-button'>
						<img className='current-song-img-menu' src={Logo} alt='Logo' onClick={playRandomSong} />
					</button>
				</div>
			)}
			{/* Render Player component if there is current song */}
			{currentSong && (
				<Player
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					currentSong={currentSong}
					setCurrentSong={setCurrentSong}
					audioRef={audioRef}
					songInfo={songInfo}
					setSongInfo={setSongInfo}
					songs={songs}
					setSongs={setSongs}
				/>
			)}
			{/* Render the SongsList component to display the full list of songs */}
			<SongsList
				songs={songs}
				setCurrentSong={song => {
					setCurrentSong(song) // Set the selected song as the current song
					const updatedSongs = songs.map(s => (s.id === song.id ? { ...s, active: true } : { ...s, active: false })) // Mark selected song as active
					setSongs(updatedSongs)
					setIsPlaying(true) // Automatically start playing the selected song
					if (audioRef.current) {
						audioRef.current.play()
					}
				}}
				favoriteSongs={favoriteSongs}
				setFavoriteSongs={setFavoriteSongs}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
				favoriteStatus={favoriteStatus}
			/>
			{/* Conditionally render the audio element if there is a current song */}
			{currentSong && (
				<audio
					onLoadedMetadata={updateTimeHandler}
					onTimeUpdate={updateTimeHandler}
					ref={audioRef}
					src={currentSong ? currentSong.audio : ''}
				/>
			)}
		</div>
	)
}

export default Home
