//	Definicion del modelo Quiz:
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Quiz',
						{	question: { type: DataTypes.STRING,
						  			    validate: {notEmpty: {msg: 'Falta pregunta'}}
						    },
						    answer: { type: DataTypes.STRING,
						   			  validate: {notEmpty: {msg: 'Falta respuesta'}}
						   	}
						});
};