const axios = require('axios');

const baseUrl = 'https://api.mangadex.org';

async function searchManga() {
    const searchInput = document.getElementById('searchInput').value;

    // Make a request to search for manga by title
    const searchResp = await axios({
        method: 'GET',
        url: `${baseUrl}/manga`,
        params: {
            title: searchInput
        }
    });

    // Get the first manga ID from the search result
    const mangaId = searchResp.data.data[0].id;

    // Make a request to get the manga feed
    const feedResp = await axios({
        method: 'GET',
        url: `${baseUrl}/manga/${mangaId}/feed`
    });

    // Display chapters in a stacked card
    displayChapters(feedResp.data.data);
}

function displayChapters(chapters) {
    const chapterContainer = document.getElementById('chapterContainer');
    chapterContainer.innerHTML = ''; // Clear previous content

    chapters.forEach(chapter => {
        const card = document.createElement('div');
        card.classList.add('chapter-card');
        card.innerHTML = `<p>${chapter.attributes.title}</p>`;
        chapterContainer.appendChild(card);
    });
}
