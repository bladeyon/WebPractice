var userList=[
    {name:'vsc',gender:'female',img:'vsc.png',desc:'microsoft'},
    {name:'chrome',gender:'male',img:'chrome.png',desc:'长得圆圆的'},
    {name:'dn',gender:'female',img:'dn.png',desc:'那香蕉皮吃上'},
    {name:'edge',gender:'male',img:'edge.png',desc:'浑身都是刺'},
    {name:'kt',gender:'male',img:'kt.png',desc:'我来自海南'},
    {name:'tv',gender:'female',img:'tv.png',desc:'酸酸甜甜'},
    {name:'xl',gender:'male',img:'xl.png',desc:'我来自地球'},
    {name:'word',gender:'female',img:'word.png',desc:'哇！好难啊！'},
];

var mInp = document.getElementById('myInput'),
    mUl = document.getElementById('myUl');
var objCond = {
    txt:'',
    gender: mUl.getElementsByClassName('active')[0].getAttribute('sex')
};

// 绑定事件
mInp.addEventListener('input', function (e) {
    console.log(this.value);
    objCond.txt = this.value;
    renderList(userList,objCond);
}, false);

mUl.addEventListener('click', function (e) {
    var li=this.getElementsByTagName('li');
    for(var i=0,len=li.length;i<len;i++){
        li[i].className="";
    }
    e.target.className='active';
    objCond.gender = e.target.getAttribute('sex');
    renderList(userList,objCond);
}, false);

// 渲染
function renderList(arr,obj) {
    var mUser = document.getElementById('user'),
        liStr = "";
    
    var newArr = filterCond(arr, obj);
    // console.log(newArr);
    newArr.forEach(function (elem) {
        liStr += '<li>\
                <img src="img/' + elem.img + '" alt="' + elem.img.slice(0, elem.img.indexOf('.')) + '">\
                <span>' + elem.name + '</span>\
                <span>' + elem.desc + '</span>\
            </li>';
    });
    mUser.innerHTML="";
    mUser.innerHTML=liStr;
    
}
renderList(userList,objCond);

// 筛选
function filterCond(arr, cond) {
    // console.log(cond);
    var txtArr=[],genArr=[];
    if(cond.txt){
        txtArr=arr.filter(function(item){
                if(item.name.indexOf(cond.txt)!==-1||item.desc.indexOf(cond.txt)!==-1){
                    return true;
                }
            });
    }else{
        txtArr=arr.concat();
    }
    // console.log(txtArr)
    if(cond.gender!=="all"){
        genArr=txtArr.filter(function(item){
            return item.gender==cond.gender;
        });
    }else{
        genArr=txtArr.concat();
    }
    return genArr;

}