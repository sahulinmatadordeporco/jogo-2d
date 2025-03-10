const canvas = document.querySelector("#jogo2D");
const ctx = canvas.getContext("2d");

const personagem = {
    x: 30,
    y: 130,
    altura: 20,
    largura: 20,
    velocidadeY: 0,
    pulando: false,
    gravidade: 0.8,
    forcaPulo: 14,
    chao: 0
};

personagem.chao = canvas.height - personagem.altura;

let gameOver = false;
let contadorObstaculos = 0;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !personagem.pulando && !gameOver) {
        personagem.pulando = true;
        personagem.velocidadeY = -personagem.forcaPulo; 
    }
});

function desenharPersonagem() {
    ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function atualizarPersonagem() {
    if (personagem.pulando == true) {
        personagem.velocidadeY += personagem.gravidade;
        personagem.y += personagem.velocidadeY;
        if (personagem.y >= personagem.chao) {
            personagem.y = personagem.chao;
            personagem.velocidadeY = 0;
            personagem.pulando = false;
        }
    }
}

const Obstaculo = {
    x: canvas.width - 20,
    y: canvas.height - 70,
    largura: 20,
    altura: 70,
    velocidadex: 3
};

function desenharObstaculo() {
    ctx.fillStyle = "Yellow"; 
    ctx.fillRect(Obstaculo.x, Obstaculo.y, Obstaculo.largura, Obstaculo.altura);
}

function atualizarObstaculo() {
    Obstaculo.x -= Obstaculo.velocidadex;
    if (Obstaculo.x <= 0 - Obstaculo.largura) {
        Obstaculo.x = canvas.width;
        Obstaculo.velocidadex += 0.2;
        let nova_altura = (Math.random() * 50) + 45;
        Obstaculo.altura = nova_altura;
        Obstaculo.y = canvas.height - nova_altura;
        contadorObstaculos++; 
    }
}

function desenharContador() {
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.fillText(contadorObstaculos, 10, 30);
}

function verificarColisao() {
    if (personagem.x < Obstaculo.x + Obstaculo.largura &&
        personagem.x + personagem.largura > Obstaculo.x &&
        personagem.y < Obstaculo.y + Obstaculo.altura &&
        personagem.y + personagem.altura > Obstaculo.y) {
        gameOver = true;
        mostrarBotaoReiniciar();
        desenharGameOver();
    }
}

function desenharGameOver() {
    ctx.fillStyle = "white";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

function mostrarBotaoReiniciar() {
    const botao = document.createElement("button");
    botao.textContent = "Reiniciar";
    botao.id = "botaoReiniciar"; 
    document.body.appendChild(botao);

    botao.addEventListener("click", reiniciarJogo);
}

function reiniciarJogo() {
    personagem.x = 30;
    personagem.y = 130;
    personagem.velocidadeY = 0;
    personagem.pulando = false;
    Obstaculo.x = canvas.width - 20;
    Obstaculo.y = canvas.height - 70;
    Obstaculo.velocidadex = 3;
    contadorObstaculos = 0; 
    gameOver = false;
    document.querySelector("#botaoReiniciar").remove();
    loop(); 
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharPersonagem();
    desenharObstaculo();
    atualizarPersonagem();
    atualizarObstaculo();
    desenharContador();
    verificarColisao();
    
    if (!gameOver) {
        requestAnimationFrame(loop);
    }
}

loop();