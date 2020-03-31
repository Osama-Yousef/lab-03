'use strict'


Image.all=[];

function Image(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
Image.all.push(this);
}

Image.prototype.render = function () {

    let $template = $('#photo-template').html();
    console.log('my objects', this);
    var rendered = Mustache.render($template , this );
    $('main').append(rendered);

}

let keywords = [];

Image.prototype.filterKeword = function () {
    //1 i searcg from google ( how to check if something is already in array js)
    //2 try to find if keyword is in the array "keywords"
    //3 if not we should push (keywords will have unique keywords)
    if (!(keywords.includes(this.keyword))) {
        //4 we need to put them in the select new function
        keywords.push(this.keyword);
        // 5 loop through the keywords append to dropdown
        $("#dropdown1").append(`<option value='${this.keyword}'>` + this.keyword + '</option>');
    }
}


// handlerFunction 
$("#dropdown1").on('change', (val) => {
    let selectedVal = val.target.value;
    //console.log(selectedVal);
    if (selectedVal === 'default') {
        $('li').show();
    } else {
        // $('li').hide();
        $('li').hide();
        $(`.${selectedVal}`).fadeIn(200);
    }
});



// to show the contents in page-1 json on screen when i go live 
$(document).ready(function () {
    show('data/page-1.json');
})


function show(fileName){ 
   // console.log(fileName);
    Image.all=[]; // 1. Clear the array
    keywords = [];// Clear the filterKeyword array and the select
    $('#dropdown1').html(`<option value="default">Filter by keyword</option>`); 

    $('#photo-template').empty();
    $.get(fileName)
    .then(data => {
       
        data.forEach(element => {
            let newImage = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
            newImage.filterKeword();
            newImage.render();
        });
    });
}

// event handler for each ( page 1 and page 2 buttons)
$('#page1').on('click',() => {show('data/page-1.json')});
$('#page2').on('click', () => {show('data/page-2.json')});

// make sorting function
function sortBy(attr){ 
    $('#photo-template').empty();
    Image.all.sort(function (a, b) {
        var attrOne= a[attr];
        var attrTwo= b[attr];
        if (attrOne < attrTwo) {
            return -1;
        }
        if (attrTwo < attrOne) {
            return 1;            
        }
        return 0;
    });
}


// event handler for sort by title button
$('#sortTitle').on("click", ()=>{
    sortBy('title');
    // Image.all =[];
    $('#photo-template').html('');
    Image.all.forEach(element => {
        let newImage = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
        newImage.render();
    });

});

// event handler for sort by # horns button
$('#sortHorn').on("click", ()=>{
    sortBy('horns');
    $('#photo-template').html('');
    Image.all.forEach(element => {
        let newImage = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
        newImage.render();
    });

});