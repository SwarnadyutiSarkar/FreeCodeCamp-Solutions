const streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
const twitchApiUrl = 'https://twitch-proxy.freecodecamp.rocks/api/twitch/';
const streamersListElement = document.getElementById('streamers-list');

function getStreamerInfo(streamer) {
    const url = `${twitchApiUrl}streams/${streamer}`;
    fetch(url)
       .then(response => response.json())
       .then(data => {
            const streamerInfo = data.stream;
            const streamerElement = document.createElement('li');
            streamerElement.className = 'treamer';
            streamerElement.innerHTML = `
                <span class="streamer-name">${streamer}</span>
                <span class="streamer-status">${streamerInfo? 'Online' : 'Offline'}</span>
                <a class="streamer-link" href="https://twitch.tv/${streamer}" target="_blank">View Channel</a>
            `;
            if (streamerInfo) {
                streamerElement.innerHTML += `
                    <p>Streaming: ${streamerInfo.game}</p>
                    <p>Viewers: ${streamerInfo.viewers}</p>
                `;
            }
            streamersListElement.appendChild(streamerElement);
        });
}

streamers.forEach(streamer => getStreamerInfo(streamer));