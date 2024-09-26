document.addEventListener("DOMContentLoaded", function() {
    const PATH = 'https://api.github.com/repos/maxergun/maxergun.github.io/contents/assets/audio/'
    const PLAY_BTN_IMG = 'https://api.github.com/repos/maxergun/maxergun.github.io/contents/assets/img/pic.png'
    const TOKEN = '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'
    const containerElem = document.getElementById("tracklist-container")
    let currentTracklistElem

    function CreateTrackElement(data) {
        const fullName = data.name
        const trackName = fullName.substring(0, fullName.length - 4)
        const trackElem = document.createElement("li")
        trackElem.className = 'mp3'

        const nameElem = document.createElement("p")
        nameElem.innerHTML = trackName

        const playbtnElem = document.createElement("img")
        playbtnElem.src = PLAY_BTN_IMG

        trackElem.appendChild(playbtnElem)
        trackElem.appendChild(nameElem)
        currentTracklistElem.appendChild(trackElem)
    }

    function InitAudioFolder(url) {
        const headers = 
        fetch(url, {headers: {
            Authorization: 'token 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' 
        }})
        .then(response => response.json()) 
        .then(data => {
            const tracklistElem = document.createElement('ul')
                tracklistElem.className = 'tracklist'
                containerElem.appendChild(tracklistElem)
                currentTracklistElem = tracklistElem
                data.forEach(item => {
                    if (item.type == 'file' && item.name.endsWith(".mp3")) {
                        CreateTrackElement(item)
                    }
                })
            }).catch(error => console.error('Error fetching files:', error))
    }

    InitAudioFolder(PATH + 'crawlyard')

    // const music = fetch(musicPath)

})