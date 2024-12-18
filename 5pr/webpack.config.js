const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Импорт плагина
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Импорт плагина для извлечения CSS
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/scripts/index.js', // Входная точка для JavaScript
    output: {
        path: path.resolve(__dirname, 'dist'), // Директория для сборки
        filename: 'main.js', // Имя выходного файла
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Загрузка CSS файлов
                use: [
                    MiniCssExtractPlugin.loader, // Извлечение CSS в отдельный файл
                    'css-loader', // Загрузка и обработка CSS
                ],
            },
            {
                test: /\.(png|jpg|svg)$/, // Загрузка изображений
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]', // Путь для изображений
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, // Загрузка шрифтов
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]', // Путь для шрифтов
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Шаблон HTML
            filename: 'index.html',       // Выходной файл HTML
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css', // Имя выходного CSS файла
        }),
        new CleanWebpackPlugin(), // использовали плагин
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'), // Папка для сервера разработки
        port: 8080, // Порт для локального хостинга
        open: true, // Автоматическое открытие браузера
    },
    module: {
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            }
        ]
    }
};
