var crypto = require('crypto');

// Definición de la clase User:
module.exports = function(sequelize, DataTypes) {
	return sequelize.define(	'User',
								{	username: {
										type: DataTypes.STRING,
										unique: true,
										validate: {notEmpty: {msg: 'Falta username'}}
									},
									password: {
										type: DataTypes.STRING,
										validate: {notEmpty: {msg: 'Falta password'}},
										set: function(password) {
											// String aleatorio usado como salt
											this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
											this.setDataValue = ('password', encrytpPassword(password, this.salt));
										}
									},
									salt: {
										type: DataTypes.STRING
									},
									isAdmin: {
										type: DataTypes.BOOLEAN,
										defaultValue: false
									}
								});
};

/*
 *	Encripta un password en claro.
 *	Mezcla un password en claro con el salt proporcionado, ejecuta un SHA1 digest,
 *	y devuelve 40 caracteres hexadecimales.
 */
function encrytpPassword(password, salt) {
	return crypto.createHmac('sha1', salt).update(password).digest('hex');
};