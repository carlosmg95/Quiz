var models = require('../models');

// GET /question
exports.question = function(req, res, next) {
	models.Quiz.findOne().then(function(quiz) {	// Busca la primera pregunta existente
		if (quiz) {
			var answer = req.query.answer || '';
			res.render('quizzes/question', {question: quiz.question, answer: answer});
		} else {
			throw new Error('No hay preguntas en la BBDD.');
		}
	}).catch(function(error) {
		next(error);
	});
};


// GET /check
exports.check = function(req, res, next) {
	models.Quiz.findOne().then(function(quiz) {	// Busca la primera pregunta existente
		if (quiz) {
			var answer = req.query.answer || "";
			var result = (answer === quiz.answer) ? 'Correcta' : 'Incorrecta';
			res.render('quizzes/result', { result: result, answer: answer });
	    } else {
	    	throw new Error('No hay preguntas en la BBDD.');
	    }
	}).catch(function(error) {
		next(error);
	});
};