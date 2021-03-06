const crypto = require('crypto');

module.exports = {
	encrypt: async (password) => {
		return new Promise(async (resolve, reject) => {
			try {
				const salt = (await crypto.randomBytes(32)).toString('hex');
				crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
					if(err) throw err;
					const hashed = derivedKey.toString('hex');
					resolve({salt,hashed});
				});
			} catch (err) {
				console.log(err);
				reject(err);
			}
		})
	},
	
	encryptWithSalt: async (password, salt) => {
		return new Promise(async (resolve, reject) => {
			try {
				crypto.pbkdf2(password, salt, 1, 32, 'sha512', (err, derivedKey) => {
					if(err) throw err;
					const hashed = derivedKey.toString('hex');
					resolve(hashed);
				});
			} catch (err) {
				console.log(err);
				reject(err);
			}
		})
	}
}