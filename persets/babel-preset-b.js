module.exports = function (api, options){
    console.log('preset-options-b', options);
    return {
        plugins: [
            require('../plugins/babel-plugin-d')
        ]
    }
}