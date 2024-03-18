const{src, dest, watch, parallel} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//imagenes
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const cache= require("gulp-cache");
const avif= require("gulp-avif");

//css optimization
const cssnano= require("cssnano");
const autoprefixer= require("autoprefixer");
const postcss= require("gulp-postcss");
const sourcemap= require("gulp-sourcemaps");



function css(done){
    

  src("src/scss/**/*.scss") // identificar archivo SASS
  .pipe(sourcemap.init())
  .pipe( plumber())
  .pipe( sass() )       // Compilarlo
  .pipe(postcss([autoprefixer(),cssnano()]))
  .pipe(sourcemap.write("."))
  .pipe( dest("build/css") )  //Almacena en el disco duro

 done();
}


//javascrpit


function javascript(done){
  src("src/js/**/*.js")
  .pipe(dest("build/js"));
  
  done();
}



function dev(done){
    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", javascript)


    done();
}


//webp

function VersionWebp(done){
  
  const opciones ={
    quality:50
  };

  src("src/img/**/*.{png,jpg}")
  .pipe(webp(opciones))
  .pipe(dest("build/img"))
  
  done();
}

//image min

function imagenes(done){
  const opciones ={
    optimizationLevel:3
  }

  src("src/img/**/*.{png,jpg}")
  .pipe(cache( imagemin(opciones) ))
  .pipe( dest("build/img"))

  done();
}


//avif
function VersionAvif(done){
  
  const opciones ={
    quality:50
  };

  src("src/img/**/*.{png,jpg}")
  .pipe(avif(opciones))
  .pipe(dest("build/img"))
  
  done();
}

exports.css = css;
exports.js =javascript;
exports.VersionWebp = VersionWebp;
exports.imagenes = imagenes;
exports.VersionAvif = VersionAvif;
exports.dev = parallel( VersionAvif,imagenes, VersionWebp, javascript, dev);


