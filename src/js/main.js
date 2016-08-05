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
        if (_this.mobileNavOpen) {
            _this.closeMobileNav();
        }
        if (_this.$window.scrollTop() > $headerHalfHeight) {
            _this.$header.addClass('min-header');
        } else {
            _this.$header.removeClass('min-header');
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
        shouldScroll = function(id, targetY){
        // find the scroll relation to the target
        // and sort whether you need to move or not.
        var $window = $(window);
        return Math.abs($window.scrollTop() - targetY) > $window.height() * 0.5;
    },
        killEvent = function(e){
            e.stopPropagation();
            e.preventDefault();
        },
        scrubAttributes = function(e,scope){
            scope.targetSlide = getAttribute(e.target, 'data-target');
            scope.targetIndex = parseFloat(getAttribute(e.target, 'data-slide-index'));
        };

    (function (scope) {

        var idSelector,
            targetY;

        $('.hero .read-more').click(function (e) {
            scope.openSection($(e.target).data('target'));
        });

        $('section.story .section-close').click(function (e) {
            scope.closeSection($(e.target).data('target'));
        });

        $('.space-link').click(function (e) {

            idSelector = '#SpaceDetails';
            targetY = $(idSelector).offset().top;

            killEvent(e);
            scrubAttributes(e,scope);

            if (shouldScroll('#SpaceDetails', targetY)) {
                $('html, body').animate(
                    {
                        scrollTop: targetY - 80
                    }, 750);
            }

            $('#SpaceSlider').on('afterChange', function () {
                scope.openSection(scope.targetSlide);
            });

            $('#SpaceSlider').slick('slickGoTo', scope.targetIndex, true);

        });

        $('div.space-details .section-close').click(function (e) {
            scope.closeSection(getAttribute(e.target, 'data-target'));
        });

        $('.person-detail-link').click(function(e){

            idSelector = '#PeopleDetails';
            targetY = $(idSelector).offset().top;

            killEvent(e);
            scrubAttributes(e,scope);

            if (shouldScroll(idSelector, targetY)) {
                $('html, body').animate(
                    {
                        scrollTop: targetY - 80
                    }, 750);
            }

            $('#PeopleSlider').on('afterChange', function () {
                console.log('afterChange');
                scope.openSection(scope.targetSlide);
            });

            $('#PeopleSlider').slick('slickGoTo', scope.targetIndex, true);

            // find the bottom of the header:
            $('.content-panel-container').css('top', $('header').height());
            $('.content-panel').addClass('is-visible');
        });

        $('div.people-details .section-close').click(function (e) {
            console.log('BOOM');
            console.log(getAttribute(e.target,'data-target'));
            scope.closeSection(getAttribute(e.target, 'data-target'));
        });


    })(this);

    return this;
};

sgn.openSection = function (which, callback) {

    callback = callback || function(){};

    $(which).slideDown('slow', function(){
        $(window).trigger('resize').trigger('scroll');
        callback();
    });

};

sgn.closeSection = function (which, callback) {

    callback = callback || function(){};

    $(which).slideUp('slow', function(){
        $(window).trigger('resize').trigger('scroll');
        callback();
    });

};

sgn.resolveResize = function () {
    if (!this.mobileNavOpen) {
        return;
    } else {
        if (this.$window.width() > 899) {
            this.closeMobileNav();
        }
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

sgn.init = function () {

    var _this = window.sgn;

    _this
        .initNav()
        .sectionInit()
        .initSliders();

};

$(sgn.init);

