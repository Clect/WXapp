var util = require('../../utils/util.js')
var d = require('date.js')
var app = getApp()
var t = new Date();

Page({
    data:{
        MONTH_EN:['JAN ','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
        monthNum:t.getMonth() + 1,
        yearNum:t.getFullYear(),
        MonthDayArray:[],
    },

    dateClick:function(e){
        var eId = e.currentTarget.id;
        var MonArray = this.data.MonthDayArray;

        for(var i = 0;i < MonArray.length;i++){
            for(var j = 0;j < MonArray[i].length;j++){
                if(typeof(MonArray[i][j]) == 'string'){
                    continue;
                }
                if(MonArray[i][j].num == eId){  
                    MonArray[i][j].isShowDayInfo = !MonArray[i][j].isShowDayInfo;
                }
            }
        }

        for(var i = 0;i < MonArray.length;i++){
            for(var j = 0;j < MonArray[i].length;j++){
                if(typeof(MonArray[i][j]) == 'string' || MonArray[i][j].num == eId){
                    continue;
                }
                MonArray[i][j].isShowDayInfo = false;
            }
        }

        this.setData({
            MonthDayArray:MonArray,
        })
    },

    monthTouch:function(e){
        var beginX = e.target.offsetLeft;
        var endX = e.changedTouches[0].clientX;
        console.log(beginX - endX);
        if(beginX - endX > 150){
            this.nextMonth_Fn();
        }
        else if(beginX - endX < -150){
            this.lastMonth_Fn();
        }
    },

    nextMonth_Fn:function(){
        var n = this.data.monthNum;
        var y =this.data.yearNum;
        console.log(n);
        if(n == 12){
            this.setData({
                monthNum:1,
                yearNum:y + 1,
            });
        }
        else{
            this.setData({
                monthNum:n + 1,
            });
        }
        this.calcMonthDayArray();
    },

    lastMonth_Fn:function(){
        var n = this.data.monthNum;
        var y =this.data.yearNum;
        console.log(n);
        if(n == 1){
            this.setData({
                monthNum:12,
                yearNum:y - 1,
            });
        }
        else{
            this.setData({
                monthNum:n - 1,
            });
        }
        this.calcMonthDayArray();
    },

    onShow:function(){
        console.log('onShow');
        this.calcMonthDayArray();
    },

    calcMonthDayArray:function(){
        var data = this.data;
        var nSpace = d.getMonthFirstDay(data.monthNum - 1, data.yearNum);
        var totalDate = d.getMonthTotalDate(data.monthNum, data.yearNum);
        var dateArray = [];
        var trArray = [];
        for(var i = 1;;i++){
            if(i <= nSpace){
                trArray.push('');
            }
            else if(i <= totalDate + nSpace){
                trArray.push({
                    num:i - nSpace,
                    isShowDayInfo:false,
                    nongli:'初一',
                    isToday:(data.monthNum == t.getMonth() + 1 && i - nSpace == t.getDate() && data.yearNum == t.getFullYear()) ? true : false,
                });
            }
            else{
                var l = trArray.length;
                for(var j = 0;j + l < 7;j++){
                    trArray.push('');
                }
                dateArray.push(trArray);
                break;
            }
            if(trArray.length == 7){
                dateArray.push(trArray);
                trArray = [];
            }
        }
        this.setData({
            MonthDayArray:dateArray,
        })
    }
    
})