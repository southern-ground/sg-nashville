var sgn = window.sgn || {},
    ScrollMagic = window.ScrollMagic || {},
    Linear = window.Linear || {};

sgn.initNav = function () {

    console.log('initNav');

    var _this = this;

    $('.site-nav .nav-link').click(function (e) {
        _this.navLinkClick(e);
    });

    this.mobileNavOpen = false;

    var $headerHalfHeight = 128 * 0.5;

    this.$window = $(window);
    this.$header = $('header, div.header-spacer');
    this.$headerSpacer = $('.header-spacer');

    this.$window.scroll(function () {
        if (_this.mobileNavOpen) {
            _this.closeMobileNav();
        }
        if (_this.$window.scrollTop() > $headerHalfHeight) {
            _this.$header.addClass('min-header');
            _this.$headerSpacer.addClass('min-header');
        } else {
            _this.$header.removeClass('min-header');
            _this.$headerSpacer.removeClass('min-header');
        }
    });

    this.$window.resize(function () {
        (function (scope) {
            clearTimeout(scope.resizeTimeout);
            scope.resizeTimeout = setTimeout(function () {
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

sgn.sectionInit = function () {

    console.log('sectionInit');

    var getAttribute = function (target, attr) {
            while (target) {
                var attribute = target.attributes.getNamedItem(attr);
                if (attribute) {
                    return target.getAttribute(attr);
                } else {
                    target = target.parentNode;
                }
            }
            return null;
        },
        killEvent = function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        scrubAttributes = function (e, scope) {
            scope.target = getAttribute(e.target, 'data-target');
            scope.targetIndex = parseFloat(getAttribute(e.target, 'data-slide-index'));
        };

    (function (scope) {

        // Bind up the close button:
        $('.content-panel').on('click', function(event){
            if( $(event.target).is('.content-panel') || $(event.target).is('.content-panel-close') ) {
                scope.closeContentPanel();
                event.preventDefault();
            }
        });

        $('.hero .read-more').click(function (e) {
            killEvent(e);
            scope.openSection($(e.target).data('target'));
        });

        $('.space-link').click(function (e) {

            killEvent(e);
            scrubAttributes(e, scope);

            $('#SpaceSlider').on('afterChange', function () {
                scope.openSection(scope.target);
            });

            $('#SpaceSlider').slick('slickGoTo', scope.targetIndex, true);

        });

        $('.person-detail-link').click(function (e) {

            killEvent(e);
            scrubAttributes(e, scope);

            $('#PeopleSlider').on('afterChange', function () {
                scope.openSection(scope.target);
            });

            $('#PeopleSlider').slick('slickGoTo', scope.targetIndex, true);

        });

    })(this);

    return this;
};

sgn.openSection = function (which, callback) {

    callback = callback || function () {};

    this.resizeOverlay();

    $('.content-panel').addClass('is-visible');

    $(which).fadeIn();

    $(window).trigger('resize').trigger('scroll');

    callback();

    this.overlayIsOpen = true;

    $('html body').addClass('no-scroll');

};

sgn.closeContentPanel = function(){
    $('.additional-content').fadeOut();
    $('.content-panel').removeClass('is-visible');
    this.overlayIsOpen = false;
    $('html body').removeClass('no-scroll');
};

sgn.resizeOverlay = function(){
    $('.content-panel-container').css('top', $('header').innerHeight() + 40);
};

sgn.resolveResize = function () {

    console.log('resolveResize');

    if (!this.mobileNavOpen) {
        return;
    } else {
        if (this.$window.width() > 899) {
            this.closeMobileNav();
        }
    }
    if(this.overlayIsOpen){
        this.resizeOverlay();
    }

};

sgn.initSliders = function () {
    console.log('initSliders');
    $("#Legacy-Slider").slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        prevArrow: $('#LegacyPrev'),
        nextArrow: $('#LegacyNext'),
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

    $("#SpaceSlider").slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: $('#SpaceSliderPrev'),
        nextArrow: $('#SpaceSliderNext'),

        centerMode: true,
        variableWidth: true,

        lazyLoad: 'ondemand',
        fadeIn: true
    });

    $("#PeopleSlider").slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: $('#PeoplePrev'),
        nextArrow: $('#PeopleNext'),

        centerMode: true,
        variableWidth: true,

        lazyLoad: 'ondemand',
        fadeIn: true
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
    (function (scope) {
        scope.$mobileSiteNav.fadeIn('slow');
        scope.$mobileSocialNav.fadeIn('slow');
        scope.$hamburgerMenu.slideDown('slow', function () {
            scope.mobileNavOpen = true;
        });

    })(this);
};

sgn.closeMobileNav = function () {
    console.log('closeMobileNav');
    (function (scope) {
        scope.$mobileSiteNav.fadeOut('fast');
        scope.$mobileSocialNav.fadeOut('fast');
        scope.$hamburgerMenu.slideUp('slow', function () {
            scope.mobileNavOpen = false;
        });
    })(this);
};

sgn.navLinkClick = function (e) {

    e.preventDefault();
    e.stopPropagation();

    if (this.mobileNavOpen) {
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

sgn.monitorTwitterLoad = function(){

    /*
    Since the Twitter timeline is an iframe
    it's of an indeterminate length. It's loading
    also cannot be monitored because of iframe.

    This section of script waits for the iframe to appear
    then removes itself and, after a half a second, trigger
    a re-draw/resize/scroll event to keep the parallax
    do-hingys happy.
     */
    (function(scope){
        scope.twitterInterval = setInterval(function(){

            var twitterFrame = 'iframe#twitter-widget-0',
                $iframe = $(twitterFrame);

            if($iframe.length > 0){
                clearInterval(scope.twitterInterval);
                setTimeout(function(){
                    $(window).trigger('resize').trigger('scroll');
                }, 500);

            }
        }, 0);
    })(this);

    return this;
};

sgn.parallaxInit = function(){

    // init controller
    var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

    // build scenes
    new ScrollMagic.Scene({triggerElement: "#parallax1"})
        .setTween("#parallax1 > div", {y: "80%", ease: Linear.easeNone})
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#parallax2"})
        .setTween("#parallax2 > div", {y: "80%", ease: Linear.easeNone})
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#parallax3"})
        .setTween("#parallax3 > div", {y: "80%", ease: Linear.easeNone})
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#parallax4"})
        .setTween("#parallax4 > div", {y: "80%", ease: Linear.easeNone})
        .addTo(controller);

    new ScrollMagic.Scene({triggerElement: "#parallax5"})
        .setTween("#parallax5 > div", {y: "80%", ease: Linear.easeNone})
        .addTo(controller);


    return this;
};

sgn.init = function () {
    var _this = window.sgn;
    _this
        .initNav()
        .sectionInit()
        .initSliders()
        .monitorTwitterLoad()
        .parallaxInit();

    /*$('#FixedOverlay').on('touchmove scroll wheel', function(e){
        console.log('scrolling me, bitches', e);
        e.stopPropagation();
        e.preventDefault();
    });*/
};

$(sgn.init);

