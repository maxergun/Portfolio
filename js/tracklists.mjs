import { MUSIC } from "./music-source.mjs"

document.addEventListener("DOMContentLoaded", function() {
    const ROOT_PATH = 'https://maxergun.github.io/assets/'

    const containerElem = document.getElementById('tracklistContainer')

    const MUSIC_PLAY_IMG_ID = 'icon-music'
    const _musicPlayImgActiveElem = document.getElementById('icon-music-active')

    let currentTracklistElem
    let currentTrackPlayImgElem

    function CreateTrackElement(src, fullName, trackImgSrc) {
        const trackElem = document.createElement("li")
        trackElem.className = 'mp3'

        const trackTitleElem = document.createElement("p")
        trackTitleElem.className = "mp3-title"
        trackTitleElem.innerHTML = fullName

        const trackIconImgElem = document.createElement("img")
        trackIconImgElem.id = MUSIC_PLAY_IMG_ID
        trackIconImgElem.src = "assets/icons/track.png"
        
        trackElem.appendChild(trackIconImgElem)
        trackElem.appendChild(trackTitleElem)
        currentTracklistElem.appendChild(trackElem)
        
        trackElem.addEventListener('click', function() {
            if (currentTrackPlayImgElem) {
                currentTrackPlayImgElem.src = "assets/icons/track.png"
            }
            trackIconImgElem.src = _musicPlayImgActiveElem.src
            currentTrackPlayImgElem = trackIconImgElem

            const setMusicEvent = new CustomEvent("setMusic", {detail: {
                url: src,
                title: fullName,
                img: trackImgSrc
            }})
            document.dispatchEvent(setMusicEvent) 
        })
    }

    for (const [arrayKey, array] of Object.entries(MUSIC)) {
        const tracklistElem = document.createElement('ol')
        tracklistElem.className = 'tracklist media-scroller'
    
        const tracklistRootDiv = document.createElement("div") 
        const tracklistTitleElem = document.createElement("header")
        tracklistTitleElem.innerHTML = '<h >' + arrayKey + '</h>'
        tracklistRootDiv.style = "display: grid;"

        tracklistRootDiv.appendChild(tracklistTitleElem)
        tracklistRootDiv.appendChild(tracklistElem)
        containerElem.appendChild(tracklistRootDiv)
        currentTracklistElem = tracklistElem

        const pathStart = ROOT_PATH + "music/" + arrayKey + "/"

        for (let index = 0; index < array.length; index++) {
            const data = array[index];
            const fileName = data[0]
            const trackImgSrc = data[1] ? ROOT_PATH + data[1] : undefined
            CreateTrackElement(pathStart + fileName, fileName.substring(0, fileName.length - 4), trackImgSrc)
        }

    }
})