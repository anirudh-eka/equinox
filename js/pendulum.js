function sketch(p) {

  const CANVAS_WIDTH = 700
  const CANVAS_HEIGHT = 400
  const WORDS = setupWords("When a pendulum reaches its lowest point it's already halfway back to the top")
  const PERIOD_POSITION = {x: CANVAS_WIDTH/2 - 32, y: 71}


  const getWeightXPosition = (frame) => p.bezierPoint(45, 0.21 * CANVAS_WIDTH, 0.1 * CANVAS_WIDTH, PERIOD_POSITION.x, frame)
  const getWeightYPosition = (frame) => p.bezierPoint(PERIOD_POSITION.y, CANVAS_HEIGHT/2, PERIOD_POSITION.y, PERIOD_POSITION.y, frame)
  const frameRate = (frame) =>  p.bezierPoint(1, -0.2, 0, 1, frame)

  let frame = 0

  function setupWords(words){
    let asArray = words.split(' ')
    const firstHalf = getFirstHalf(words)
    const lastHalf = asArray.slice(asArray.length/ 2).join(' ')
    return [firstHalf, ['\n'], lastHalf].reduce((l, r) => l + r, "")
  }

  p.setup = function() {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.mousePressed(mousePressed);
    p.stroke(255, 205, 0)
    p.noFill()
    p.ellipse(getWeightXPosition(frame), getWeightYPosition(frame), 10, 10);
    console.log('frame', frame)
    p.noLoop()
  }

  function mousePressed() {
    frame = 0
    p.loop()
  }

  function drawWeight(frame) {
    console.log('frame', frame)
    p.noStroke()
    p.fill(80)
    p.ellipse(getWeightXPosition(frame) , getWeightYPosition(frame), 3, 3);
  }

  p.draw = function() {
    if(frame > 1) {p.noLoop()}

    p.background('white');

    drawWeight(frame)
    p.textSize(18);

    p.fill(80, 80, 80, 250 * frameRate(frame))
    const tracedWords = getFirstHalf(WORDS)
    p.text(tracedWords, 40, 50);

    // fill(80);
    // fill(color(0, 171, 255))
    const filledWords = WORDS.split("").slice(0, WORDS.length * frame)
    p.text(filledWords.join(''), 40, 50);


    frame = frame < 1 ?  frame + frameRate(frame) * 0.01 : frame
  }


  function getFirstHalf(string) {
    const asArray = string.split(' ')
    .reduce((ws, w) => {
      return ws.concat(w.split("\n"))
    }, [])
    return asArray.slice(0, asArray.length/ 2).join(' ')
  }
}

new p5(sketch, 'container');
