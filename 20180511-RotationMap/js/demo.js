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
    curIndex: 0,
    timer: undefined,
    lock: true,
    // len: this.imgInfoArr.length,
    init: function () {
        this.createElements(this.imgInfoArr);
        this.bindEvent();
        this.autoPlay();
    },
    createElements: function (data) {
        var $img = $('<div class="show-img"><ul></ul></div>'),
            $order = $('<ul class="order"></ul>');
        var that = this;
        that.len = data.length;
        // 设置包裹ul的div的尺寸
        $img.css({
            'width': 520 * that.len + 'px'
        });

        data.forEach(function (item, index) {
            $img.find('ul').append("<li><img src='" + item.url + "'/></li>");
            if (index < that.len - 1) {
                $order.append("<li></li>");
            }

        });

        $(".wrapper").append($img, $order).find('.order li:first-child').addClass('active');
        if (that.len > 1) {
            $('.wrapper').append('<ul class="page">\
                                    <li class="left"></li>\
                                    <li class="right"></li>\
                                </ul>');
        }
    },
    bindEvent: function () {
        var that = this;
        $('.wrapper').on('click', 'li', function (e) {
            // console.log(that.lock)
            if (that.lock) {
                that.lock = false;
                clearTimeout(timer);
                var tarClsName = $(this).attr('class');
                if (tarClsName == 'left') {
                    if (that.curIndex == 0) {
                            $('.show-img').css('left', -((that.len-1) * 520) + 'px');
                    }
                    that.curIndex = that.curIndex > 0 ? --that.curIndex : that.len - 2;
                } else if (tarClsName == 'right') {
                    if (that.curIndex == that.len - 2) {
                        $('.show-img').animate({
                            'left': -(that.len - 1) * 520 + 'px'
                        }, 400, 'linear', function () {
                            $(this).css('left', 0);
                        });
                    }
                    that.curIndex = that.curIndex < that.len - 2 ? ++that.curIndex : 0;
                } else {
                    that.curIndex = $(this).index();
                }
                that.showImg(that.curIndex);
            }
        });

    },
    showImg: function (index) {
        var that = this;
        $('.wrapper .show-img').animate({
            'left': -index * 520 + 'px'
        }, 500, 'linear', function () {
            // console.log(that.lock)
            that.lock = true;
        });
        this.changeLiStyle(index);

        this.autoPlay();
    },
    changeLiStyle: function (index) {
        $('.wrapper .order li.active').removeClass('active');
        $('.wrapper .order li').eq(index).addClass('active');
    },
    autoPlay: function () {
        timer = setTimeout(() => {
            $('.wrapper .page .right').click();
        }, 2000);

    }

}).init();