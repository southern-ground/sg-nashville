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