$(function() {

    $(".js-mainbar li a").each(function() {
        var link = $(this).attr('href');
        var path = document.location.pathname;

        if (path === '/') {
            $('.js-mainbar li a[href="/"]').parent('li').addClass('current');
        } else if (path === '/jobs') {
            $('.js-mainbar li a[href="/about"]').parent('li').addClass('current');
        } else if (path.indexOf(link) !== -1 && link !== '/' && link !== '/jobs') {
            $(this).parent('li').addClass('current');
        }
    });

    var support3DTransform = false;
    var attribute;
    for (attribute in $("body")[0].style) {
        if (attribute.toLowerCase().indexOf("perspective") !== -1 && attribute.toLowerCase().indexOf("webkit") === -1) {
            support3DTransform = true;
            $(".js-popup-box").addClass("popup-rotate-init");
            break;
        }
    }

    $(".js-popup, .js-popup-close").on("click", function(event) {
        var target = event.target || event.srcElement;
        if (target !== $(this)[0]){ return false;}

        var self = $(this);
        if ($(this).parents(".js-popup").length !== 0) {self = $(this).parents(".js-popup");}

        if (support3DTransform) {
            self.children(".js-popup-box").addClass("popup-rotate-out");
            self.delay(500).fadeOut("fast", function() {
                self.children(".js-popup-box").removeClass("popup-rotate-in popup-rotate-out");
            });
        } else {
            self.fadeOut("fast");
        }

        location.hash = "";
    });

    $(".js-weixin").on("click", function() {
        var self = $(".js-popup.erweima");
        if (support3DTransform) {
            self.fadeIn("fast", function() {
                self.children(".js-popup-box").addClass("popup-rotate-in");
            });
        } else {
            self.fadeIn("fast");
        }
    });

    if (location.hash.toLowerCase() === "#weixin") {
        $(".js-weixin").trigger("click");
    }

    $(document).on("scroll", function(e) {
        if (window.scrollY > 200){
            $("#up").fadeIn();
        }else{
            $("#up").fadeOut();
        }
    });

    $("#up").on('click', function() {
        $(window).scrollTop(0);
    });
});
