$(function() {
    var supportAnimate = (function(){
        var ua = navigator.userAgent.toLowerCase(),
            isIE = ua.match(/msie ([\d.]+)/),
            ieVer = isIE ? isIE[1] : 0;
        return !isIE || ieVer > 9;
    })();

    if (supportAnimate) {
        $('#full-page').addClass('animate');
    }

    $('#full-page').fullpage({
        verticalCentered: false,
        resize: true,
        css3: true,
        navigation: true,
        onLeave: function(index, nextIndex, direction) {
            if (supportAnimate) {
            	if (nextIndex === 2) {
            		enterReliability();
            	}

            	if (nextIndex === 3) {
            		enterCost();
            	}

            	if (nextIndex === 4) {
            		enterRecoverability();
            	}

            	if (nextIndex === 5) {
            		enterExtensibility();
            	}

                if (nextIndex === 6) {
                    enterGetStart();
                }
            }
        }
    });

    var enterReliability = function() {
		move('#reliability-title')
			.set('margin-left', 0)
            .set('opacity', 100)
			.duration('1s')
			.end();
		move('#reliability-content')
			.set('margin-top', 0)
			.set('opacity', 100)
			.delay('0.2s')
			.duration('0.8s')
			.end();
    };

    var enterCost = function() {
    	console.log('enter cost');
    	move('#cost-title')
    		.set('margin-left', 0)
            .set('opacity', 100)
    		.duration('1s')
    		.end();
		move('#cost-content')
			.set('margin-right', 0)
            .set('opacity', 100)
			.delay('0.2s')
			.duration('0.8s')
			.end();
		move('#money-box')
			.set('margin-left', 0)
            .set('opacity', 100)
			.delay('0.2s')
			.duration('0.8s')
			.end();
    };

    var enterRecoverability = function(){
		move('#recoverability-title')
			.set('margin-left', 0)
            .set('opacity', 100)
			.duration('1s')
			.end();
		move('#recoverability-content')
			.set('margin-top', 0)
			.set('opacity', 100)
			.delay('0.2s')
			.duration('1.2s')
			.end();
    };

    var enterExtensibility = function(){
		move('#disk')
			.set('margin-right', 0)
			.set('margin-top', 0)
            .set('opacity', 100)
			.duration('1s')
			.end();
		move('#extensibility-content')
			.set('margin-left', 0)
			.set('opacity', 100)
			.delay('0.2s')
			.duration('1.2s')
			.end();
    };

    var enterGetStart = function() {
        move('#price')
            .set('margin-left', 0)
            .set('opacity', 100)
            .duration('1s')
            .end();
        move('#get-start-content')
            .set('margin-top', 0)
            .set('opacity', 100)
            .delay('0.2s')
            .duration('1.2s')
            .end();
    };

    $('.arrow').click(function(){
    	$(this).fullpage.moveSectionDown();
    });

    // $('body').fullpage.moveTo(6);
});
