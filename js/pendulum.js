function pendulum(p) {

  const CANVAS_WIDTH = 400
  const CANVAS_HEIGHT = 100
  const WORDS = "When a pendulum reaches its lowest point\nit's already halfway back to the top"
  const PERIOD_POSITION = {x: CANVAS_WIDTH - 82, y: 71}


  const getWeightXPosition = (frame) => p.bezierPoint(45, 0.21 * CANVAS_WIDTH, 0.1 * CANVAS_WIDTH, PERIOD_POSITION.x, frame)
  const getWeightYPosition = (frame) => p.bezierPoint(PERIOD_POSITION.y, CANVAS_HEIGHT/2, PERIOD_POSITION.y, PERIOD_POSITION.y, frame)
  const frameRate = (frame) =>  p.bezierPoint(1, -0.2, 0, 1, frame)
  const reachedLowestPoint = (frame) => frame > 0.5
  const splitWordsOnLineBreak = (string) => {
    return string.split("\n")
  }

  const frameSinceLowestPoint = (frame) => frame - 0.5 < 0 ? 0 : (frame - 0.5) * 2

  let frame = 0

  const setupWords = (words) => {
    let asArray = words.split(' ')
    const [firstHalf, lastHalf] = splitWordsOnLineBreak(words)
    return [firstHalf, ['\n'], lastHalf].reduce((l, r) => l + r, "")
  }

  p.setup = function() {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.mousePressed(mousePressed);
    // p.stroke(255, 205, 0)
    // p.noFill()
    // p.ellipse(getWeightXPosition(frame), getWeightYPosition(frame), 10, 10);
    // p.noLoop()
  }

  function mousePressed() {
    frame = 0
    p.loop()
  }

  function drawWeight(frame) {
    p.noStroke()
    p.fill(80)
    p.ellipse(getWeightXPosition(frame) , getWeightYPosition(frame), 3, 3);
  }

  p.draw = function() {
    p.clear();
    if(frame > 1) {p.noLoop()}

    drawWeight(frame)

    // drawText
    p.textSize(18);
    p.textFont('Helvetica');
    p.fill(0)
    const [firstHalf, lastHalf] = splitWordsOnLineBreak(WORDS)
    const lastHalfForFrame = lastHalf.split('')
                  .slice(0, lastHalf.length * frameSinceLowestPoint(frame))
                  .join('')

    p.text(firstHalf + '\n' + lastHalfForFrame, 40, 50);


    frame = frame < 1 ?  frame + frameRate(frame) * 0.01 : frame
  }
}

new p5(pendulum, 'pendulum');
