// Plugin: jQuery.scrollSpeed
// Source: github.com/nathco/jQuery.scrollSpeed
// Author: Nathan Rutzky
// Update: 1.0.2

(function($) {
    
    jQuery.scrollSpeed = function(step, speed, easing) {
        
        var $document = $(document), //�����ĵ�
            $window = $(window),     //�ӿ�
            $body = $('html, body'),
            option = easing || 'default',
            root = 0,
            scroll = false,
            scrollY,
            scrollX,
            view;
            
        if (window.navigator.msPointerEnabled)
        
            return false;
            
        $window.on('mousewheel DOMMouseScroll', function(e) { // on �¼��������¼��󶨵�window����
            
            var deltaY = e.originalEvent.wheelDeltaY,  //����window���¹������ٶ�  120  ����ǹȸ������
                detail = e.originalEvent.detail;       //����window���¹������ٶ�  �����3�ı��� ��������
                scrollY = $document.height() > $window.height();  //���ĵ��߶ȴ����ӿڵ�ʱ�� Ҳ�����й������ʱ��
                scrollX = $document.width() > $window.width();   //���ĵ���ȴ����ӿڵ�ʱ��  Ҳ�����к��ŵĹ������ʱ��
                scroll = true;

            if (scrollY) { //���й�����ʱ��
                
                view = $window.height();  //�����ӿڸ߶�
                    
                if (deltaY < 0 || detail > 0){// �ж����ϻ������¹���

                    root = (root  + view) >= $document.height() ? root : root += step; //�ж��Ƿ񵽵ײ�  �ӿڸ߶�

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