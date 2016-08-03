$("#Legacy-Slider").slick({

    // normal options...
    infinite: true,
    slidesToShow: 3,
    // the magic
    responsive: [{

        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            infinite: true
        }

    }, {

        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            dots: true
        }

    }, {

        breakpoint: 300,

        settings: {
            slidesToShow: 1,
            dots: true
        }

    }]
});