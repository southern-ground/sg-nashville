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

    // console.log('initNav');

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

    // console.log('initSections');

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

    // console.log('initSliders');

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

    $('.spaceSlider').each(function (index, el) {

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

sgn.initBookingsForm = function (){

    $('#BookingsForm').on('submit', this.validateBookingForm);

    return this;
};

sgn.instagramPostClick = function(e){
    var getPostURL = function(el){
        if(el.hasAttribute('data-post-url')){
            return el.getAttribute('data-post-url');
        }
        return getPostURL(el.parentNode);
    };
    window.open(getPostURL(e.target));
};

sgn.updateSocial = function(data){

    var NUM_POSTS = 8,
        POST_TEMPLATE = '<div class="col-xs-12 col-sm-3 col-lg-3 instagram-post" data-post-url="%%postLink%%">' +
            '<div class="instagram-post-details">' +
            '   <div class="instagram-post-date">%%postDate%%</div>' +
            '   <div class="instagram-post-likes">%%postLikeCount%% like%%pluralLikes%%</div>' +
            '</div>' +
            '<img class="instagram-post-image" src="%%postImageURL%%" alt="%%shortCaption%%" />' +
            '</div>';

    var post, postDate, postDateString,
        shortenCaption = function(str){
            var MAX_LENGTH = 40,
                abstract;

            abstract = str.length > MAX_LENGTH ? str.substr(0, MAX_LENGTH - 3) + "..." : str;
            return abstract;
        },
        html = ''; // '<div class="row no-gutter">';

    for (var i = 0; i < NUM_POSTS; i++) {

        post = data[i];

        console.log(post);

        postDate = new Date(post.caption.created_time * 1000);

        postDateString = (postDate.getMonth() + 1 ) + "/" +
            postDate.getDate() + "/" +
            postDate.getFullYear();

        html += POST_TEMPLATE;

        var shortCaption = shortenCaption(post.caption.text);

        html = html.replace('%%postLink%%', post.link)
            .replace('%%postDate%%', postDateString)
            .replace('%%postLikeCount%%', post.likes.count)
            .replace('%%postImageURL%%', post.images.thumbnail.url)
            .replace('%%postText%%', post.caption.text)
            .replace('%%shortCaption%%', shortCaption);

        html = post.likes.count === 1 ? html.replace('%%pluralLikes%%', '') : html.replace('%%pluralLikes%%', 's');

        if(i%2){
            // html += '</div><div class="row no-gutter">';
        }

    }

    html += '</div>';

    $('#instagram').append(html);

    (function(scope){
        $('.instagram-post').on('click', function(e){
            scope.instagramPostClick(e);
        });
    })(this);

};

sgn.initSocial = function () {
    var scope = this;
    $.ajax({
        dataType: "json",
        url: "instagramfeed.php",
        success: function (e) {
            console.warn('Successfully navigated Instagram; retrieving ' + e.data.length + ' posts.');
            scope.updateSocial(e.data);
        },
        error: function () {
            console.warn('Error accessing Instagram; using fallback data');
            var data = [
                {
                    attribution: null,
                    tags: [
                        "peachesandcreamcorn",
                        "balljars",
                        "getitwhilethegettinsgood",
                        "stockpile",
                        "inseason",
                        "studiomama",
                        "summertime",
                        "okra"
                    ],
                    type: "image",
                    location: {
                        latitude: 36.1525993,
                        name: "Southern Ground Nashville",
                        longitude: -86.79319,
                        id: 826255866
                    },
                    comments: {
                        count: 7
                    },
                    filter: "Clarendon",
                    created_time: "1470171914",
                    link: "https://www.instagram.com/p/BInuoVrAegJ/",
                    likes: {
                        count: 71
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13686988_273245359698341_1212523440_n.jpg?ig_cache_key=MTMwODIxOTI5ODk2MzEyMjE4NQ%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13686988_273245359698341_1212523440_n.jpg?ig_cache_key=MTMwODIxOTI5ODk2MzEyMjE4NQ%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13686988_273245359698341_1212523440_n.jpg?ig_cache_key=MTMwODIxOTI5ODk2MzEyMjE4NQ%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [ ],
                    caption: {
                        created_time: "1470171914",
                        text: "2 dozen ears of #peachesandcreamcorn 20 lbs red and green #okra bound for #StudioMama 's freezer! Then there's all the other bits that go in #balljars !! #summertime #inseason #getitwhilethegettinsgood #stockpile @yeti",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17853119233071024"
                    },
                    user_has_liked: false,
                    id: "1308219298963122185_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                },
                {
                    attribution: null,
                    tags: [
                        "isittooearlyforwine",
                        "tgif",
                        "southernground",
                        "keepingitinthezamily"
                    ],
                    type: "image",
                    location: null,
                    comments: {
                        count: 3
                    },
                    filter: "Juno",
                    created_time: "1469804658",
                    link: "https://www.instagram.com/p/BIcyJPAg5sO/",
                    likes: {
                        count: 48
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13734284_1727535074151862_319622664_n.jpg?ig_cache_key=MTMwNTEzODUyODk0NjE5OTMxMA%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13734284_1727535074151862_319622664_n.jpg?ig_cache_key=MTMwNTEzODUyODk0NjE5OTMxMA%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13734284_1727535074151862_319622664_n.jpg?ig_cache_key=MTMwNTEzODUyODk0NjE5OTMxMA%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [ ],
                    caption: {
                        created_time: "1469804658",
                        text: "Super excited about our new house wines!! @zalexanderbrown #southernground #keepingitinthezamily #TGIF #isittooearlyforwine",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17850058615097937"
                    },
                    user_has_liked: false,
                    id: "1305138528946199310_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                },
                {
                    attribution: null,
                    tags: [
                        "puzzles",
                        "sonichighways",
                        "toybox",
                        "8",
                        "tractorlights",
                        "legos"
                    ],
                    type: "image",
                    location: {
                        latitude: 36.1525993,
                        name: "Southern Ground Nashville",
                        longitude: -86.79319,
                        id: 826255866
                    },
                    comments: {
                        count: 1
                    },
                    filter: "Clarendon",
                    created_time: "1468182089",
                    link: "https://www.instagram.com/p/BHsbVwlgbFX/",
                    likes: {
                        count: 43
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13671315_1614089425587336_1287333033_n.jpg?ig_cache_key=MTI5MTUyNzQzNTY4MjE2NTA3OQ%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13671315_1614089425587336_1287333033_n.jpg?ig_cache_key=MTI5MTUyNzQzNTY4MjE2NTA3OQ%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13671315_1614089425587336_1287333033_n.jpg?ig_cache_key=MTI5MTUyNzQzNTY4MjE2NTA3OQ%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [ ],
                    caption: {
                        created_time: "1468182089",
                        text: "What's in YOUR #toybox ? #puzzles #Legos #tractorlights #sonichighways #8 @foofighters @oaknashville",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17850906598074662"
                    },
                    user_has_liked: false,
                    id: "1291527435682165079_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                },
                {
                    attribution: null,
                    tags: [
                        "corn",
                        "localproduce",
                        "studiomama",
                        "stickitinthefridge",
                        "summertime"
                    ],
                    type: "image",
                    location: null,
                    comments: {
                        count: 2
                    },
                    filter: "Lark",
                    created_time: "1467755078",
                    link: "https://www.instagram.com/p/BHfs4UjAN9d/",
                    likes: {
                        count: 74
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13628141_274276456265807_348276077_n.jpg?ig_cache_key=MTI4Nzk0NTQwMjg1MDUzMzIxMw%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13628141_274276456265807_348276077_n.jpg?ig_cache_key=MTI4Nzk0NTQwMjg1MDUzMzIxMw%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13628141_274276456265807_348276077_n.jpg?ig_cache_key=MTI4Nzk0NTQwMjg1MDUzMzIxMw%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [ ],
                    caption: {
                        created_time: "1467755078",
                        text: "When the fridge isn't big enough to hold the corn, @yeti saves the day! #StudioMama #summertime #stickitinthefridge #corn #localproduce @freshlocalnashville",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17858122063028174"
                    },
                    user_has_liked: false,
                    id: "1287945402850533213_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                },
                {
                    attribution: null,
                    tags: [
                        "itsreallyverygood",
                        "goinggoinggone"
                    ],
                    type: "image",
                    location: {
                        latitude: 36.1525993,
                        name: "Southern Ground Nashville",
                        longitude: -86.79319,
                        id: 826255866
                    },
                    comments: {
                        count: 1
                    },
                    filter: "Clarendon",
                    created_time: "1467747365",
                    link: "https://www.instagram.com/p/BHfeK1XAmVt/",
                    likes: {
                        count: 31
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13561651_616359051874834_1700217489_n.jpg?ig_cache_key=MTI4Nzg4MDcwNDMzNTcwMTM1Nw%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13561651_616359051874834_1700217489_n.jpg?ig_cache_key=MTI4Nzg4MDcwNDMzNTcwMTM1Nw%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13561651_616359051874834_1700217489_n.jpg?ig_cache_key=MTI4Nzg4MDcwNDMzNTcwMTM1Nw%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [ ],
                    caption: {
                        created_time: "1467747365",
                        text: "Dangerously close to running out of the good stuff. @helpgoodspread #itsreallyverygood #goinggoinggone",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17849168725097815"
                    },
                    user_has_liked: false,
                    id: "1287880704335701357_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                },
                {
                    attribution: null,
                    tags: [ ],
                    type: "image",
                    location: {
                        latitude: 36.1525993,
                        name: "Southern Ground Nashville",
                        longitude: -86.79319,
                        id: 826255866
                    },
                    comments: {
                        count: 1
                    },
                    filter: "Clarendon",
                    created_time: "1465575550",
                    link: "https://www.instagram.com/p/BGevwtiTS3Q/",
                    likes: {
                        count: 48
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13414179_1317907661572381_1687381499_n.jpg?ig_cache_key=MTI2OTY2MjIwMDU3OTgyOTIwMA%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13414179_1317907661572381_1687381499_n.jpg?ig_cache_key=MTI2OTY2MjIwMDU3OTgyOTIwMA%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13414179_1317907661572381_1687381499_n.jpg?ig_cache_key=MTI2OTY2MjIwMDU3OTgyOTIwMA%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [ ],
                    caption: {
                        created_time: "1465575550",
                        text: "Takin shots and kicking ass @juicenashville @zacbrownband @garagecoffeeco",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17857122508058864"
                    },
                    user_has_liked: false,
                    id: "1269662200579829200_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                },
                {
                    attribution: null,
                    tags: [
                        "wearegettingsticksandcoal",
                        "santaclaus",
                        "merrychristmas",
                        "christmasinjuly"
                    ],
                    type: "image",
                    location: null,
                    comments: {
                        count: 0
                    },
                    filter: "Perpetua",
                    created_time: "1465226842",
                    link: "https://www.instagram.com/p/BGUWpyqzSyX/",
                    likes: {
                        count: 37
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13398958_804422863028216_1934736967_n.jpg?ig_cache_key=MTI2NjczNzAyNDEyNDkyMzAzMQ%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13398958_804422863028216_1934736967_n.jpg?ig_cache_key=MTI2NjczNzAyNDEyNDkyMzAzMQ%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13398958_804422863028216_1934736967_n.jpg?ig_cache_key=MTI2NjczNzAyNDEyNDkyMzAzMQ%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [ ],
                    caption: {
                        created_time: "1465226842",
                        text: "It's not even July yet! #merrychristmas #christmasinjuly #santaclaus #wearegettingsticksandcoal",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17848077853095565"
                    },
                    user_has_liked: false,
                    id: "1266737024124923031_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                },
                {
                    attribution: null,
                    tags: [
                        "wishbone",
                        "roastedchicken",
                        "wthdoesthatevenmean",
                        "jollybarmyardchicken",
                        "makeawish"
                    ],
                    type: "image",
                    location: {
                        latitude: 36.1525993,
                        name: "Southern Ground Nashville",
                        longitude: -86.79319,
                        id: 826255866
                    },
                    comments: {
                        count: 4
                    },
                    filter: "Slumber",
                    created_time: "1464894052",
                    link: "https://www.instagram.com/p/BGKb59zzS6x/",
                    likes: {
                        count: 53
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13267522_1713264992276854_1829315467_n.jpg?ig_cache_key=MTI2Mzk0NTM3NjA2NDE1NTMxMw%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13267522_1713264992276854_1829315467_n.jpg?ig_cache_key=MTI2Mzk0NTM3NjA2NDE1NTMxMw%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13267522_1713264992276854_1829315467_n.jpg?ig_cache_key=MTI2Mzk0NTM3NjA2NDE1NTMxMw%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [ ],
                    caption: {
                        created_time: "1464894052",
                        text: "If wishes were horses, we'd all ride. #wthdoesthatevenmean #jollybarmyardchicken #roastedchicken #makeawish #wishbone",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17847952855117137"
                    },
                    user_has_liked: false,
                    id: "1263945376064155313_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                },
                {
                    attribution: null,
                    tags: [
                        "dependable"
                    ],
                    type: "image",
                    location: {
                        latitude: 36.1525993,
                        name: "Southern Ground Nashville",
                        longitude: -86.79319,
                        id: 826255866
                    },
                    comments: {
                        count: 0
                    },
                    filter: "Clarendon",
                    created_time: "1464381331",
                    link: "https://www.instagram.com/p/BF7J9_2TS3K/",
                    likes: {
                        count: 38
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13259033_535329443336618_1984043256_n.jpg?ig_cache_key=MTI1OTY0NDM2MzY0MzYyOTAwMg%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13259033_535329443336618_1984043256_n.jpg?ig_cache_key=MTI1OTY0NDM2MzY0MzYyOTAwMg%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13259033_535329443336618_1984043256_n.jpg?ig_cache_key=MTI1OTY0NDM2MzY0MzYyOTAwMg%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [
                        {
                            position: {
                                y: 0.8859375,
                                x: 0.3546875
                            },
                            user: {
                                username: "yeti",
                                profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11849116_1474848886168498_1019803630_a.jpg",
                                id: "196891753",
                                full_name: "YETI Coolers"
                            }
                        }
                    ],
                    caption: {
                        created_time: "1464381331",
                        text: "When the ice maker craps out, the @yeti is still super #dependable! @rsanchez512",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17857045150057489"
                    },
                    user_has_liked: false,
                    id: "1259644363643629002_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                },
                {
                    attribution: null,
                    tags: [
                        "allthedairy",
                        "butterplease",
                        "lemonthyme",
                        "glutenful",
                        "sourcream",
                        "blueberrygalette",
                        "piecrust",
                        "studiomama"
                    ],
                    type: "image",
                    location: {
                        latitude: 36.1525993,
                        name: "Southern Ground Nashville",
                        longitude: -86.79319,
                        id: 826255866
                    },
                    comments: {
                        count: 5
                    },
                    filter: "Lark",
                    created_time: "1464367816",
                    link: "https://www.instagram.com/p/BF6wMP2TS07/",
                    likes: {
                        count: 52
                    },
                    images: {
                        low_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/13266765_1316137858414138_1704691754_n.jpg?ig_cache_key=MTI1OTUzMDk5MzY4Njg4MzY0Mw%3D%3D.2",
                            width: 320,
                            height: 320
                        },
                        thumbnail: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/13266765_1316137858414138_1704691754_n.jpg?ig_cache_key=MTI1OTUzMDk5MzY4Njg4MzY0Mw%3D%3D.2",
                            width: 150,
                            height: 150
                        },
                        standard_resolution: {
                            url: "https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13266765_1316137858414138_1704691754_n.jpg?ig_cache_key=MTI1OTUzMDk5MzY4Njg4MzY0Mw%3D%3D.2",
                            width: 640,
                            height: 640
                        }
                    },
                    users_in_photo: [ ],
                    caption: {
                        created_time: "1464367816",
                        text: "#StudioMama is redeeming herself from this week's vegan, gluten-free mayhem. #allthedairy #butterplease #blueberrygalette with #lemonthyme #sourcream #glutenFUL #piecrust",
                        from: {
                            username: "southerngroundnashville_",
                            profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                            id: "789619938",
                            full_name: "Southern Ground Nashville 🎤🎯"
                        },
                        id: "17847792640088578"
                    },
                    user_has_liked: false,
                    id: "1259530993686883643_789619938",
                    user: {
                        username: "southerngroundnashville_",
                        profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/11024104_818399908254695_406715924_a.jpg",
                        id: "789619938",
                        full_name: "Southern Ground Nashville 🎤🎯"
                    }
                }
            ];
            scope.updateSocial(data);
        }
    });
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

    // console.log('resolveResize');

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
    // console.log('openMobileNav');
    (function (scope) {
        scope.$mobileSiteNav.fadeIn('slow');
        scope.$mobileSocialNav.fadeIn('slow');
        scope.$hamburgerMenu.slideDown('slow', function () {
            scope.mobileNavOpen = true;
        });

    })(this);
};

sgn.closeMobileNav = function () {
    // console.log('closeMobileNav');
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

        // Post! console.log('Proceeding with:\n\rName: ' + formName + "\n\rVenue: " + formVenue + "\n\reMail: " + formEmail + "\n\rMessage: " + formText);

        $.post("contact.php", {
            name: formName,
            venue: formVenue,
            email: formEmail,
            message: formText
        }).done(function (data) {
            if (data) {
                if (data.error === 0) {
                    // console.warn("Form submitted successfully");
                    $('#BookingsForm').find('.success-text').html('Form submitted successfully. Someone will be in touch soon!');
                    $('#BookingsForm').find('input[type=text], textarea').val('');
                } else {
                    $('#BookingsForm').find('.error-text').html('Something went wrong. Please try again. (Error code ' + data.error + '.)');
                }
            }
        }).error(function (e) {
            console.warn("Form Error: " + e.status, e.statusText);
            $('#BookingsForm').find('.error-text').html('Something went wrong. Please try again. (Error code ' + e.status + '.)');
        });

    }

    return false;

};

sgn.isEmpty = function (str) {
    return this.removeTags(str).length > 0;
};

sgn.isValidEmail = function (str) {
    str = this.removeTags(str);
    // console.log('isValidEmail', str);
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
        .initBookingsForm()
        .initSocial();

};

$(sgn.init);

