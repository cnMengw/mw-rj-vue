module.exports = {
    plugins: [
        require('postcss-px2rem-exclude')({ remUnit: 75, exclude: /node_modules|xdf-picker/i }), // 换算的基数,
        require('autoprefixer')({
            overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
        })
    ]
};
