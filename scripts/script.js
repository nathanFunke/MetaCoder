// ---  Setup ---

var widthOffset = Number;

function setWidthOffset () {
    if (/Firefox\/([1]{1}[7-9]{1}|[2-9]{1}[0-9]{1})/.test(navigator.userAgent)){
        widthOffset = 6;
    } else {
        widthOffset = 2;
    };
};

function setPanelHeight () {
    $(".codePanel").height($(window).height() - ($("#header").height() + 15));
};

function setPanelWidth () {
    $(".codePanel").width(($(window).width() / $('.active').length) - widthOffset);
};

function updatePreview () {
    $('iframe').contents().find("head").html("<style type='text/css'>" + $("#cssPanelCode").val() + "</style>");
    $('iframe').contents().find("body").html( $("#htmlPanelCode").val());

    document.getElementById("previewPanel").contentWindow.eval($("#jsPanelCode").val());
};

$(document).ready( function (){
    setWidthOffset();
    setPanelHeight();
    setPanelWidth();
    updatePreview();
})

// Set .codePanel dimensions on page resize
$(window).resize( function () {
    setPanelHeight();
    setPanelWidth();
});

// ---  Header  ---

// change button color on hover
$(".toggleButton").hover( 
    function() {
        $(this).addClass("highlightedButton");
    },

    function() {
        $(this).removeClass("highlightedButton");
    }
);

// change text color on click
$(".toggleButton").click( function() {
    $(this).toggleClass("active");

    setPanelWidth();

    $("#" + $(this).attr("id") + "Panel").toggleClass("hidden");
});


// ---  Code Editor  ---

// Set iframe content
$('textarea').on('change keydown keyup keypress paste', function() {
    updatePreview();
});
