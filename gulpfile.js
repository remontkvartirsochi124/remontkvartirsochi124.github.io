var gulp       = require('gulp'), // Подключаем Gulp
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'app/resources/js/jquery.min.js',
        'app/resources/js/call.js',
        'app/resources/js/vendor/modernizr.js',
        'app/resources/js/vendor/jquery.js',
        'app/resources/js/vendor/fastclick.js',
        'app/resources/js/foundation/foundation.js',
        'app/resources/js/foundation/foundation.orbit.js',
        'app/resources/js/call.js', 
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/resources/js')); // Выгружаем в папку app/js
});

gulp.task('css-libs', function() {
    return gulp.src('app/resources/less/**/*.css') // Выбираем файл для минификации
        .pipe(cssnano({discardUnused: false})) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/resources/css/')); // Выгружаем в папку app/css
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/resources/css/**/*.css', browserSync.reload); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/resources/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('images', function() {
    return gulp.src('app/resources/images/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/resources/images')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'images', 'scripts'], function() {

    var buildCss = gulp.src('app/resources/css/**/*')
    .pipe(gulp.dest('dist/resources/css'))

    var buildFonts = gulp.src('app/resources/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/resources/fonts'))

    var buildJs = gulp.src('app/resources/js/libs.min.js') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/resources/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));
    
    var buildSeo = gulp.src([ // Переносим SEO файлы в продакшен
	    'app/robots.txt',
	    'app/sitemap.xml',
	    'app/favicon.ico'
    ]) 
    .pipe(gulp.dest('dist'));    
    
    var buildFonts = gulp.src('app/resources/uploads/**/*') // Переносим файлы
    .pipe(gulp.dest('dist/resources/uploads'))
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);