({
    num: 1,
    timer: null,
    lock: false,
    init: function () {
        this.getData(this.num);
        // this.changeLoading()
        this.scrollEvent();
    },
    getData: function (page) {
        var that = this;
        // console.log(that.num, that.lock)
        if (!that.lock) {
            that.lock = true;
            $.get({
                url: './getPics.php?cpage=' + that.num,
                // url:'./data.txt',
                beforeSend: function (data) {
                    // console.log(data);
                    $('.loading').fadeIn(300);
                    that.changeLoading()
                },
                success: function (data) {
                    // console.log(data);
                    var dataJson = JSON.parse(data)
                    if (dataJson.length > 0) {
                        that.insertDom(that.num, dataJson);
                    }
                },
                complete: function (data) {
                    // console.log(data);
                    $('.loading').fadeOut(300);
                }
            });
            that.num++;
        }

    },
    insertDom: function (num, data) {
        var that = this;
        // console.log('共加载：' + data.length + "张")
        data.forEach(function (item, index) {
            var imgDiv = $('<div class="imginfo">'),
                imgP = $('<p>').text(item.title),
                img = new Image;
            img.src = item.preview;
            img.onload = function () {
                imgDiv.append(img, imgP);
                // 将图片插入到最短的li上
                $('.imgcol').eq(that.getMinLi()).append(imgDiv);
                // console.log('第' + num + "页，第" + index + '张加载完成')
            }
        });
        that.lock = false;
    },
    getMinLi: function () {
        // 取最短的li
        var $li = $('.imgcol'),
            len = $li.length,
            minLiHeight = $li.eq(0).height(),
            index = 0;
        for (var i = 1; i < len; i++) {
            var curLiHeight = $li.eq(i).height();
            if (minLiHeight > curLiHeight) {
                minLiHeight = curLiHeight;
                index = i;
            }
        }
        // console.log(index)
        return index;
    },
    changeLoading: function () {
        var that = this,
            oLi = $('.loading li'),
            len=oLi.length;
            oLi.removeClass('active');
        /* 
        // 动态展示 ...
        function addCls(i) {
            console.log(i)
            setTimeout(function () {
                oLi.eq(i).addClass('active');
            }, 1000*i)
        } */
        oLi.each(function (index, ele) {
            // addCls(index)
            // console.log(index, ele);
            (function (i) {
                setTimeout(function () {
                    oLi.eq(i).addClass('active');
                }, 1000*i)
            }(index));
        });
       
    },
    scrollEvent: function () {
        var that = this;
        // 当最短的li出现时，刷新数据
        $(window).scroll(function () {
            var scrollPos = $(this).scrollTop(),
                winHeight = $(this).height(),
                minLiHeight = $('.imgcol').eq(that.getMinLi()).height();
            if (scrollPos + winHeight > minLiHeight) {
                // console.log('继续加载……')
                that.getData();
            }
        })

    }



}).init()