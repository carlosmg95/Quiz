var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ dest: './uploads/' });

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

/* GET author page. */
router.get('/author', function(req, res, next) {
	res.render('author');
});

/* Autoload de parámetros */
router.param('quizId',		quizController.load);	// Autoload :quizId 
router.param('userId',		userController.load);	// Autoload :userId
router.param('commentId',	commentController.load);	// Autoload :commentId

/* Definición de rutas de quizzes */
router.get('/quizzes.:format?',					quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?',	quizController.show);
router.get('/quizzes/:quizId(\\d+)/check',		quizController.check);
router.get('/quizzes/new',						sessionController.loginRequired,
												quizController.new);
router.post('/quizzes', 						sessionController.loginRequired,
												upload.single('image'),
												quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',		sessionController.loginRequired,
												quizController.ownershipRequired,
												quizController.edit);
router.put('/quizzes/:quizId(\\d+)',			sessionController.loginRequired,
												quizController.ownershipRequired,
												upload.single('image'),
												quizController.update);
router.delete('/quizzes/:quizId(\\d+)',			sessionController.loginRequired,
												quizController.ownershipRequired,
												quizController.destroy);

/* Definición de rutas de comments */
router.get('/quizzes/:quizId(\\d+)/comments/new',						sessionController.loginRequired,
																		commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments', 							sessionController.loginRequired,
																		commentController.create);
router.put('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/accept',	sessionController.loginRequired,
																		quizController.ownershipRequired,
																		commentController.accept);

/* Definición de rutas de usuarios */
router.get('/users',					userController.index);	// Listado de usuarios
router.get('/users/:userId(\\d+)',		userController.show);	// Ver un usuario
router.get('/users/new',				userController.new);	// Formulario sign-up
router.post('/users',					userController.create);	// Registrar usuario
router.get('/users/:userId(\\d+)/edit',	sessionController.loginRequired,
										sessionController.adminOrMyselfRequired,
										userController.edit);	// Editar cuenta
router.put('/users/:userId(\\d+)',		sessionController.loginRequired,
										sessionController.adminOrMyselfRequired,
										userController.update);	// Actualizar cuenta
router.delete('/users/:userId(\\d+)',	sessionController.loginRequired,
										sessionController.adminAndNotMyselfRequired,
										userController.destroy);	// Borrar cuenta

/* Definición de rutas de sesión */
router.get('/session',		sessionController.new);	// Formulario login
router.post('/session',		sessionController.create);	// Crear sesión
router.delete('/session',	sessionController.destroy);	// Destruir sesión

module.exports = router;