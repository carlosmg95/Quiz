// Definición del modelo Comments:
module.exports = function(sequelize, dataTypes) {
	return sequelize.define('Comment', { text: { type: dataTypes.STRING, validate : { notEmpty: { msg: 'Falta comentario' }}}});
};