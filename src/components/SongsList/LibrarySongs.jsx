import { FiSearch } from 'react-icons/fi'
import ActiveSong from './ActiveSong'
import { useState } from 'react'
import './SongsList.css'

const LibrarySongs = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
	// State to manage the search input
	const [searchSong, setSearchSong] = useState('')

	// Function to filter songs based on the search input
	const filteredSongs = songs => {
		if (searchSong) {
			return songs.filter(
				song =>
					song.name.toLowerCase().includes(searchSong.toLowerCase()) ||
					song.artist.toLowerCase().includes(searchSong.toLowerCase())
			)
		} else return songs // If no search input, return all songs
	}

	// JSX to render the LibrarySongs component UI
	return (
		<div className={`library-container ${libraryStatus && 'open'}`}>
			<h2 className='library-h1'>Library</h2>
			<div className='search-bar'>
				<FiSearch className='search-icon' />
				<input
					type='text'
					value={searchSong}
					onChange={e => setSearchSong(e.target.value)} // Update search state on input change
					placeholder='Search by song or author...'
					className='search-input'
				/>
			</div>
			{/* Display filtered songs or message if no results found */}
			<div className='library-copyright'>
				All Music promoted by <br></br>
				https://www.chosic.com/free-music/all/ <br></br>
				Creative Commons CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/
			</div>
			<div style={{ marginTop: 28 }}>
				{filteredSongs(songs).length === 0 ? (
					<p>No results found.</p> // Display message if no matching songs are found
				) : (
					<>
						{/* Map over the filtered songs and render each as an ActiveSong component */}
						{filteredSongs(songs).map(song => (
							<ActiveSong
								song={song}
								songs={songs}
								setCurrentSong={setCurrentSong}
								key={song.id}
								audioRef={audioRef}
								isPlaying={isPlaying}
								setSongs={setSongs}
							/>
						))}
					</>
				)}
			</div>
		</div>
	)
}

export default LibrarySongs
