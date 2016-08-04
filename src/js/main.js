var sgn = window.sgn || {};

sgn.initNav = function () {

    console.log('initNav');

    var _this = this;

    $('.site-nav .nav-link').click(function (e) {
        _this.navLinkClick(e);
    });

    this.mobileNavOpen = false;

    var $headerHalfHeight = 128 * 0.5;

    this.$window = $(window);
    this.$header = $('header');

    this.$window.scroll(function () {
        if(_this.mobileNavOpen){
            _this.closeMobileNav();
        }
        if (_this.$window.scrollTop() > $headerHalfHeight) {
            _this.$header.addClass('min-header');
        } else {
            _this.$header.removeClass('min-header');
        }
    });

    this.$window.resize(function(){
        (function(scope){
            clearTimeout(scope.resizeTimeout);
            scope.resizeTimeout = setTimeout(function(){
                scope.resolveResize();
            }, 100);
        })(_this);
    });

    this.$hamburgerMenu = $('.hamburger-menu');

    this.$mobileSiteNav = $('.hamburger-menu .site-nav');
    this.$mobileSocialNav = $('.hamburger-menu .social-nav');

    this.$mobileSiteNav.fadeOut('fast');
    this.$mobileSocialNav.fadeOut('fast');

    this.$hamburgerButton = $('.hamburger-button');

    this.$hamburgerButton.click(function (e) {
        _this.hamburgerButtonClick(e);
    });

    return this;
};

sgn.resolveResize = function(){
    if(!this.mobileNavOpen){
        return;
    }else{
        if(this.$window.width() > 899){
            this.closeMobileNav();
        }
    }
};

sgn.initParallax = function () {
    console.log('initParallax');
    $("#Legacy-Slider").slick({
        // normal options...
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        prevArrow: $('#LegacyPrev'),
        nextArrow: $('#LegacyNext'),
        // the magic
        responsive: [{
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 660,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    return this;
};

sgn.hamburgerButtonClick = function () {
    this.mobileNavOpen = !this.mobileNavOpen;
    if (this.mobileNavOpen) {
        this.openMobileNav();
    } else {
        this.closeMobileNav();
    }
};

sgn.openMobileNav = function () {
    console.log('openMobileNav');
    (function(scope){
        scope.$mobileSiteNav.fadeIn('slow');
        scope.$mobileSocialNav.fadeIn('slow');
        scope.$hamburgerMenu.slideDown('slow', function(){
            scope.mobileNavOpen = true;
        });

    })(this);
};

sgn.closeMobileNav = function () {
    console.log('closeMobileNav');
    (function(scope){
        scope.$mobileSiteNav.fadeOut('fast');
        scope.$mobileSocialNav.fadeOut('fast');
        scope.$hamburgerMenu.slideUp('slow', function(){
            scope.mobileNavOpen = false;
        });
    })(this);
};

sgn.navLinkClick = function (e) {

    e.preventDefault();
    e.stopPropagation();

    if(this.mobileNavOpen){
        this.closeMobileNav();
    }

    var target = e.target.href.slice(e.target.href.indexOf('#')),
        newY = target === '#Home' ?
            0
            :
            $(target).offset().top - 60;

    $('html, body').animate({
        scrollTop: newY
    }, 750);

};

sgn.init = function () {

    var _this = window.sgn;

    _this.initNav().initParallax();

};

$(sgn.init);

