$(document).ready(function() {
    //QUERY string funziona per il GET ma non si può usare per tutti i metodi
    //Con le password in GET chiunque la può leggere

    //preparo la funzione per il template di handlebars
    var source = $('#disco-template').html();
    var template = Handlebars.compile(source);

    //preparo le variabili per il template di handlebars
    // var context = {
    //     copertina: "Img/Ten_Summoner's_Tales.jpg",
    //     titolo: "New Jersey",
    //     artista: "Bon Jovi",
    //     anno: "1988" };
    // var html = template(context);
    //
    // //appendo l'html compilato con le variabili
    // $('#dischi').append(html);

    // chiamata ajax per recuperare i dicshi da visualizzare
    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/array/music',
        'method': 'get',
        'success': function(data) {
            //recupero l'array che contiene tutti i dischi
            var dischi = data.response;
            console.log(data.response);
            console.log(dischi);
            //ciclo tutti i dischi
            for (var i = 0; i < dischi.length; i++) {
                //per ogni disco recupero le varie informazione /artista, disco img di copertina ecc)

                var disco = dischi[i];
                console.log(disco);

                //for in serve per stampare generalmente
                // for (var chiave in disco) {
                //     console.log(chiave + ': ' + disco[chiave]);
                // }
                var img_copertina = disco.poster;
                var album = disco.title;
                var artista_album = disco.author;
                var anno_uscita = disco.year;
                var genre_album = disco.genre;
                //creo le variabili di handlebars

                var context = {
                    copertina: img_copertina,
                    titolo: album,
                    artista: artista_album,
                    anno: anno_uscita,
                    genere: genre_album,
                };

                //versione semplificata
                // 'success': function(data) {
                //     //recupero l'array che contiene tutti i dischi
                //     var dischi = data.response;
                //     console.log(data.response);
                //     console.log(dischi);
                //     //ciclo tutti i dischi
                //     for (var i = 0; i < dischi.length; i++) {
                //         //per ogni disco recupero le varie informazione /artista, disco img di copertina ecc)
                //
                //         var disco = dischi[i];
                //         console.log(disco);
                //         //creo le variabili di handlebars
                //
                //
                //         var context = {
                //             copertina: disco.poster,
                //             titolo: disco.title,
                //             artista: disco.author,
                //             anno: disco.year,
                //         };

                //creo il template
                var html = template(context);

                // appendo l'html compilato con le variabili
                // lo appendo al container dei dischi
                $('#dischi').append(html);

            }
        },
        'error': function() {
            alert('errore');
        }
    });

    // BONUS: tendina per selezione genere => filtro dischi
    //Change si usa con gli input a scelta
    $('#scelta-genere').change(function() {
        console.log('selezionato valore')
        //val prende il valore, non serve attr, se lo prende lui
        //uso this (poi sostituito da '#scelta-genere') perchè 1) val non fa l'each implicito come ad esempio addClass, quindi non seleziona tutti ma solo un elemento 2) seleziono solo il valore che mi interessa se no prenderebbe la prima
        var genere_selezionato = $('#scelta-genere').val();
        console.log(genere_selezionato);
        //per ogni disco verifico se il suo genere corrisponde al genere genere_selezionato
        if (genere_selezionato == 'pippo') {
            console.log('ciao');
            $('.card-disco').fadeIn();
            $('.card-disco').parent('.card-disco-container').fadeIn();
            //
        } else {
            //per ogni disco verifico se il suo genere corrisponde al genere selezionato
            $('.card-disco').each(function() {
                var genere_disco = $(this).attr('data-genere');
                //se il genere del disco è uguale al genere selezionato => lo mostra
                if (genere_disco.toLowerCase() == genere_selezionato.toLowerCase()) {
                    $(this).fadeIn();
                    $(this).parent('.card-disco-container').fadeIn();
                } else {
                    //altrimenti lo nascondo
                    $(this).fadeOut();
                    $(this).parent('.card-disco-container').fadeOut();
                }
            });
            //
        };
    });
});

//https://flynn.boolean.careers/exercises/api/array/music
//https://bitbucket.org/booleancareers/ex-dischi-musicali-layout/src/master/
