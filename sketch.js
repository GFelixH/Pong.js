//dados bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;
//dados raquete
let raqueteCompr = 10;
let raqueteAltu = 90;
let xRaquete = 5;
let yRaquete = 150;
//dados raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
//dados pontos
let meusPontos = 0;
let pontosOponente = 0;
//sons jogo
let somRaquete;
let somPonto;
let somTrilha;
//chance de errar
let chanceDeErrar = 0;
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}
function draw() {
  background(0);
  incluiPlacar();
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  //colisaoMinhaRaqueteBiblioteca();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  marcaPonto();
  naoPreso();
  //colisaoRaqueteOponenteBiblioteca();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > 600 || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > 400 || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}
function mostraRaquete(x, y) {
  rect(x, y, raqueteCompr, raqueteAltu);
}
function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}
function verificaColisaoRaquete() {
  if (
    xBolinha - raio < xRaquete + raqueteCompr &&
    yBolinha - raio < yRaquete + raqueteAltu &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXBolinha *= -1;
  }
}
function colisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteCompr,
    raqueteAltu,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function mostraRaqueteOponente() {
  rect(xRaqueteOponente, yRaqueteOponente, raqueteCompr, raqueteAltu);
}
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteCompr / 2 - 30; //dificuldade
  yRaqueteOponente += velocidadeYOponente + calculaChanceDeErrar();
}
function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}
function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}
function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      //max
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      //min
      chanceDeErrar = 35;
    }
  }
  return chanceDeErrar;
}
function naoPreso() {
  if (xBolinha - raio < 0) {
    xBolinha = xRaquete + raio;
  }
}
