module.exports = function (api, options){
    console.log('preset-options-a', options);
    return {
        plugins: [
            require('../plugins/babel-plugin-c')
        ]
    }
}