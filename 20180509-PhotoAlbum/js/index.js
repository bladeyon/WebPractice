({
    imgInfo: [{
        url: './images/0.png'
    }, {
        url: './images/1.png'
    }, {
        url: './images/2.png'
    }, {
        url: './images/3.png'
    }, {
        url: './images/4.png'
    }, {
        url: './images/5.png'
    }, {
        url: './images/6.png'
    }, {
        url: './images/7.png'
    }, {
        url: './images/8.png'
    }, {
        url: './images/9.png'
    }, {
        url: './images/10.png'
    }, {
        url: './images/11.png'
    }, {
        url: './images/12.png'
    }, {
        url: './images/13.png'
    }, {
        url: './images/14.png'
    }],

    curIndex: 0,
    imgLen: 0,
    init: function () {
        this.imgLen = this.imgInfo.length;
        this.createDOMLi(this.imgInfo);
        this.bindEvent();
    },

    createDOMLi: function (arr) {
        var $ul = $('<ul></ul>');
        arr.forEach(function (item, index) {
            // console.log(index,item);
            $ul.append('<li><img src="' + item.url + '" alt=""></li>')
        })

        $('.wrapper').append($ul);
        $('li').css('height', $('li').width());

    },

    bindEvent: function () {
        var that = this;
        $('.wrapper ul').on('tap', 'li', function (e) {
            // console.log('tap:', $(this).index());
            that.curIndex = $(this).index();
            that.loadImg(that.curIndex);
        });
        $('.wrapper .show-dist').on('tap', function () {
            $(this).css('display', 'none');
        }).on('swipeLeft', function () {
            if (that.curIndex < that.imgLen - 1 && ++that.curIndex < that.imgLen) {
                that.loadImg(that.curIndex);
            }
            // console.log('swipeLeft', that.curIndex)
        }).on('swipeRight', function () {
            if (that.curIndex > 0 && --that.curIndex >= 0) {
                that.loadImg(that.curIndex);
            }
            // console.log('swipeRight', that.curIndex)
        })
    },

    loadImg: function (index) {
        var img = new Image;
        img.src = this.imgInfo[index].url; //
        $('.wrapper .show-dist').empty().append(img).css('display', 'block');
        var divW_H = $(window).width() / $(window).height();
        img.onload = function () {
            var imgW_H = this.width / this.height;
            console.log(imgW_H, divW_H);
            if (imgW_H >= divW_H) {
                $(this).css('width', '100%');
            } else {
                $(this).css('height', '100%');
            }
        }
    }
}).init();