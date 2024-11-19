import './SongsList.css'

//Define AtiveSong component which takes in several props
const ActiveSong = ({ song, setCurrentSong, audioRef, isPlaying, songs, setSongs }) => {
	// Function to handle selecting a song
	const songSelectHandler = async () => {
		await setCurrentSong(song) // Set the selected song as the current song
		const curSong = song // Store the currently selected song
		const songList = songs // Store the list of all songs

		// Update the list of songs to mark the current song as active
		const newSongs = songList.map(song => {
			if (song.id === curSong.id) {
				return {
					...song,
					active: true, // Set the selected song as active
				}
			} else {
				return {
					...song,
					active: false, // Set all other songs as inactive
				}
			}
		})
		setSongs(newSongs) // Update the state with the new list of songs

		// Check if the song is playing and play the selected song
		if (isPlaying) {
			audioRef.current.play()
		}
	}

	// JSX to render the ActiveSong component UI
	return (
		<div
			className={`library-song-container ${song.active && 'active'}`} // Conditionally apply the 'active' class if the song is currently active
			onClick={songSelectHandler}>
			<img className='library-img' src={song.cover} alt={song.name} />
			<div>
				<h3 className='library-h1'>{song.name}</h3>
				<h4 className='library-h2'>{song.artist}</h4>
				<br></br>
				<h5 className='library-h3'>{song.source}</h5>
			</div>
		</div>
	)
}

export default ActiveSong
