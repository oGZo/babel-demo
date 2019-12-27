const babel = require('@babel/core');

function getOriginCode(){
    const fs = require('fs');
    const path = require('path');
    return fs.readFileSync(path.resolve(__dirname, './origin.js'));
}

function parser(){
    const result = babel.parseSync(getOriginCode());
    // console.log(JSON.stringify(result, null, 2));
    return result;
}
function transfromAst() {
    return babel.transformFromAstSync(parser(), getOriginCode(), {
        ast: true
    }).ast;
}

function transfrom() {
    return babel.transformSync(getOriginCode(), {
        ast: true
    });
}


function generatorCode() {
    const newAst = transfromAst();
    const newCode = babel.transformFromAstSync(newAst).code;
    return newCode;
}

module.exports = {
    parser,
    transfrom,
    transfromAst,
    getOriginCode,
    generatorCode,
}