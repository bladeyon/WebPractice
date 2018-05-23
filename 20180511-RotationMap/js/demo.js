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



    init: function () {
        this.createElements(this.imgInfoArr);
    },

    createElements: function (data) {
        var $img = $('<ul>', {
                'class': 'show-img'
            }),
            $order = $('<ul>'),
            len = data.length;

        data.forEach(function (item, index) {
            $img.append("<li><img src='" + item.url + "'/></li>");
            if (index < len-1) {
                $order.append("<li></li>");
            }

        });
        $('.wrapper').prepend($img);
        $(".wrapper .order").append($order);
    }


}).init();