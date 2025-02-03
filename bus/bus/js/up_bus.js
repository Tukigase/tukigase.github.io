
//以下は平日の時刻
var up_bus_all = [[ 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9,10,10,10,11,11,11,11,12,13,13,13,13,14,14,14,15,15,15,15,16,16,16,16,16,16,17,17,17,17,18,18,18,18,18,19,19,19,20,20,20,20,21,21,22],
                  [35,45,55, 5,10,22,32,42, 0,15,30,40,45,50,10,40,50, 0,30,45,55,30, 5,20,35,45,30,40,50, 0,20,40,55,10,15,20,30,45,55,10,25,40,50, 0,10,20,35,50, 5,20,40, 0,20,40,50,10,25, 0],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]   
//以下は土曜の時刻
var up_bus_sat = [[ 7, 8, 8, 8, 9, 9, 9, 9,10,10,10,11,11,12,12,12,13,13,13,14,14,15,15,15,16,16,16,17,17,17,18,18,18,19,19,19,20,20,20,21,21],
                  [50, 5,32,50, 0,20,40,50,10,30,50,25,55,15,30,45,10,30,50,20,30,10,25,40, 0,20,40, 0,25,45,15,35,50, 5,25,50, 0,15,35, 0,45],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

var up_r_h,up_r_m,up_r_s;

var i = 0;

window.onload = function(){
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var week = now.getDay();
    var sum = s_convert(h,m,s);

    var tmp = [];
    
    if(week == 6){
        tmp = find_bus_time(up_bus_sat,sum);
        up_r_h = tmp[0];
        up_r_m = tmp[1];
        up_r_s = tmp[2];
    }
    else{
        tmp = find_bus_time(up_bus_all,sum);
        up_r_h = tmp[0];
        up_r_m = tmp[1];
        up_r_s = tmp[2];
    }

};


setInterval(()=>{
    document.querySelector('#up_now').textContent =new Date().toLocaleString();
}, 100);


setInterval(()=>{
    
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var week = now.getDay();
    var day = now.getDate();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    
    //現在時刻をすべて秒にする
    var sum = s_convert(h,m,s);

    var up_aaa,up_next,up_nextnext;

    //バス時刻をすべて秒にする
    if(week == 6){
        var b_sum = s_convert(up_bus_sat[0][i],up_bus_sat[1][i],up_bus_sat[2][i]);
    }
    else{
        var b_sum = s_convert(up_bus_all[0][i],up_bus_all[1][i],up_bus_all[2][i]);
    }

    //バス時刻と現在時刻の差を出す
    var up_r_sum = time_difference(b_sum,sum);

    //差を時分秒表記にする
    var tmp = hms_convert(up_r_sum);
    up_r_h = tmp[0];
    up_r_m = tmp[1];
    up_r_s = tmp[2];

    //次のバス時刻への変更
    if(up_r_h <= 0 && up_r_m <= 0 && up_r_s <= 0){
        i++;
    }
    if(h == 0 && m == 0 && s == 0){
        i = 0;
    }

    //最終便後の判定
    if(week == 6 && i == up_bus_sat[0][i].length || week < 6 && i == up_bus_all[0][i].length){
        up_aaa = "本日の運行は終了しました";
        up_next = "ありません";
        up_nextnext = "ありません";
    }
    else if(week == 0){
        up_aaa = "本日の運行はありません";
	    up_next = "ありません";
        up_nextnext = "ありません";
    }
    else if(week == 6 && i == up_bus_sat[0][i].length-1 || week < 6 && i == up_bus_all[0][i].length-1){
	    up_aaa = "残り　" + up_r_h + ":" + up_r_m + ":" + up_r_s;
	    if(week == 6){
            up_next = up_bus_sat[0][i] + ":" + up_bus_sat[1][i].toString().padStart(2,'0') + "　発です。";
        }
        else {
            up_next = up_bus_all[0][i] + ":" + up_bus_all[1][i].toString().padStart(2,'0') + "　発です。";
        }
	    up_nextnext = "ありません";
    }
    //.toString().padStart(2,'0')はゼロ字詰め
    else{
        up_aaa = "残り　" + up_r_h + ":" + up_r_m + ":" + up_r_s;
        if(week == 6){
                up_next = up_bus_sat[0][i] + ":" + up_bus_sat[1][i].toString().padStart(2,'0') + "　発です。";
                up_nextnext = up_bus_sat[0][i+1] + ":" + up_bus_sat[1][i+1].toString().padStart(2,'0') + "発です。";   
        }
        else {
                up_next = up_bus_all[0][i] + ":" + up_bus_all[1][i].toString().padStart(2,'0') + "　発です。";
                up_nextnext = up_bus_all[0][i+1] + ":" + up_bus_all[1][i+1].toString().padStart(2,'0') + "発です。";           
        }
    }
    document.querySelector('#up_countdown').textContent = up_aaa;
    document.querySelector('#up_next').textContent = up_next;
    document.querySelector('#up_nextnext').textContent =up_nextnext;

}, 10);
