let engine = {
    "cores": ['green', 'purple', 'pink', 'orange', 'yellow', 'blue', 'white', 'red', 'black', 'brown', 'gray'],

    "hexadecimais": {
        'green': '#008000',
        'purple': '#800080',
        'pink': '#ffc0cb',
        'orange': '#f94d00',
        'yellow': '#ffff00',
        'blue': '#0000ff',
        'white': '#ffffff',
        'red': '#ff0000',
        'black': '#000000',
        'brown': '#644117',
        'gray': '#808080',
    },
    "moedas": 0

}

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');

function geradorDeCor() {
    let corSorteada = Math.floor(Math.random() * engine.cores.length);
    let legendaCorDaCaixa = document.querySelector('#cor-na-caixa');
    let nomeCorSorteada = engine.cores[corSorteada];

    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();

    return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor) {
    let caixaDasCores = document.querySelector('#cor-atual');

    caixaDasCores.style.backgroundColor = nomeDaCor;
    caixaDasCores.style.backgroundImage = "url(/img/caixa-fechada.png)";
    caixaDasCores.style.backgroundSize = "100%";

}

function atualizaPontuacao(valor) {
    var pontuacao = document.querySelector('#pontuacao-atual');

    engine.moedas += valor;

    if (valor < 0) {
        audioErrou.play();
    } else {
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(geradorDeCor());

//API DE RECONHECIMENTO DE VOZ

let btnGravador = document.querySelector('#btn-responder');
let transcricaoAudio = "";
let respostaCorreta =  "";

if(window.SpeechRecognition || window.webkitSpeechRecognition) {
    let SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    let gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "en-US";

    gravador.onstart = function() {
        btnGravador.innerText = "Estou ouvindo";

        btnGravador.style.backgroundColor = "white";
        btnGravador.style.color = "black";
    }

    gravador.onend = function() {
        btnGravador.innerText = "RESPONDER";

        btnGravador.style.backgroundColor = "transparent";
        btnGravador.style.color = "white";
    }

    gravador.onresult = function(event) {
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.querySelector('#cor-na-caixa').innerText.toUpperCase();

        if(transcricaoAudio === respostaCorreta) {
            atualizaPontuacao(1);
        }else {
            atualizaPontuacao(-1);
        }

        aplicarCorNaCaixa(geradorDeCor());

    }

    btnGravador.addEventListener('click', function(e) {
        gravador.start();
    })

} else {
    alert('O seu navegador não possui suporte pra interação de voz');
}

