class veiculo {
    constructor(marca, tipo, cor, velocidade, passageiros) {
        this.marca = marca;
        this.tipo = tipo;
        this.cor = cor;
        this.velocidade = velocidade;
        this.passageiros = passageiros;
    }
    acelerar = function() {
        this.velocidade += 10;
        console.log(this.velocidade);
    }
    frear = function() {
        this.velocidade -= 10;
        console.log(this.velocidade);
    }
}

const carro = new veiculo('Fiat', '4x4', 'Preto', 0, 4);
const outroCarro = new veiculo('Chevrolet', 'Sedan', 'Branco', 0, 5);
outroCarro.acelerar();
carro.acelerar();
carro.acelerar(); 
carro.frear();
carro.frear();
outroCarro.frear();