/**
 * Created by fst on 8/12/16.
 */
var sgn = window.sgn || {},
    ScrollMagic = window.ScrollMagic || {},
    Linear = window.Linear || {};

sgn.gearInit = function(){
    console.log(this);
    this.gearInitParallax();
    return this;
};
sgn.gearInitParallax = function(){
    // init controller
    var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

    // build scenes
    new ScrollMagic.Scene({triggerElement: "#parallax1"})
        .setTween("#parallax1 > div", {y: "80%", ease: Linear.easeNone})
        .addTo(controller);

    return this;
};

$(sgn.gearInit());