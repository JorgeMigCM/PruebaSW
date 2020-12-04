// imports
importScripts('js/sw_utils.js');


const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    // '/',
    'index.html',
    'css/aos.css',
    'css/style.css',
    'images/lamba-png',
    'images/hero_1.jpg',
    'images/img_1jpg',
    'images/img_2.jpg',
    'images/img_3.jpg',
    'images/img_4.jpg',
    'images/img_5.jpg',
    'images/img_6.jpg',
    'images/about_1.jpg',
    'images/person_1.jpg',
    'images/person_2.jpg',
    'images/person_3.jpg',
    'images/person_4.jpg',
    'images/person_5.jpg',
    
    'js/jquery-3.3.1.min.js',
    'js/jquery-migrate-3.0.1.min.js',
    'js/jquery-ui.js',
    'js/popper.min.js',
    'js/bootstrap.min.js',
    'js/owl.carousel.min.js',
    'js/jquery.stellar.min.js',
    'js/jquery.countdown.min.js',
    'js/bootstrap-datepicker.min.js',
    'js/jquery.easing.1.3.js',
    'js/aos.js',
    'js/jquery.fancybox.min.js',
    'js/jquery.sticky.js',
    'js/typed.js',
    'js/main.js',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700,900',
    'fonts/icomoon/style.css'
];



self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});




self.addEventListener( 'fetch', e => {


    const respuesta = caches.match( e.request ).then( res => {

        if ( res ) {
            return res;
        } else {

            return fetch( e.request ).then( newRes => {

                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );

            });

        }

    });



    e.respondWith( respuesta );

});


