var path = require('path')

module.exports = {
    entry: './app/index.jsx',

    output: {
        // path:"./dist",
   	    filename: 'bundle.js'
  	},

    resolve: {
	    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
	    extensions: ['', '.web.js', '.js', '.json','.jsx'],
    },

    module: {
    	loaders:[
        	{
	            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
	            loader: 'babel',
	            exclude:/node_modules/,
	            query: {
	                presets: ['react', 'es2015'],
	                cacheDirectory: true,
                    plugins: [
                        ["import", {
                          "libraryName": "antd",
                          "style": true,   // or 'css'
                        }]
                    ]
	            }
    		},
    		{
    			test: /\.css$/, loader: 'style-loader!css-loader'
    		},
            {
                test: /\.less$/, loader: 'style-loader!css-loader!less-loader'
            },
	        {
	            test: /\.(jpg|png)$/,
	            loader: 'url?limit=25000'
	        }
  		],


    },
};
