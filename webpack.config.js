var path = require('path')

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app'); //__dirname 中的src目录，以此类推
module.exports = {
    // entry: './app/index.jsx',
    entry: './app/antdTest.jsx',

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
                    presets: ['react', 'es2015','stage-0'],
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
    			test: /\.css$/,
                exclude: /^node_modules$/,
                include: [APP_PATH],
                loader: 'style-loader!css-loader'
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
