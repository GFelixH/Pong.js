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
function verificaColisaoBorda() {
  if (xBolinha + raio > 600 || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > 400 || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
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
