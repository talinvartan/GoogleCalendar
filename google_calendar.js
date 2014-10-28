/**
 * Created by mishrab on 10/27/14.
 */


var utils = {
    createElement: function (type, innerHTML, className, parent) {
        var element = document.createElement(type);
        element.innerHTML = innerHTML;
        if ( className ) element.className = className;
        if ( parent ) parent.appendChild(element);
        return element;
    }
};

function randcolor () {
    return 'rgb(' + getRandom({start: 0, end: 255}) + ',' + getRandom({start: 0, end: 255}) +',' + getRandom({start: 0, end: 255}) + ')';
}

function getRandom(interval) {
    // interval is an object with a start and an end
    return Math.round(interval.start + Math.random() * (interval.end - interval.start));
}

var tasks = [];

Number.prototype.toToStringTwoDigits = function () {
    if (this.toString().length === 1) return '0' + this.toString();
    else return this.toString();
};

document.addEventListener('DOMContentLoaded', function () {
    var container_scheduler = document.getElementsByClassName('container_scheduler')[0];
    for (var i = 0; i < 24; i++) {
        // create a row
        // create a time element
        // create a description element
        var row = utils.createElement('div', '', 'row', container_scheduler);
        utils.createElement('div', i.toToStringTwoDigits() + ' hours', 'time', row);
        var schedule = utils.createElement('div', '', 'half-schedule', row);
        for (var j = 0, len = 2; j < len; j++) {
            utils.createElement('div', '', 'half-hour', schedule).setAttribute('data-start', i + j * 0.5);
        }

    }

    var popup = document.getElementsByClassName('popup_display')[0];
    mousemovehandler.elements = [];

    // handle click event on the hyperlink
    document.getElementById('popup_cancel').addEventListener('click', function (event) {

        event.preventDefault();

        mousemovehandler.elements.forEach(function (element) {
            element.className = element.className.replace(' selected', '');
        });


        console.log('start time is: ' + mousemovehandler.elements[0].dataset.start);
        console.log('end time is: ' + (+mousemovehandler.elements[mousemovehandler.elements.length - 1].dataset.start + 0.5));
        mousemovehandler.elements = [];

        popup.className = popup.className.replace(' show', '');

    });

    container_scheduler.addEventListener('mousedown', function () {
        container_scheduler.addEventListener('mousemove', mousemovehandler);
    });

    container_scheduler.addEventListener('mouseup', function (event) {
        if ( event.target.className.indexOf('half-hour') !== -1 ) {
            showPopup(mousemovehandler);
        }

        container_scheduler.removeEventListener('mousemove', mousemovehandler);
    });

    function mousemovehandler (event) {
        if ( event.target.className.indexOf('half-hour') !== -1 ) {
            if ( event.target.className.indexOf('selected') === -1 ) event.target.className += ' selected';
            if ( mousemovehandler.elements.indexOf(event.target) === -1 ) mousemovehandler.elements.push(event.target); // clean this up
        }
    }

    function showPopup(mousemovehandler) {

        if ( mousemovehandler.elements.length === 0 ) return;
        var o = mousemovehandler.elements[0].offsetTop,
            h = popup.offsetHeight,
            margin = 5;

        console.log(o);
        console.log(h);
        popup.style.top = o - h - margin + 'px';
        console.log( o - h - margin );
        popup.className += ' show';

        console.log(mousemovehandler.elements);

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /* Code for the calendar
    ////////////////////////////////////////////////////////////////////////////////////////////////*/

    var counter = 1;   // used for counting loops
    var numberOfWeeks = 5;  // 4 weeks in a month
    var daysInWeek = 7;  // number of days in a week;


    var dateNow = new Date();   //  Date {Mon Oct 27 2014 21:29:19 GMT-0700 (PDT)}
    var month = dateNow.getMonth();   //9


    var nextMonth = month + 1;  // 10
    var prevMonth = month - 1;  // 8
    var day = dateNow.getDate();   // 27th
    var year = dateNow.getFullYear();   //2014


    // names of months and week days.
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayPerMonth = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];


    // days in previous month and next one , and day of week.
    var nextDate = new Date(nextMonth + ' 1 ,' + year);   // Date {Wed Oct 01 2014 00:00:00 GMT-0700 (PDT)}-> 10 1 ,2014
    var weekdays = nextDate.getDay();   // returns the day of the week -> 3
    var numOfDays = dayPerMonth[month];
    var currentMonthLabel = monthNames[month];

    function elementCreate(type, cname, value, parentTable) {
        var newElement = document.createElement(type);
        newElement.innerHTML = value;
        newElement.className = cname;
        parentTable.appendChild(newElement);
        return newElement;
    }

    var getHeader = document.getElementById("tableHeader");
    getHeader.innerHTML = currentMonthLabel + " " + year;

    // create five div week rows
    var parentDivTable = document.getElementById("divTable");
    for (var i = 0; i < numberOfWeeks; i++) {
        var elementDivTable = elementCreate("div", "divRow", "", parentDivTable);
    }

    // pick up the five rows for each week
    var parent = document.getElementsByClassName("divRow");
    for(var i = 0; i < parent.length; i++){ //for each row create 7 div cells
        for( var j = 0; j < daysInWeek; j++ ){
            var element = elementCreate("div", "divCell", "b", parent[i]);
        }

    }

    // leave whitespaces for the days of the previous months on the first row of the calendar
    var elementDivRow = document.getElementsByClassName("divRow")[0];
    for(var i = 0; i < weekdays; i++) {
        elementDivRow.children[i].innerHTML = "";
    }


    // Fill in the rest of the first row
    var count = daysInWeek - weekdays;  //4
    var lastIndex = count;
    for(var i = weekdays; i < daysInWeek; i++) {
        element.children[i].innerHTML = count;
        count--;
    }

    // Fill in the second row
    var elementRow1 = document.getElementsByClassName("divRow")[1];
    count = lastIndex + daysInWeek;
    lastIndex = count;
    for(var i = 0; i < daysInWeek; i++){
        elementRow1.children[i].innerHTML = count;
        count--;
    }

    // Fill in the third row
    var elementRow2 = document.getElementsByClassName("divRow")[2];
    count = lastIndex + daysInWeek;
    lastIndex = count;
    for(var i = 0; i < daysInWeek; i++){
        elementRow2.children[i].innerHTML = count;
        count--;
    }

    // Fill in the fourth row
    var elementRow3 = document.getElementsByClassName("divRow")[3];
    count = lastIndex + daysInWeek;
    lastIndex = count;
    for(var i = 0; i < daysInWeek; i++){
        elementRow3.children[i].innerHTML = count;
        count--;
    }

    // Fill in the fifth row
    var elementRow4 = document.getElementsByClassName("divRow")[4];
    count = lastIndex + daysInWeek;
    lastIndex = count - numOfDays;
    for(var i = 0; i < daysInWeek; i++) {
        elementRow4.children[i].innerHTML = count;
        count--;
    }

});

