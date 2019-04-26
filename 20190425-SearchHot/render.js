(function (data) {
    var $wrap = $(".wrapper");
    var $ul = $wrap.find(".hot");
    var pageSize = 10;
    var curPage = 0;
    var dlen = data.length;
    var totalPage = Math.ceil(dlen / pageSize);
    var orderCls = function (order) {
        switch (order) {
            case 1:
                return "rangeR";
            case 2:
                return "rangeO";
            case 3:
                return "rangeY";

            default:
                return "rangeB";
        }
    };

    function renderdata(data) {
        $ul.find(".item").remove();
        var len = (curPage + 1) * pageSize > dlen ? dlen : (curPage + 1) * pageSize;
        for (let i = curPage * pageSize; i < len; i++) {
            var $clone = $ul.find(".tpl").clone();
            const item = data[i];
            $clone.removeClass('tpl').addClass("item")
                .find(".order").text(i + 1).addClass(orderCls(i + 1))
                .next().text(item.title)
                .next().text(item.cur).addClass(item.cur >= item.his ? "up" : "down");
            $ul.append($clone);
        }
        $ul.find(".item").fadeIn();
    }

    function bindEvent() {
        var $change = $wrap.find(".section .change");
        $change.on("click", function () {
            curPage = ++curPage % totalPage;
            renderdata(data);
        });
    }
    bindEvent();
    renderdata(data);
}(data));