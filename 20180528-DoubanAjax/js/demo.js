(function () {
    function ajaxData(type, url, data, datatype, successFn) {

        $.ajax({
            type: type,
            url: url,
            data: data,
            datatype: datatype,
            success: successFn
        })
    }
    $('.search input').on('input', function (e) {
        console.log(this.value);
        var value = this.value,
        timer,
            searchStr = 'count=10&q=' + value;

        function handler(data) {
            var data = JSON.parse(data);
            console.log(data);
        }
        clearTimeout(timer);
        timer=setTimeout(function () {
            ajaxData('GET', 'https://api.douban.com/v2/music/search', searchStr, 'jsonp', handler);

        }, 30)
    });
}())