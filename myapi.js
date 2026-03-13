document.addEventListener('DOMContentLoaded', function () {


    const getWord = document.getElementById('getword');
    const display = document.getElementById('display');
    const search = document.getElementById('search');

    search.addEventListener('click',  function() {
        searchWord();
    });


    async function searchWord() {
        const word = getWord.value.trim();

        if (word === '') {
            display.innerHTML = '<p class="error">Please enter a word</p>';
            return;
        }

        display.innerHTML = '<p class="loading">Looking up "' + word + '"...</p>';

        try {
            const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ word )
            .then(res => res.json())
            .then(data => {
                const entry = data[0];
                const def = entry.meanings[0].definitions[0].definition;
                const pho = entry.phonetics[0].text || '';
                const partOfSpeech = entry.meanings[0].partOfSpeech || '';
                const example = entry.meanings[0].definitions[0].example || 'No example available.';
                const audio = entry.phonetics[0].audio || '';


                display.innerHTML = '<h2 class = "font-bold">'+ entry.word + 
                '</h2><p><strong>Definition:</strong>'+ def +'</p><p><strong>Phonetic:</strong> '+ pho +' </p>';
                display.innerHTML += '<p><strong>Part of Speech:</strong> '+ partOfSpeech +'</p>';
                display.innerHTML += '<p><strong>Audio:</strong> '+ audio +'</p>';
                display.innerHTML += '<p><strong>Example:</strong> '+ example +'</p>';
            });
            


        }
         catch (err) {
            let message = "Something went wrong. Please try again.";

            if (err.message === "not found") {
                message = 'No definition found for "<strong>' + word +'</strong>".< br > Check spelling or try another word.;'
            }

            display.innerHTML = '<p class="error">' + message +'</p>';
        }
    }

})

