(function () {

    var imgInfoArr = [{
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
    }];

    init();

    function init() {
        createElements(imgInfoArr);
    }

    function createElements(data) {
        var $li = $('<ul>');
        data.forEach(function (item) {
            console.log(item)
            $li.append("<li><img src='" + item.url + "'/></li>");
        });
        $('.wrapper').append($li);
    }


}());