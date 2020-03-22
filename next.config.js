const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[folder]_[local]_[hash:base64:5]",
    },
    webpack: (config, {dev}) => {
        config.module.rules.push(
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: 'react-svg-loader'
            }
        );

        Object.assign(config.resolve.alias, {
            Consts: path.resolve(__dirname, 'consts'),
            Components: path.resolve(__dirname, 'components'),
            Helpers: path.resolve(__dirname, 'helpers'),
            Hooks: path.resolve(__dirname, 'hooks'),
            Sass: path.resolve(__dirname, 'static/sass'),
            Svg: path.resolve(__dirname, 'static/svg'),
        });

        return config;
    }

});