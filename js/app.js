'use strict';


Image.all = [];
let keywords = [];

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
    // console.log('my objects', this);
    let rendered = Mustache.render($template, this);
    $('main').append(rendered);

}


Image.prototype.filterKeword = function () {

    let choice = $("#dropdown1");
    if (!(keywords.includes(this.keyword))) {
        keywords.push(this.keyword);

        choice.append(`<option value ='${this.keyword}'>${this.keyword}</option>`);
    }
};



const readJson1 = () => {

    $.ajax("../data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
        Image.all = [];
        $("main").empty();
        data.forEach(element => {

            let obj = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
            obj.filterKeword();
            obj.render();

        });
    });
};
readJson1();


const readJson2 = () => {
    Image.all = [];
    $("main").empty();
    $.ajax("../data/page-2.json", { method: "GET", dataType: "JSON" }).then(data => {
        data.forEach(element => {
            let obj = new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
            obj.filterKeword();
            obj.render();
        });
    });
};




// handlerFunction 
$('#dropdown1').change(function () {

    let selectedVal = $(this).val();

    //console.log(selectedVal);

    $("div li ").hide();
    $(`.${selectedVal}`).show();

});



// event handler for each ( page 1 and page 2 buttons)

$('#page1').on('click', () => {

    $("div").remove();
    keywords = [];

    $("#dropdown1").empty(' ');
    readJson1();

});


$('#page2').on('click', () => {

    $("div").remove();
    keywords = [];

    $("#dropdown1").empty(' ');
    readJson2();

});



const SortByTitle = () => {
    Image.all.sort((a, b) => {

        if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
        } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return 1;
        }
    });
    $('main').empty('');
    Image.all.forEach(element => {
        element.render();
    })
}



const sortByNumofHorns = () => {
    Image.all.sort((a, b) => {
        return a.horns - b.horns;
    });
    $('main').empty();
    Image.all.forEach(element => {
        element.render();
    })
}


$('#sortTitle').on('click', SortByTitle);
$('#sortHorn').on('click', sortByNumofHorns);


