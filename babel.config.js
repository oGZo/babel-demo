module.exports = function(api) {
    api.cache(true);
    return {
        plugins: [
            '@babel/syntax-bigint',
            ['@babel/transform-runtime', {
                // corejs: 3,
                // useESModules: true,
            }],
            '@babel/plugin-proposal-class-properties',
            require('./plugins/babel-plugin-a')
        ],
        presets: [
            // 'minify',
            ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3
            }],
            // require('./persets/babel-preset-a')
        ]
    }
}