document.addEventListener("DOMContentLoaded", function() {
    const PATH = 'https://api.github.com/repos/maxergun/maxergun.github.io/contents/assets/audio/'

    const containerElem = document.getElementById('tracklistContainer')

    const MUSIC_PLAY_IMG_ID = 'icon-music'
    const _musicPlayImgElem = document.getElementById(MUSIC_PLAY_IMG_ID)
    const _musicPlayImgActiveElem = document.getElementById('icon-music-active')

    let currentTracklistElem
    let currentTrackPlayImgElem

    function CreateTrackElement(data) {
        const fullName = data.name
        const trackName = fullName.substring(0, fullName.length - 4)

        const trackElem = document.createElement("li")
        trackElem.className = 'mp3'

        const nameElem = document.createElement("p")
        nameElem.innerHTML = trackName

        const playImgElem = document.createElement("img")
        _musicPlayImgElem.id = MUSIC_PLAY_IMG_ID

        playImgElem.src = _musicPlayImgElem.src
        
        trackElem.appendChild(playImgElem)
        trackElem.appendChild(nameElem)
        currentTracklistElem.appendChild(trackElem)
        
        trackElem.addEventListener('click', function() {
            if (currentTrackPlayImgElem) {
                currentTrackPlayImgElem.src = _musicPlayImgElem.src
            }
            playImgElem.src = _musicPlayImgActiveElem.src
            currentTrackPlayImgElem = playImgElem

            const setMusicEvent = new CustomEvent("setMusic", {detail: {
                url: data.download_url,
                title: trackName
            }})
            setMusicEvent.isTrusted = true
            setMusicEvent.target
            document.dispatchEvent(setMusicEvent) 
        })
    }

    function InitAudioFolder(url, title, bgElemId) {
        fetch(url, {headers: {
            Authorization: 'token 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' 
        }})
        .then(response => response.json()) 
        .then(data => {
            const tracklistElem = document.createElement('ol')
            tracklistElem.className = 'tracklist media-scroller'

            const div = document.createElement("div")
            const titleElem = document.createElement("header")
            div.appendChild(titleElem)
            div.appendChild(tracklistElem)
            titleElem.innerHTML = '<h text-align: center; style="color: black" width: 100%>' + title + '</h>'
            div.style = "display: grid;"
            
            containerElem.appendChild(div)
            currentTracklistElem = tracklistElem
            data.forEach(item => {
                if (item.type == 'file' && item.name.endsWith(".mp3")) {
                    CreateTrackElement(item)
                }
            })
            }).catch(error => console.error('Error fetching files:', error))
    }

    InitAudioFolder(PATH + 'rock', "Rock")
    InitAudioFolder(PATH + 'electronic', "Electronic")
    InitAudioFolder(PATH + 'synthpop', "Synthpop")
    InitAudioFolder(PATH + 'scifi', "Scifi")
    InitAudioFolder(PATH + 'orchestral', "Orchestral")

    // const music = fetch(musicPath)

})