const Clarifai = require('clarifai');
const { json } = require('express/lib/response');
//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: 'a96aaf95d0fb4d0bbaf4e319582e4eaa'
 });

 const handleApiCall = (req, res) =>
 {
  app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL, req.body.input) 
    .then(data => {
      res.json(data);
    })
    .catch(err => res.satus(400).json('unable to work with API'))
 }
 
const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}