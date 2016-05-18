var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Quiz' });
});

router.get('/question', quizController.question);
router.get('/check', quizController.check);

module.exports = router;
