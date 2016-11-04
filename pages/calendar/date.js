

function getMonthFirstDay(m, y){
    var t = new Date();
    t.setFullYear(y);
    t.setMonth(m);
    t.setDate(1);
    return t.getDay();
}

function getMonthTotalDate(m, y){
    var t = new Date();
    t.setFullYear(y);
    t.setMonth(m);
    t.setDate(0);
    return t.getDate();
}

module.exports = {
  'getMonthFirstDay': getMonthFirstDay,
  'getMonthTotalDate':getMonthTotalDate,
}
