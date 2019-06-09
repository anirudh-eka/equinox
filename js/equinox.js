let div2;
let pressed = false
let dragWarmthToggle;
let respondToWarmthToggle;
let toggleListeners;


function equinox(p) {
  p.setup = function() {
    let cnv = p.createCanvas(1, 1);
    const line1 = p.createDiv("I am California forest that feels summer where she kisses me. But I know to be cautious.").class('equinox-text').position(50,40);
    const line2 = p.createDiv("She could either be").class('equinox-text').position(50,170);
    const warmthToggleX = line2.position().x + line2.size().width
    warmthToggle = p.createDiv('fire <br/> or <br/> sun').class('equinox-toggle').position(warmthToggleX,line2.position().y)
    warmthToggle.mousePressed(() => {pressed = true})
    warmthToggle.mouseReleased(() => {pressed = false})
    const heightOfTwoLines = warmthToggle.size().height * (2/3)
    dragWarmthToggle = dragY(warmthToggle, line2.position().y, line2.position().y - heightOfTwoLines)
    toggleListener1 = toggleListener(warmthToggle, line2.position().y, line2.position().y - heightOfTwoLines)

    const line3 = p.createDiv("Both give this kind of warmth").class('equinox-text').position(50,300);
    const line4 = p.createDiv("But one").class('equinox-text').position(50,430);
    const warmthToggleListenerX = line4.position().x + line4.size().width
    const warmthToggleListener = p.createDiv('devours the trees <br/> feeds them').class('equinox-toggle-listener').position(warmthToggleListenerX,line4.position().y)
    const heightOfOneLine = warmthToggleListener.size().height * (1/2)
    respondToWarmthToggle = toggleListener(warmthToggleListener, line4.position().y, line4.position().y - heightOfOneLine)
    const blind1 = p.createDiv("But one devours the trees").class('equinox-blind').position(50,line4.position().y - heightOfOneLine - 4 );
    const blind2 = p.createDiv("But one devours the trees").class('equinox-blind--lower').position(50,460);

    toggleListeners = compose([toggleListener1, respondToWarmthToggle])
    toggleListeners(0.5)
  }

  p.draw = function() {
    if(pressed) {
      dragWarmthToggle()
        .map(newYasRate => toggleListeners(newYasRate))
    }
  }

  p.mouseReleased = () => {pressed = false}

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
