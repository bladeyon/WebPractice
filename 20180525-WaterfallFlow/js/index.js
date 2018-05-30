({
    num:1,
    init:function(){
        this.getDate(this.num);
        var imgLi=$('.imgcol');

    },
    getDate:function (page) {
        $.get({
            url:'./data.txt',
            beforeSend:function(){
                $('.loading').fadeIn(300);
            },
            success:function(data){
                console.log(data);
            }
        })
    }



}).init()