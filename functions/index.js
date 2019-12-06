const functions = require('firebase-functions');
const axios = require('axios');

exports.post = functions.https.onRequest(async (req, res) => {
  const API_BASE_URL = 'https://www.mooriii.com';
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' },
  });
  // eslint-disable-next-line arrow-parens
  const ress = client.get(`/api/post_by_id/${req.params.id}`);
  // const TITLE = '〇〇〇〇〇';
  // const DESCRIPTION = '〇〇〇〇〇';
  // const IMAGE = 'https://i.ytimg.com/vi/LYEgBWjXlEg/default.jpg';

  res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>

    </head>
    <body>
    <script type="text/javascript">window.location="/post/${req.params.id}";</script>
    </body>
  </html>`);
});
