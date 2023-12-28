const axios = require('axios');

const baseUrl = 'https://api.mangadex.org';

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    searchManga();
});

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

    const title = 'Kanojyo to Himitsu to Koimoyou';

    console.log(resp.data.data.map(manga => manga.id));
    // Get the first manga ID from the search result
    const mangaId = searchResp.data.data[0].id;

    // Make a request to get the manga feed
    const feedResp = await axios({
        method: 'GET',
        url: `${baseUrl}/manga/${mangaId}/feed`
    });

    // Create a new HTML page with the chapters
    createChapterPage(searchInput, feedResp.data.data);
}

function createChapterPage(mangaTitle, chapters) {
    const htmlContent = generateHTMLContent(mangaTitle, chapters);

    // Create a new HTML page
    const newPage = window.open('');
    newPage.document.write(htmlContent);
}

function generateHTMLContent(mangaTitle, chapters) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${mangaTitle} Chapters</title>
        </head>
        <body>
            <h1>${mangaTitle} Chapters</h1>
            <div id="chapterContainer" class="chapter-container">
                ${generateChapterCards(chapters)}
            </div>
        </body>
        </html>
    `;
}

function generateChapterCards(chapters) {
    return chapters.map(chapter => `
        <div class="chapter-card">
            <p>${chapter.attributes.title}</p>
        </div>
    `).join('');
}
