//時間操作関連の処理関数一覧

//時間を秒に変換　引数は　h = 時間　、　m = 分　、　s = 秒
//戻り値は秒
function s_convert(h,m,s){
    return h * 3600 + m * 60 + s;
}

//時間の差分を返す　引数は　target_time = 基準時間（秒換算）　、　current_time = 現在時刻（秒換算）
//戻り値は秒
function time_difference(target_time,current_time){
    return target_time-current_time;
}

//秒を時間に変換　引数は　dif_sec = 秒数
//戻り値は配列に時、分、秒を順に格納(文字列)
function hms_convert(dif_sec){
    var timeArray = [];
    var time_str = [];
    timeArray.push(Math.floor(dif_sec / 3600));
    timeArray.push(Math.floor((dif_sec % 3600) / 60));
    timeArray.push(((dif_sec % 3600) % 60));

    for(var i = 0;i < timeArray.length;i++){
        //各要素を2桁表示にして文字列にする
        time_str[i] = timeArray[i].toString().padStart(2,'0');
    }

    return time_str;
}


function find_bus_time(bus_time,now_sum){
    for(var i = 0;i < bus_time[0].length;i++){
        
        var sum = s_convert(bus_time[0][i],bus_time[1][i],bus_time[2][i]);

        var sabun = time_difference(sum,now_sum);

        var sabun_time = hms_convert(sabun);

        if(sabun_time[0] > 0 && sabun_time[1] > 0 && sabun_time[2] > 0){
            break;
        }
    }
    return sabun_time;
}