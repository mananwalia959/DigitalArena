var Insta = require('instamojo-nodejs');
Insta.setKeys(process.env.PAYMENT_API_KEY, process.env.PAYMENT_PRIVATE_AUTH_TOKEN);
Insta.isSandboxMode(true);

module.export = Insta;