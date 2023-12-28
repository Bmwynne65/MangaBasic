const title = 'Kanojyo to Himitsu to Koimoyou';

const axios = require('axios');

const baseUrl = 'https://api.mangadex.org';

async function getMangaId() {
    try {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/manga`,
            params: {
                title: title
            }
        });

        console.log(resp.data.data.map(manga => manga.id));
    } catch (error) {
        console.error('Error fetching manga:', error.message);
    }
}

// Call the asynchronous function
getMangaId();

GET /manga