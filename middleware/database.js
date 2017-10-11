const mongose = require('mongose');
const moment = require('moment');
const option = require('../config/options');
const fs = require('fs');

const database = app => {
	mongose.set('debug', true);

	mongose.connect(option.mongodb);

	mongose.connection.on('disconnected', () => {
		mongose.connect(option.mongodb);
	});

	mongose.connection.on('error', err => {
		app.logger.error(err);
	});

	mongose.connection.on('open', async => {
		app.logger.debug('db connected on ' + option.mongodb);
	})
};

