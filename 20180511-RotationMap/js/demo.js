({

    imgInfoArr: [{
        url: './img/1.jpg'
    }, {
        url: './img/2.jpg'
    }, {
        url: './img/3.jpg'
    }, {
        url: './img/4.jpg'
    }, {
        url: './img/5.jpg'
    }, {
        url: './img/1.jpg'
    }],
    curIndex: 1,
    // len: this.imgInfoArr.length,



    init: function () {
        this.createElements(this.imgInfoArr);
        this.bindEvent();
    },

    createElements: function (data) {
        var $img = $('<div class="show-img"><ul></ul></div>'),
            $order = $('<div class="order"><ul></ul></div>');
        var that=this;
        that.len = data.length;
        // 设置包裹ul的div的尺寸
        $img.find('.show-img').css({
            'width': 520 * that.len + 'px',
            height: '280px'
        });

        data.forEach(function (item, index) {
            $img.find('ul').append("<li><img src='" + item.url + "'/></li>");
            if (index < that.len - 1) {
                $order.find('ul').append("<li></li>");
            }

        });

        $(".wrapper").append($img, $order).find('.order li:first-child').addClass('active');
        if (that.len > 1) {
            $('.wrapper').append('<div class="page">\
                                    <span class="left"></span>\
                                    <span class="right"></span>\
                                </div>');
        }
    },
    bindEvent: function () {
        var that = this;
        $('.wrapper .page').on('click', 'span', function (e) {
            if ($(this).attr('class') == 'left') {
                that.curIndex = that.curIndex > 0 ? --that.curIndex : that.len - 1;
            } else {
                that.curIndex = that.curIndex < that.len - 1 ? ++that.curIndex : 0;
            }
        });

        $('.wrapper .order').on('click', 'li', function (e) {
            that.curIndex = $(this).index();
        });

        that.showImg(that.curIndex);
    },
    showImg: function (index) {
        $('.wrapper .show-img').css('left', -index * 520 + 'px');
        $('.wrapper .order li').find('.active').removeClass('active').eq(index).addClass('active');
    }


}).init();