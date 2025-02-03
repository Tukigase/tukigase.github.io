
//以下は平日の時刻
var down_bus_all = [[ 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9,10,10,10,10,11,11,11,12,12,12,12,13,13,14,14,14,15,15,15,15,16,16,16,16,16,16,17,17,17,17,18,18,18,18,18,19,19,20,20,20,21,21],
                    [15,25,35,45,50, 5,15,25,30,35,40,50, 0,10,25,40,55, 5,10,15,35, 5,20,30, 0,10,20,55,30,45, 0,10,55, 5,15,25,50, 5,20,30,35,40,50, 5,15,30,45, 0,10,20,30,40,10,40, 0,20,40, 0,30],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//以下は土曜の時刻
var down_bus_sat = [[ 7, 7, 8, 8, 8, 8, 9, 9, 9,10,10,10,10,11,11,12,12,12,13,13,13,14,14,14,15,15,16,16,16,17,17,17,18,18,18,19,19,19,20,20,21],
[30,45,15,30,40,55,15,25,45, 5,15,35,55,15,50,20,40,55,10,35,55,15,45,55,35,50, 5,20,40, 0,20,45, 5,35,55,10,25,45,10,25,20],
[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

var down_r_h,down_r_m,down_r_s;

var j = 0;

function down_count_load(){
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var week = now.getDay();
    var sum = s_convert(h,m,s);

    var tmp = [];
    
    if(week == 6){
        tmp = find_bus_time(down_bus_sat,sum);
        down_r_h = tmp[0];
        down_r_m = tmp[1];
        down_r_s = tmp[2];
    }
    else{
        tmp = find_bus_time(down_bus_all,sum);
        down_r_h = tmp[0];
        down_r_m = tmp[1];
        down_r_s = tmp[2];
    }
};


setInterval(()=>{
    document.querySelector('#down_now').textContent =new Date().toLocaleString();
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

    var aaa,next,nextnext;

    //バス時刻をすべて秒にする
    if(week == 6){
        var b_sum = s_convert(down_bus_sat[0][j],down_bus_sat[1][j],down_bus_sat[2][j]);
    }
    else{
        var b_sum = s_convert(down_bus_all[0][j],down_bus_all[1][j],down_bus_all[2][j]);
    }

    //バス時刻と現在時刻の差を出す
    var down_r_sum = time_difference(b_sum,sum);

    //差を時分秒表記にする
    var tmp = hms_convert(down_r_sum);
    down_r_h = tmp[0];
    down_r_m = tmp[1];
    down_r_s = tmp[2];

    //次のバス時刻への変更
    if(down_r_h <= 0 && down_r_m <= 0 && down_r_s <= 0){
        j++;
    }
    if(h == 0 && m == 0 && s == 0){
        j = 0;
    }

    //最終便後の判定
    if(week == 6 && j == down_bus_sat[0][j].length || week < 6 && j == down_bus_all[0][j].length){
        aaa = "本日の運行は終了しました";
        next = "ありません";
        nextnext = "ありません";
    }
    else if(week == 0){
        aaa = "本日の運行はありません";
	    next = "ありません";
        nextnext = "ありません";
    }
    else if(week == 6 && j == down_bus_sat[0][j].length-1 || week < 6 && j == down_bus_all[0][j].length-1){
	    aaa = "残り　" + down_r_h + ":" + down_r_m + ":" + down_r_s;
	    if(week == 6){
            next = down_bus_sat[0][j] + ":" + down_bus_sat[1][j].toString().padStart(2,'0') + "　発です。";
        }
        else {
            next = down_bus_all[0][j] + ":" + down_bus_all[1][j].toString().padStart(2,'0') + "　発です。";
        }
	    nextnext = "ありません";
    }
    //.toString().padStart(2,'0')はゼロ字詰め
    else{
        aaa = "残り　" + down_r_h + ":" + down_r_m + ":" + down_r_s;
        if(week == 6){
                next = down_bus_sat[0][j] + ":" + down_bus_sat[1][j].toString().padStart(2,'0') + "　発です。";
                nextnext = down_bus_sat[0][j+1] + ":" + down_bus_sat[1][j+1].toString().padStart(2,'0') + "発です。";   
        }
        else {
                next = down_bus_all[0][j] + ":" + down_bus_all[1][j].toString().padStart(2,'0') + "　発です。";
                nextnext = down_bus_all[0][j+1] + ":" + down_bus_all[1][j+1].toString().padStart(2,'0') + "発です。";           
        }
    }
    document.querySelector('#down_countdown').textContent = aaa;
    document.querySelector('#down_next').textContent = next;
    document.querySelector('#down_nextnext').textContent =nextnext;

}, 10);
