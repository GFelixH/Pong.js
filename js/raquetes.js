//dados raquete
let raqueteCompr = 10;
let raqueteAltu = 90;
let xRaquete = 5;
let yRaquete = 150;
//dados raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
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
function mostraRaqueteOponente() {
  rect(xRaqueteOponente, yRaqueteOponente, raqueteCompr, raqueteAltu);
}
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteCompr / 2 - 30; //dificuldade
  yRaqueteOponente += velocidadeYOponente + calculaChanceDeErrar();
}
