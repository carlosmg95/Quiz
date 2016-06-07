var models = require('../models');
var Sequelize = require('sequelize');


// Autoload el comentario asociado a :commentId
exports.load = function(req, res, next, commentId) {
	models.Comment.findById(commentId).then(function(comment) {
		if(comment) {
			req.comment = comment;
			next();
		} else {
			next(new Error('No existe commentId=' + commentId));
		}
	}).catch(function(error) {
		next(error);
	});
};

// GET /quizzes/:quizId/comments/new
exports.new = function(req, res, next) {
	var comment = models.Comment.build({text: ''});
	res.render('comments/new', {comment: comment, quiz: req.quiz});
};

// POST /quizzes/:quizId/comments
exports.create = function(req, res, next) {
	var authorId = (req.session.user && req.session.user.id) || 0;

	var comment = models.Comment.build({ text: req.body.comment.text, QuizId: req.quiz.id, AuthorId: authorId });
	comment.save({ fields: ['text', 'QuizId', 'AuthorId'] }).then(function(comment) {
		req.flash('success', 'Comentario creado con éxito.');
		res.redirect('/quizzes/' + req.quiz.id);
	}).catch(Sequelize.ValidationError, function(error) {
		req.flash('error', 'Errores en el formulario.');
		for(var i in error.errors) {
			req.flash('error', error.errors[i].value);
		};
		res.render('comments/new', {comment: comment, quiz: req.quiz});
	}).catch(function(error) {
		req.flash('error', 'Error al crear un comentario: ' + error.message);
		next(error);
	});
};

// PUT /quizzes/:quizId/comments/:commentId/accept
exports.accept = function(req, res, next) {
	req.comment.accepted = true;

	req.comment.save(['accepted']).then(function(comment) {
		req.flash('success', 'Comentario aceptado con éxito.');
		res.redirect('/quizzes/' + req.params.quizId);
	}).catch(function(error) {
		req.flash('error', 'Error al aceptar un comentario: ' + error.message);
		next(error);
	});
};

// GET /comments
exports.listado = function(req, res, next) {
	models.Comment.findAll().then(function(comments) {
		res.render('comments', { comments: comments });
	});
};