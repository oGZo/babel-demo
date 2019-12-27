const { transfromAst } = require('./utils');
const result = transfromAst();
console.log(JSON.stringify(result, null, 2));