// const title = 'Kanojyo to Himitsu to Koimoyou';

// const axios = require('axios');

// const baseUrl = 'https://api.mangadex.org';

// async function getMangaId() {
//     try {
//         const resp = await axios({
//             method: 'GET',
//             url: `${baseUrl}/manga`,
//             params: {
//                 title: title
//             }
//         });

//         console.log(resp.data.data.map(manga => manga.id));
//     } catch (error) {
//         console.error('Error fetching manga:', error.message);
//     }
// }

// // Call the asynchronous function
// getMangaId();

const title = document.getElementById("searchInput").value;
const base_url = "https://api.mangadex.org";

fetch(`${base_url}/manga?title=${title}`)
  .then(response => response.json())
  .then(data => {
    const mangaIds = data.data.map(manga => manga.id);
    const link = `${base_url}/manga/${mangaIds[0]}`;
    console.log(data);
  })
  .catch(error => console.error(error));

  const mangaTitleLink = `${base_url}/manga/${mangaIds[0]}`;
  const coverLink = `${base_url}/cover/${coverArt[2]}`;
  
  // Fetch manga title details
  fetch(mangaTitleLink)
    .then(response => response.json())
    .then(mangaTitleData => {
      // Fetch cover details
      return fetch(coverLink)
        .then(response => response.json())
        .then(coverData => ({ mangaTitleData, coverData }));
    })
    .then(({ mangaTitleData, coverData }) => {
      // Extract cover image information
      const coverImgFileName = coverData.data.attributes.fileName;
      const base_CoverImg = `https://uploads.mangadex.org/covers/${mangaIds[0]}/${coverImgFileName}`;
  
      // Generate HTML page with cover image
      const htmlPage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${mangaTitleData.data.attributes.title}</title>
        </head>
        <body>
          <h1>${mangaTitleData.data.attributes.title}</h1>
          <img src="${base_CoverImg}" alt="Manga Cover">
        </body>
        </html>
      `;
  
      console.log(htmlPage);
    })
    .catch(error => console.error(error));
  