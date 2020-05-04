const functions = require('firebase-functions');
const axios = require('axios');

exports.post = functions.https.onRequest(async (req, res) => {
  const API_BASE_URL = 'https://yy-tube.herokuapp.com';
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' },
  });
  // eslint-disable-next-line arrow-parens
  try {
    const [, , postId] = req.path.split('/');
    const response = await client.get(`/api/post_by_id/${postId}`);
    const { post } = response.data;
    const URL = 'https://yy-tube.com';
    res.set('Cache-Control', 'public, max-age=600, s-maxage=600');

    res.status(200).send(`<!doctype html>
    <head>
      <title>わいちゅーぶ | わいわいの動画共有SNS</title>
      <meta property="og:title" content="${post.title}">
      <meta property="og:image" content="${post.thumbnailUrl}">
      <meta property="og:description" content="${post.detail}">
      <meta property="og:url" content="${URL}">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="${post.title}">
      <meta name="twitter:site" content="${URL}">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:title" content="${post.title}">
      <meta name="twitter:image" content="${post.thumbnailUrl}">
      <meta name="twitter:description" content="${post.detail}">
      <meta property="fb:app_id" content="542260986317684" />
    </head>
    <body>
    <script type="text/javascript">window.location="/_post/${postId}";</script>
    </body>
  </html>`);
  } catch (err) {
    res.status(200).send(`<!doctype html>
    <head>
      <title>わいちゅーぶ | わいわいの動画共有SNS</title>

    </head>
    <body>
    ${err}
    </body>
  </html>`);
  }
});
