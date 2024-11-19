import { FaVolumeMute, FaVolumeUp, FaAngleLeft, FaAngleRight, FaPlay, FaPause, FaRedo, FaRandom } from 'react-icons/fa'
import './Player.css'
import { useState, useEffect, useCallback } from 'react'

//Define Player component which takes in several props
const Player = ({ isPlaying, setIsPlaying, currentSong, setCurrentSong, audioRef, songInfo, setSongInfo, songs, setSongs }) => {
	//Local states (Volume 50%, Loop and RandomMode turned OFF on start and mute button)
	const [volume, setVolume] = useState(0.5)
	const [loop, setLoop] = useState(false)
	const [isMuted, setIsMuted] = useState(false)
	const [randomMode, setRandomMode] = useState(false)

	//Toggle loop with random mode disabling
	const toggleLoop = () => {
		setLoop(Loop => {
			const newLoopState = !Loop
			if (newLoopState) {
				setRandomMode(false) // Disable randomMode if loop is enabled
			}
			return newLoopState
		})
	}

	// Toggle random mode with loop disabling
	const toggleRandomMode = () => {
		setRandomMode(RandomMode => {
			const newRandomState = !RandomMode
			if (newRandomState) {
				setLoop(false) // Disable loop if randomMode is enabled
			}
			return newRandomState
		})
	}

	// Toggle mute
	const toggleMute = () => {
		setIsMuted(!isMuted)
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? volume : 0 // Set volume to 0 if muting, else restore previous volume
		}
	}

	//Volume handler
	const volumeHandler = e => {
		const newVolume = e.target.value / 100
		setVolume(newVolume)
		if (audioRef.current) {
			audioRef.current.volume = newVolume
		}
		// If the user adjusts the volume slider, unmute if it was muted
		if (isMuted) {
			setIsMuted(false)
		}
	}

	//Play and pause song
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause()
			setIsPlaying(false)
		} else {
			audioRef.current.play()
			setIsPlaying(true)
		}
	}

	//Time of song
	const getTime = time => {
		const minute = Math.floor(time / 60)
		const second = ('0' + Math.floor(time % 60)).slice(-2)
		return `${minute}:${second}`
	}

	//Time handler
	const dragHandler = e => {
		audioRef.current.currentTime = e.target.value
		setSongInfo({ ...songInfo, currentTime: e.target.value })
	}

	//Activation of song from library
	const activeLibraryHandler = useCallback(
		newSong => {
			const newSongs = songs.map(song => ({
				...song,
				active: song.id === newSong.id,
			}))
			setSongs(newSongs)
		},
		[songs, setSongs]
	)

	//Skip song to random / forward / back
	const skipTrackHandler = useCallback(
		async direction => {
			let currentIndex = songs.findIndex(song => song.id === currentSong.id)

			if (randomMode) {
				const randomIndex = Math.floor(Math.random() * songs.length)
				const randomSong = songs[randomIndex]
				await setCurrentSong(randomSong)
				activeLibraryHandler(randomSong)
			} else if (direction === 'skip-forward') {
				const nextIndex = (currentIndex + 1) % songs.length
				await setCurrentSong(songs[nextIndex])
				activeLibraryHandler(songs[nextIndex])
			} else if (direction === 'skip-back') {
				const prevIndex = (currentIndex - 1 + songs.length) % songs.length
				await setCurrentSong(songs[prevIndex])
				activeLibraryHandler(songs[prevIndex])
			}

			if (isPlaying) audioRef.current.play()
		},
		[songs, currentSong, setCurrentSong, isPlaying, audioRef, activeLibraryHandler, randomMode]
	)

	//Ending of song - should it play next and it starts from start depends if it has enabled loop or random mode, if loop is activated then random doesnt work
	useEffect(() => {
		const audioElement = audioRef.current
		const handleSongEnd = () => {
			if (loop) {
				audioElement.currentTime = 0
				audioElement.play()
			} else if (randomMode) {
				const randomIndex = Math.floor(Math.random() * songs.length)
				const randomSong = songs[randomIndex]
				setCurrentSong(randomSong)
				activeLibraryHandler(randomSong)
				if (isPlaying) audioElement.play()
			} else {
				skipTrackHandler('skip-forward')
			}
		}

		audioElement.addEventListener('ended', handleSongEnd)
		return () => {
			audioElement.removeEventListener('ended', handleSongEnd)
		}
	}, [
		songs,
		currentSong,
		isPlaying,
		loop,
		audioRef,
		skipTrackHandler,
		randomMode,
		setCurrentSong,
		activeLibraryHandler,
	])

	//If "is playing" is ON then it starts next song
	useEffect(() => {
		if (isPlaying) {
			audioRef.current.play()
		}
	}, [currentSong, isPlaying, audioRef])

	return (
		<div className='player-container'>
			<div className='time-control-container'>
				<p>{getTime(songInfo.currentTime || 0)}</p>
				<div
					className='track'
					style={{
						background: `linear-gradient(to right, black, #9bd3f4)`,
					}}>
					<input
						onChange={dragHandler}
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type='range'
					/>
					<div
						className='animate-track'
						style={{
							transform: `translateX(${Math.round((songInfo.currentTime * 100) / songInfo.duration)}%)`,
						}}></div>
				</div>
				<p>{getTime(songInfo.duration || 0)}</p>
			</div>

			<div className='volume-control-container'>
				{isMuted ? (
					<FaVolumeMute className='volume-icon' onClick={toggleMute} />
				) : (
					<FaVolumeUp className='volume-icon' onClick={toggleMute} />
				)}
				<input
					type='range'
					min={0}
					max={100}
					value={isMuted ? 0 : volume * 100}
					onChange={volumeHandler}
					className='volume-slider'
				/>
			</div>

			<div className='play-control-container'>
				<FaRedo className={`loop-btn ${loop ? 'active' : ''}`} onClick={toggleLoop} />
				<FaAngleLeft className='skip-back' onClick={() => skipTrackHandler('skip-back')} />
				<div onClick={playSongHandler}>
					{isPlaying ? <FaPause className='play-pause' /> : <FaPlay className='play-pause' />}
				</div>
				<FaAngleRight className='skip-forward' onClick={() => skipTrackHandler('skip-forward')} />
				<FaRandom className={`random-btn ${randomMode ? 'active' : ''}`} onClick={toggleRandomMode} />
			</div>
		</div>
	)
}

export default Player
