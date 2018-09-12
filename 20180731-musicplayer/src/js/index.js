var $ = window.Zepto;

function getData(url) {

    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

getData('../mock/data.json');

// 渲染数据
function renderDom(arr) {
    arr.forEach(elem => {
        $(".img img").attr('src',''+elem.image)
    });
}