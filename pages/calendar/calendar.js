var util = require('../../utils/util.js')
var app = getApp()

Page({
    data:{
        today:util.formatTime(new Date()),
    },
    onLoad:function(){
        console.log('onLoad');
    },
    
})