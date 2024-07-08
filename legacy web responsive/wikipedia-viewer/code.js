const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const resultsList = document.querySelector('#results-list');

searchButton.addEventListener('click', searchWikipedia);

function searchWikipedia() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json`)
           .then(response => response.json())
           .then(data => {
                const results = data[1];
                const descriptions = data[2];
                const links = data[3];

                resultsList.innerHTML = '';

                for (let i = 0; i < results.length; i++) {
                    const result = results[i];
                    const description = descriptions[i];
                    const link = links[i];

                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <a href="${link}" target="_blank">
                            <h2>${result}</h2>
                            <p>${description}</p>
                        </a>
                    `;
                    resultsList.appendChild(listItem);
                }
            });
    }
}