let div2;
let pressed = false
let dragWarmthToggle;
let respondToWarmthToggle;
let toggleListeners;
let highlightTip;
let unhighlightTip;

function equinox(p) {
  p.setup = function() {
    let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
    const line1 = p.createDiv("I feel summer where she kissed me, but I know to be cautious.").class('equinox-text').position(0,40);
    const line2 = p.createDiv("She is either").class('equinox-text').position(0,170);
    const warmthToggleX = line2.position().x + line2.size().width
    const warmthToggle = p.createDiv('<div class="options">fire <i class="arrow-up"></i><br/> or <br/>sun <i class="arrow-down"></i></div>').class('equinox-toggle').position(warmthToggleX,line2.position().y)
    warmthToggle.mousePressed(() => {pressed = true})
    warmthToggle.touchStarted(() => {pressed = true})
    warmthToggle.mouseReleased(() => {pressed = false})
    const heightOfTwoLines = warmthToggle.size().height * (2/3)
    dragWarmthToggle = dragY(warmthToggle, line2.position().y, line2.position().y - heightOfTwoLines)
    toggleListener1 = toggleListener(warmthToggle, line2.position().y, line2.position().y - heightOfTwoLines)

    highlightTip = () => {
      p.select('.arrow-up', warmthToggle).class('arrow-up highlight-tip')
      p.select('.arrow-down', warmthToggle).class('arrow-down highlight-tip')
    }

    unhighlightTip = () => {
      p.select('.arrow-up', warmthToggle).class('arrow-up')
      p.select('.arrow-down', warmthToggle).class('arrow-down')
    }
    
    const line3 = p.createDiv("Both give this kind of warmth").class('equinox-text').position(0,300);
    const line4 = p.createDiv("But one").class('equinox-text').position(0,430);
    const warmthToggleListenerX = line4.position().x + line4.size().width
    const warmthToggleListener = p.createDiv('devours the forest <br/> feeds it').class('equinox-toggle-listener').position(warmthToggleListenerX,line4.position().y)
    const heightOfOneLine = warmthToggleListener.size().height * (1/2)
    respondToWarmthToggle = toggleListener(warmthToggleListener, line4.position().y, line4.position().y - heightOfOneLine)
    const blind1 = p.createDiv("But one devours the forest").class('equinox-blind').position(0,line4.position().y - heightOfOneLine + 5 );
    const blind2 = p.createDiv("But one devours the forest").class('equinox-blind--lower').position(0,460);

    toggleListeners = compose([toggleListener1, respondToWarmthToggle])
    toggleListeners(1)
  }

  p.draw = function() {
    if(pressed) {
      dragWarmthToggle()
        .map(newYasRate => toggleListeners(newYasRate))
    }
  }

  p.mouseReleased = () => {
    unhighlightTip()
    pressed = false
  }

  p.mousePressed = () => {
    highlightTip()
  }


  function dragY(elem, upperBound, lowerBound) {
    let lastMouseY = Nothing();
    return function() {
      const newYPositionAsRate = lastMouseY.map(y => {
        const pixelShift = p.mouseY - y
        let newY = elem.y + pixelShift
        newY = newY > upperBound ? upperBound : newY
        newY = newY < lowerBound  ? lowerBound : newY
        return (newY - lowerBound) / (upperBound - lowerBound)
      })
      lastMouseY = Just(p.mouseY)
      return newYPositionAsRate
    }
  }

  function toggleListener(elem, upperBound, lowerBound) {
    return function(newYasRate) {
      const newY = (newYasRate * (upperBound - lowerBound)) + lowerBound
      elem.position(elem.x, newY)
      return newYasRate
    }
  }

  function compose(fns) {
    return fns.reduce((fs, g) => x => fs(g(x)), () => {})
  }

  function Nothing() {
    const api = {
      map: () => Nothing(),
      getValueOrDefault: d => d,
      isNothing: () => true,
      chain: (fnThatReturnsMaybe) => Nothing()
    }
    return api
  }

  function Just(value) {
    const api = {
      map: fn => Just(fn(value)),
      getValueOrDefault: () => value,
      isNothing: () => false,
      chain: (fnThatReturnsMaybe) => fnThatReturnsMaybe(value)
    }

    return api
  }
}

new p5(equinox, 'equinox');
