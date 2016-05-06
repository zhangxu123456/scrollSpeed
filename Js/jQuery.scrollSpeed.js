// Plugin: jQuery.scrollSpeed
// Source: github.com/nathco/jQuery.scrollSpeed
// Author: Nathan Rutzky
// Update: 1.0.2

(function($) {
    
    jQuery.scrollSpeed = function(step, speed, easing) {
        
        var $document = $(document), //整个文档
            $window = $(window),     //视口
            $body = $('html, body'),
            option = easing || 'default',
            root = 0,
            scroll = false,
            scrollY,
            scrollX,
            view;
            
        if (window.navigator.msPointerEnabled)
        
            return false;
            
        $window.on('mousewheel DOMMouseScroll', function(e) { // on 事件代理，将事件绑定到window上面
            
            var deltaY = e.originalEvent.wheelDeltaY,  //计算window向下滚动的速度  120  这个是谷歌下面的
                detail = e.originalEvent.detail;       //计算window向下滚动的速度  这个是3的倍数 火狐下面的
                scrollY = $document.height() > $window.height();  //当文档高度大于视口的时候 也就是有滚动轴的时候
                scrollX = $document.width() > $window.width();   //当文档宽度大于视口的时候  也就是有横着的滚动轴的时候
                scroll = true;

            if (scrollY) { //当有滚动轴时候
                
                view = $window.height();  //计算视口高度
                    
                if (deltaY < 0 || detail > 0){// 判断向上还是向下滚动

                    root = (root  + view) >= $document.height() ? root : root += step; //判断是否到底部  视口高度

                }

                if (deltaY > 0 || detail < 0)
            
                    root = root <= 0 ? 0 : root -= step;
                
                $body.stop().animate({
            
                    scrollTop: root
                
                }, speed, option, function() {
            
                    scroll = false;
                
                });
            }
            
            if (scrollX) {
                
                view = $window.width();
                    
                if (deltaY < 0 || detail > 0)
            
                    root = (root + view) >= $document.width() ? root : root += step;
                
                if (deltaY > 0 || detail < 0)
            
                    root = root <= 0 ? 0 : root -= step;
                
                $body.stop().animate({
            
                    scrollLeft: root
                
                }, speed, option, function() {
            
                    scroll = false;
                
                });
            }
            
            return false;
            
        }).on('scroll', function() {
            
            if (scrollY && !scroll) root = $window.scrollTop();
            if (scrollX && !scroll) root = $window.scrollLeft();
            
        }).on('resize', function() {
            
            if (scrollY && !scroll) view = $window.height();
            if (scrollX && !scroll) view = $window.width();
            
        });       
    };
    
    jQuery.easing.default = function (x,t,b,c,d) {
    
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    };
    jQuery.easing.easeOutCubic = function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    }
})(jQuery);