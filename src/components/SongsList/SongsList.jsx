import FavoriteSongs from './FavoriteSongs'
import LibrarySongs from './LibrarySongs'
import './SongsList.css'

const SongsList = ({
	songs,
	setCurrentSong,
	favoriteSongs,
	setFavoriteSongs,
	audioRef,
	isPlaying,
	setSongs,
	libraryStatus,
	favoriteStatus,
}) => {
	// JSX to render either the library or favorite songs list based on status
	return (
		<div>
			{libraryStatus ? (
				// If the library is open, render LibrarySongs component
				<LibrarySongs
					songs={songs}
					setCurrentSong={setCurrentSong}
					audioRef={audioRef}
					isPlaying={isPlaying}
					setSongs={setSongs}
					libraryStatus={libraryStatus}
				/>
			) : (
				// If the library is not open, render FavoriteSongs component
				<FavoriteSongs
					songs={favoriteSongs}
					setCurrentSong={setCurrentSong}
					audioRef={audioRef}
					isPlaying={isPlaying}
					setSongs={setFavoriteSongs}
					favoriteStatus={favoriteStatus}
				/>
			)}
		</div>
	)
}

export default SongsList
