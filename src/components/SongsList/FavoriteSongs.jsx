import ActiveSong from './ActiveSong'
import './SongsList.css'

//Define FavoriteSongs component which takes in several props
const FavoriteSongs = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, favoriteStatus }) => {
	// JSX to render the FavoriteSongs component UI
	return (
		<div className={`library-container ${favoriteStatus && 'open'}`}>
			<h2 className='library-h1'>Favorites</h2>
			<div style={{ marginTop: 45 }}>
				{songs.length === 0 ? (
					<p className='fav-song-marg'>No Favorite songs</p>
				) : (
					<>
						{/* Map over the favorite songs and render each as an ActiveSong component */}
						{songs.map(song => (
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

export default FavoriteSongs
