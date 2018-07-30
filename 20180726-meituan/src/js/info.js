import '../css/reset.css';
import '../webfont/iconfont.css';
import '../css/meituanDetail.css';

getDetail();

function getDataId() {
    var id = window.location.search.split('=')[1];
    // console.log(id)
    return id;
}

function getDetail() {
    var id = getDataId();
    $.ajax({
        url: 'http://localhost:8080/api/list.json',
        dataType: 'json',
        type: "GET",
        success: function (data) {
            if (data.status == 'success') {
                data.list.forEach(function (item) {
                    if (item.id == id) {
                        // console.log(item)
                        renderDetail(item);
                        return item;
                    }
                })
            }
        },
        error: function (error) {
            alert(error);
        }
    });

}

function renderDetail(dataInfo) {
    console.log(dataInfo);
    var clearfix = $('section.clearfix');
    clearfix.find('.bigimg>img').attr('src', dataInfo.info['imgurl']);
    clearfix.find('.linnebg dl dt.name').text(dataInfo.info['name']);
    clearfix.find('.linnebg dl dt.dec').text(dataInfo.info['dec']);
    clearfix.find('.price-box .price p strong').text(dataInfo.info['price']);
    clearfix.find('.list-details .tips p span:last-child').text(dataInfo.info['newUser']);
    clearfix.find('.list-details .tell #icon-2 strong').text(dataInfo.info['sale']);
    clearfix.find('.seller .address >h4').text(dataInfo.info['receive']);
    clearfix.find('.seller .address >p').text(dataInfo.info['adderess']);
    clearfix.find('.seller dl dd >span').text("电话：026-" + dataInfo.info['phoneNumber'] ? dataInfo.info['phoneNumber'] : 12345);
    var commentArr = [];
    dataInfo.info.comment.forEach(function (ele) {
        var htm = "";
        htm += '<li class="item-evaluate">\
        <div class="foot-user clearfix">\
            <img src="' + ele.img + '" alt="">\
            <div class="user-strart">\
                <h5>' + ele.user + '</h5>\
            </div>\
            <p class="evaluate-date">' + ele.date + '</p>\
        </div>\
        <div class="evaluate-content">\
            <p>' + ele.content + '</p>\
            <p>';
        // 多张图片
        // ele.img.forEach(function(item){
        //     htm+='<span><img src="'+item+'" alt=""></span>'
        // });

        htm += '<span><img src="' + ele.img + '" alt=""></span>'

        htm += '</p>\
        </div>\
        <div class="locale">\
            <a href="###">西树泡芙（地王广场店）</a>\
        </div>\
    </li>';
        commentArr.push(htm);
    })
    clearfix.find('.food-evaluate ul').append(commentArr.join(''));
}