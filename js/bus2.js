window.onload = function(){
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var week = now.getDay();
    var sum = h * 3600 + m * 60 + s;
   if(week == 6){
       for(i = 0;i < b6_h.length -1 ;i++){
           
           //バス時刻をすべて秒にする
           var b_sum = b6_h[i] * 3600 + b6_m[i] * 60 + b6_s[i];
    
           //バス時刻と現在時刻の差を出す
           var r_sum = b_sum - sum;

           //差を時分秒表記にする
           r_h = Math.floor(r_sum / 3600);
           r_m = Math.floor((r_sum % 3600) / 60);
           r_s = ((r_sum % 3600) % 60);

           //次のバス時刻への変更
           if(r_h >= 0 && r_m >= 0 && r_s > 0){
               break;
           }
       }
    }else
    {
        for(i = 0;i < b_h.length -1 ;i++){
   
           var b_sum = b_h[i] * 3600 + b_m[i] * 60 + b_s[i];
    
          //バス時刻と現在時刻の差を出す
           var r_sum = b_sum - sum;

           //差を時分秒表記にする
           r_h = Math.floor(r_sum / 3600);
           r_m = Math.floor((r_sum % 3600) / 60);
           r_s = ((r_sum % 3600) % 60);

           //次のバス時刻への変更
           if(r_h >= 0 && r_m >= 0 && r_s > 0){
               break;
           }
       }
    }
    
};


var i = 0;

//以下は平日の時刻
var b_h = [ 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9,10,10,10,10,11,11,11,12,12,12,12,13,13,14,14,14,15,15,15,15,16,16,16,16,16,16,17,17,17,17,18,18,18,18,18,19,19,20,20,20,21,21];
var b_m = [15,25,35,45,50, 5,15,25,30,35,40,50, 0,10,25,40,55, 5,10,15,35, 5,20,30, 0,10,20,55,30,45, 0,10,55, 5,15,25,50, 5,20,30,35,40,50, 5,15,30,45, 0,10,20,30,40,10,40, 0,20,40, 0,30];
var b_s = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
   
//以下は土曜の時刻
var b6_h = [ 7, 7, 8, 8, 8, 8, 9, 9, 9,10,10,10,10,11,11,12,12,12,13,13,13,14,14,14,15,15,16,16,16,17,17,17,18,18,18,19,19,19,20,20,21];
var b6_m = [30,45,15,30,40,55,15,25,45, 5,15,35,55,15,50,20,40,55,10,35,55,15,45,55,35,50, 5,20,40, 0,20,45, 5,35,55,10,25,45,10,25,20];
var b6_s = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var r_m,r_h,r_s;

setInterval(()=>{
   document.querySelector('#now').textContent =new Date().toLocaleString();
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
   var sum = h * 3600 + m * 60 + s;
   
   //バス時刻をすべて秒にする
   if(week == 6){
       var b_sum = b6_h[i] * 3600 + b6_m[i] * 60 + b6_s[i];
   }
   else{
       var b_sum = b_h[i] * 3600 + b_m[i] * 60 + b_s[i];
   }
   
   //バス時刻と現在時刻の差を出す
   var r_sum = b_sum - sum;

   //差を時分秒表記にする
   r_h = Math.floor(r_sum / 3600);
   r_m = Math.floor((r_sum % 3600) / 60);
   r_s = ((r_sum % 3600) % 60);

   //次のバス時刻への変更
   if(r_h <= 0 && r_m <= 0 && r_s <= 0){
       i++;
   }
   if(h == 0 && m == 0 && s == 0){
       i = 0;
   }
   //最終便後の判定
   if(week == 6 && i == b6_h.length || week < 6 && i == b_h.length){
       document.querySelector('#aaa').textContent = "本日の運行は終了しました";
       document.querySelector('#next').textContent = "ありません";
       document.querySelector('#nextnext').textContent = "ありません";
   }
   else if(week == 0){
       document.querySelector('#aaa').textContent = "本日の運行はありません";
       document.querySelector('#next').textContent = "ありません";
       document.querySelector('#nextnext').textContent = "ありません";
   }
   else if(week == 6 && i == b6_h.length-1 || week < 6 && i == b_h.length-1){
       document.querySelector('#aaa').textContent = "残り　" + r_h.toString().padStart(2,'0') + ":" + r_m.toString().padStart(2,'0') + ":" + r_s.toString().padStart(2,'0');
       if(week == 6){
           document.querySelector('#next').textContent = b6_h[i].toString().padStart(2,'0') + ":" + b6_m[i].toString().padStart(2,'0') + "　発です。";
       }
       else {
           document.querySelector('#next').textContent = b_h[i].toString().padStart(2,'0') + ":" + b_m[i].toString().padStart(2,'0') + "　発です。";
       }
       document.querySelector('#nextnext').textContent = "ありません";
   }
       //.toString().padStart(2,'0')はゼロ字詰め
   else{
       document.querySelector('#aaa').textContent = "残り　" + r_h.toString().padStart(2,'0') + ":" + r_m.toString().padStart(2,'0') + ":" + r_s.toString().padStart(2,'0');
       if(week == 6){
               document.querySelector('#next').textContent = b6_h[i].toString().padStart(2,'0') + ":" + b6_m[i].toString().padStart(2,'0') + "　発です。";
               document.querySelector('#nextnext').textContent = b6_h[i+1].toString().padStart(2,'0') + ":" + b6_m[i+1].toString().padStart(2,'0') + "　発です。";   
       }
       else {
               document.querySelector('#next').textContent = b_h[i].toString().padStart(2,'0') + ":" + b_m[i].toString().padStart(2,'0') + "　発です。";
               document.querySelector('#nextnext').textContent = b_h[i+1].toString().padStart(2,'0') + ":" + b_m[i+1].toString().padStart(2,'0') + "　発です。";           
       }
   }


   function img(){

   }
}, 10);

function img(){
       
}
