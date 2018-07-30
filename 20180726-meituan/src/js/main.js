import '../css/reset.css';
import '../plug/css/swiper.min.css';
import '../webfont/iconfont.css';
import '../css/meituanIndex.css';

// 获取数据 加载
function getData() {
    $.ajax({
        url: 'http://localhost:8080/api/list.json',
        dataType: 'json',
        type: "GET",
        success: renderList,
        error: function (error) {
            alert(error);
        }
    })
}

getData();
// 数据添加到页面
var list = $('.guess-foodlist .list');

function renderList(data) {
    if (data.status == 'success') {
        // console.log(data);
        var htmArr = [];
        data.list.forEach(function (ele) {
            var info = ele.info;
            // console.log(ele,info)
            htmArr.push('<li class="foodspic">\
                        <a href="http://localhost:8080/meituan-detail.html?id=' + ele.id + '" class="clearfix">\
                            <img src="' + info.imgurl + '" alt="">\
                            <dl>\
                                <dt>' + info.name + '</dt>\
                                <dd>\
                                    <p class="foodtitle">' + info.des + '</p>\
                                    <p class="price">\
                                        <span><strong>' + info.price + '</strong><i>元</i></span>\
                                        <span>' + info.newUser + '</span>\
                                        <span>' + info.sale + '</span>\
                                    </p>\
                                </dd>\
                            </dl>\
                        </a>\
                    </li>');
        });

        list.append(htmArr.join(''));
    } else {
        console.log('error!');
    }
}

// 返回顶部
var $gotop = $('#gotop');
$(window).scroll(function (e) {
    var wScrTop = $(this).scrollTop();
    if (wScrTop > 0) {
        $gotop.slideDown();
    } else {
        $gotop.slideUp();
    }
});
$gotop.click(function(){
    $("html").animate({
        scrollTop:0
    })
});