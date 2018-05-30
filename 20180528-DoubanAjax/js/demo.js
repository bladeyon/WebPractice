(function () {
    function ajaxData(type, url, data, dataType, successFn) {

        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: dataType,
            success: successFn
        })
    }

    function handler(data) {
        // console.log(data); // 返回的就是对象
        // var repObj = JSON.parse(data);
        var resArr = data.musics;
        var $ul = $('<ul>');
        if (resArr.length > 0) {
            resArr.forEach(function (elem) {
                $ul.append('<li><a href="' + elem.alt + '"><img src="' + elem.image + '"><span>' + elem.author[0].name + '</span></a></li>')
            });
            $('.suggest').empty().append($ul).css('display', 'block').slideDown('slow');

        }
    }

    var timer;
    $('.search input').on('input', function (e) {
        // console.log(this.value);
        clearTimeout(timer);
        var value = this.value,
            searchStr = 'q=' + value + '&count=5';
        timer = setTimeout(function () {
            ajaxData('GET', 'https://api.douban.com/v2/music/search', searchStr, 'jsonp', handler);
        }, 800)
    });
}())