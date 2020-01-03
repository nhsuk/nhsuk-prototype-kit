$('form[name="radio-buttons"]').submit(function(e){
    var dataHref = $('input[type="radio"]:checked').attr('data-href');

    if(dataHref)
    {
        e.preventDefault();
        window.location.href = dataHref;
    }
});