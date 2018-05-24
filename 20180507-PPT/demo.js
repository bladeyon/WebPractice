var myPPT = {
    $slider: $('.slider-list .slider'),
    curIndex: 0,
    preIndex: 0,
    len: $('.slider-list .slider').length,
    timer: undefined,
    lock: true,
    init: function () {
        if (this.len > 1) {
            this.createDOM();
            this.bindEvent();
            this.autoPlay();
        }

    },
    createDOM: function () {
        var btnStr = '<div class="btn">\
                        <span class="left-btn"></span>\
                        <span class="right-btn"></span>\
                    </div>';
        var liStr = '';
        for (var i = 0; i < this.len; i++) {
            liStr += i ? '<li></li>' : '<li class="active"></li>'
        }
        liStr = '<div class="btm-li"><ul>' + liStr + '</ul></div>'

        $('.wrapper').append(btnStr + liStr);
    },
    bindEvent: function () {
        var that = this;
        // 向左、向右bind点击事件
        $('.btn .left-btn,.btn .right-btn,.btm-li li').click(function () {
            // console.log("that.lock",that.lock)
            if (that.lock) {
                that.preIndex = that.curIndex;
                var clsName = $(this).attr("class");
                // console.log(clsName);
                if(clsName){
                    that.renderFn(clsName);
                }else{
                    that.renderFn($(this).index());
                }
                
            }
        });
        that.$slider.on('out', function () {
            // console.log('out')
            $(this).fadeOut(300).find('img').animate({
                width: 0
            });
        });
        that.$slider.on('in', function () {
            $(this).fadeIn(300).find('img').animate({
                width: "40%"
            }, 300, 'linear', function () {
                // console.log('img-in');
                that.lock = true;
                that.autoPlay();
            });
        });


    },
    getIndex:function (param) {
        var that=this;
        if (param == 'left-btn') {
            that.curIndex = --that.curIndex < 0 ? that.len - 1 : that.curIndex;
        } else if (param == 'right-btn') {
            that.curIndex = ++that.curIndex < that.len ? that.curIndex : 0;
        } else {
            that.curIndex = param;
        }
    },
    laodPage: function (index) {
        $('.active').removeClass('active');
        $('.slider-list .slider:eq(' + index + ')').addClass('active').css({
            "background": "url('./images/bg-" + (index + 1) + ".jpg') no-repeat",
            "background-size": "cover"
        });
        $('.btm-li li:eq(' + index + ')').addClass('active');
    },
    renderFn:function (btnClsName) {
        this.getIndex(btnClsName);
        // console.log(this.preIndex , this.curIndex)
        if (this.preIndex !== this.curIndex) {
            this.laodPage(this.curIndex);
            this.$slider.eq(this.preIndex).trigger('out');
            this.$slider.eq(this.curIndex).delay(300).trigger('in');
            this.lock = false;
        }
        
    },
    autoPlay: function () {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            $(".btn .right-btn").click();
        }, 2000);
    }
}

myPPT.init();