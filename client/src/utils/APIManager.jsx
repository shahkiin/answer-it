import superagent from 'superagent';
import Auth from '../modules/Auth';

export default {

	get: (url, params, callback) => {

		superagent
		.get(url)
		.query(params)
		.set('Accept', 'application/json')
		.set('Authorization', `bearer ${Auth.getToken()}`)
		.end((err, response) => {

			if (err) {

				callback(err, null);
				console.error('Error: ' + err);
				return;
			}

			const confirmation = response.body.confirmation;

			if (confirmation !== 'success') {

				callback({

					message: response.body.message
				}, null);

				return;
			}

			callback(null, response.body);
		});
	},

	post: (url, body, callback) => {
		
		superagent
		.post(url)
		.send(body)
		.set('Accept', 'application/json')
		.set('Authorization', `bearer ${Auth.getToken()}`)
		.end((err, response) => {
			
			if (err) {

				callback(err, response);
				return;
			}

			const confirmation = response.body.confirmation;

			if (confirmation !== 'success') {

				callback({

					message: response.body.message
				}, null);

				return;
			}

			callback(null, response.body);
		});
	}
}