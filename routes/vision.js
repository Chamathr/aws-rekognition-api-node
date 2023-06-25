var express = require('express');
var router = express.Router();
const { visionService } = require('../services/vision.service')

router.post('/classify', async function (req, res, next) {
  try {
    const rekognitionResponse = await visionService(req.files.file)
    /*Return the response as JSON response*/
    res.status(200).json({ labels: rekognitionResponse })
  }
  catch (error) {
    /*Return the error as JSON response*/
    res.status(500).json({ error })
  }
});

module.exports = router;
