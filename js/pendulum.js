const CANVAS_WIDTH = 700
const CANVAS_HEIGHT = 400
const WORDS = setupWords("When a pendulum reaches its lowest point it's already halfway back to the top")
const PERIOD_POSITION = {x: CANVAS_WIDTH/2 - 32, y: 71}


const getWeightXPosition = (frame) => bezierPoint(45, 0.21 * CANVAS_WIDTH, 0.1 * CANVAS_WIDTH, PERIOD_POSITION.x, frame)
const getWeightYPosition = (frame) => bezierPoint(PERIOD_POSITION.y, CANVAS_HEIGHT/2, PERIOD_POSITION.y, PERIOD_POSITION.y, frame)
const frameRate = (frame) =>  bezierPoint(1, -0.2, 0, 1, frame)

let frame = 0

function setupWords(words){
  let asArray = words.split(' ')
  const firstHalf = getFirstHalf(words)
  const lastHalf = asArray.slice(asArray.length/ 2).join(' ')
  return [firstHalf, ['\n'], lastHalf].reduce((l, r) => l + r, "")
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background('white');
  stroke(255, 205, 0)
  noFill()
  ellipse(getWeightXPosition(frame), getWeightYPosition(frame), 10, 10);
  console.log('frame', frame)
  noLoop()
}

function mousePressed() {
  frame = 0
  loop()
}

function drawWeight(frame) {
  console.log('frame', frame)
  noStroke()
  fill(80)
  ellipse(getWeightXPosition(frame) , getWeightYPosition(frame), 3, 3);
}

function draw() {
  if(frame > 1) {noLoop()}
  background('white');

  drawWeight(frame)
  textSize(18);

  fill(80, 80, 80, 250 * frameRate(frame))
  const tracedWords = getFirstHalf(WORDS)
  text(tracedWords, 40, 50);

  // fill(80);
  // fill(color(0, 171, 255))
  const filledWords = WORDS.split("").slice(0, WORDS.length * frame)
  text(filledWords.join(''), 40, 50);


  frame = frame < 1 ?  frame + frameRate(frame) * 0.01 : frame
}


function getFirstHalf(string) {
  const asArray = string.split(' ')
  .reduce((ws, w) => {
    return ws.concat(w.split("\n"))
  }, [])
  return asArray.slice(0, asArray.length/ 2).join(' ')
}
