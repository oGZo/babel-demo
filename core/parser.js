const { parser } = require('./utils');

const result = parser();
console.log(JSON.stringify(result, null, 2));
