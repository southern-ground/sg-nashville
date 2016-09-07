var sgn = window.sgn || {},
    ScrollMagic = window.ScrollMagic || {},
    Linear = window.Linear || {};

sgn.initProps = function () {

    this.$window = $(window);
    this.$hamburgerButton = $('.hamburger-button');
    this.$hamburgerMenu = $('.hamburger-menu');
    this.$mobileSiteNav = $('.hamburger-menu .site-nav');
    this.$mobileSocialNav = $('.hamburger-menu .social-nav');

    this.mobileNavOpen = false;

    return this;
};

sgn.initNav = function () {

    console.log('initNav');

    var _this = this;

    $('.site-nav .nav-link').click(function (e) {
        _this.navLinkClick(e);
    });

    this.$window.scroll(function () {
        if (_this.mobileNavOpen) {
            _this.closeMobileNav();
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

    this.$mobileSiteNav.fadeOut('fast');
    this.$mobileSocialNav.fadeOut('fast');

    this.$hamburgerButton.click(function (e) {
        _this.hamburgerButtonClick(e);
    });

    return this;
};

sgn.initSections = function () {

    console.log('initSections');

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
        $('.content-panel').on('click', function (event) {
            if ($(event.target).is('.content-panel') || $(event.target).is('.content-panel-close')) {
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

            $('.spaceSlider_container').hide();

            $('#Space_' + scope.targetIndex).show();

            var $slider = $('#SpaceSlider_' + scope.targetIndex);

            $slider.on('afterChange', function () {
                scope.openSection(scope.target);
            });

            $slider.slick('slickGoTo', 0, true);

        });

        $('.person-detail-link').click(function (e) {

            killEvent(e);
            scrubAttributes(e, scope);

            $('#PeopleSlider').on('afterChange', function () {
                scope.openSection(scope.target);
            });

            $('#PeopleSlider').slick('slickGoTo', scope.targetIndex, true);

        });

        $('#FixedOverlay section').fadeOut();

    })(this);

    return this;
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

    var counter = 0;

    $('.spaceSlider').each(function(index,el){

        console.log('HOT COCK');
        console.log($('#SpaceSliderPrev_' + counter));

        $(el).slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            prevArrow: $('#SpaceSliderPrev_' + counter),
            nextArrow: $('#SpaceSliderNext_' + counter),
            variableWidth: true,
            adaptiveHeight: true,
            fadeIn: true,
            centerMode: true,
            centerPadding: '60px'
        });

        counter++;
    });

   /* $(".spaceSlider").slick({
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
    });*/

    $("#PeopleSlider").slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: $('#PeopleSliderPrev'),
        nextArrow: $('#PeopleSliderNext'),
        centerMode: true,
        variableWidth: true,
        adaptiveHeight: true,
        lazyLoad: 'ondemand',
        fadeIn: true
    });

    return this;
};

sgn.initParallax = function () {

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

sgn.initBookingsForm = function () {

    $('#BookingsForm').on('submit', this.validateBookingForm);

    return this;
};

sgn.openSection = function (which, callback) {

    callback = callback || function () {
            // Nothing
        };

    this.overlayIsOpen = true;

    $('html body').addClass('no-scroll');

    $(which).fadeIn('fast');

    $('.content-panel').fadeIn();

    callback();

};

sgn.closeContentPanel = function () {
    $('html body').removeClass('no-scroll');
    $('.content-panel, .additional-content').fadeOut('fast');
    // $('.content-panel').removeClass('is-visible');
    this.overlayIsOpen = false;
    // $('.additional-content').fadeOut('fast');
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
    if (this.overlayIsOpen) {
        this.resizeOverlay();
    }

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

sgn.validateBookingForm = function () {

    var form = document.forms.Bookings;

    var validateEmail = function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        sanitizeField = function (html) {

            var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

            var tagOrComment = new RegExp(
                '<(?:' +
                '!--(?:(?:-*[^->])*--+|-?)' +
                '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*' +
                '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*' +
                '|/?[a-z]' +
                tagBody +
                ')>',
                'gi');

            var oldHtml;

            do {
                oldHtml = html;
                html = html.replace(tagOrComment, '');
            } while (html !== oldHtml);

            return html.replace(/</g, '&lt;');
        };

    var formName = sanitizeField(form['bookings-name'].value).trim(),
        formVenue = sanitizeField(form['bookings-venue'].value).trim(),
        formEmail = sanitizeField(form['bookings-email'].value).trim(),
        formText = sanitizeField(form['bookings-text'].value).trim();

    var isError = false;

    var showError = function (name) {
        $('[name=' + name + ']').addClass('form-error');
    };

    // Clear any previous errors:
    $('#BookingsForm').find('*').removeClass('form-error');
    $('#BookingsForm').find('.error-text, .success-text').html('');

    if (formName.length === 0) {
        showError('bookings-name');
        isError = true;
    }

    if (formVenue.length === 0) {
        // Nothing; it's OK for this to be blank.
    }

    if (!validateEmail(formEmail)) {
        showError('bookings-email');
        isError = true;
    }

    if (formText.length === 0) {
        showError('bookings-text');
        isError = true;
    }

    if (isError) {
        $('#BookingsForm').find('.error-text').html('Please address the above errors and try again.');
    } else {
        // Post!
        console.log('Proceeding with:\n\rName: ' + formName + "\n\rVenue: " + formVenue + "\n\reMail: " + formEmail + "\n\rMessage: " + formText);

        $.post("contact.php", {
            name: formName,
            venue: formVenue,
            email: formEmail,
            message: formText
        }).done(function (data) {
            if(data){
                if(data.error === 0){
                    console.warn("Form submitted successfully");
                    $('#BookingsForm').find('.success-text').html('Form submitted successfully. Someone will be in touch soon!');
                    $('#BookingsForm').find('input[type=text], textarea').val('');
                }else{
                    $('#BookingsForm').find('.error-text').html('Something went wrong. Please try again. (Error code '+data.error+'.)');
                }
            }
        }).error(function(e){
            console.warn("Form Error: " + e.status, e.statusText);
            $('#BookingsForm').find('.error-text').html('Something went wrong. Please try again. (Error code '+e.status+'.)');
        });
    }

    return false;

};

sgn.isEmpty = function (str) {
    return this.removeTags(str).length > 0;
};

sgn.isValidEmail = function (str) {
    str = this.removeTags(str);
    console.log('isValidEmail', str);
    return false;
};

sgn.init = function () {

    var _this = window.sgn;

    _this
        .initProps()
        .initNav()
        .initSections()
        .initSliders()
        .initParallax()
        .initBookingsForm();

};

$(sgn.init);

