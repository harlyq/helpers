import test from "tape"
import * as hull from "../src/hull.js"

const ascendingFn = (a,b) => a - b

test("hull.generateHullIndices", (t) => {
  let vertices = [-1,-1,-1, -1,-1,1, -1,1,1, -1,1,-1, 1,-1,-1, 1,-1,1, 1,1,1, 1,1,-1]
  t.deepEquals(hull.generateHullIndices(vertices).sort(ascendingFn), [0,3,6,9,12,15,18,21], "box hull" )
  
  vertices = [-1,-1,-1, 0,0,0, -1,-1,1, -1,1,1, -1,1,-1, 1,-1,-1, 1,-1,1, 1,1,1, 1,1,-1, -.5,-.5,-.5, .5,.5,.5]
  t.deepEquals(hull.generateHullIndices(vertices).sort(ascendingFn), [0,6,9,12,15,18,21,24], "box hull with extras" )

  vertices = [0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -0.5]
  t.deepEquals(hull.generateHullIndices(vertices).sort(ascendingFn), [0,3,6,9,12,15,18,21], "box geometry hull")
  
  vertices = Array.from({length: 90}, () => Math.random() - .5)
  vertices.push(-1,-1,-1, -1,-1,1, -1,1,1, -1,1,-1, 1,-1,-1, 1,-1,1, 1,1,1, 1,1,-1) // put a box around everything
  t.deepEquals(hull.generateHullIndices(vertices).sort(ascendingFn), [90,93,96,99,102,105,108,111], "random vertices with a box")

  vertices = [-0, 1, 0, -0.5877852439880371, 0.80901700258255, 0, -0.18163563311100006, 0.80901700258255, 0.55901700258255, 0.4755282700061798, 0.80901700258255, 0.345491498708725, 0.4755282700061798, 0.80901700258255, -0.345491498708725, -0.18163563311100006, 0.80901700258255, -0.55901700258255, -0.9510565400123596, 0.30901700258255005, 0, -0.29389262199401855, 0.30901700258255005, 0.9045084714889526, 0.769420862197876, 0.30901700258255005, 0.55901700258255, 0.769420862197876, 0.30901700258255005, -0.55901700258255, -0.29389262199401855, 0.30901700258255005, -0.9045084714889526, -0.9510565400123596, -0.30901700258255005, 0, -0.29389262199401855, -0.30901700258255005, 0.9045084714889526, 0.769420862197876, -0.30901700258255005, 0.55901700258255, 0.769420862197876, -0.30901700258255005, -0.55901700258255, -0.29389262199401855, -0.30901700258255005, -0.9045084714889526, -0.5877852439880371, -0.80901700258255, 0, -0.18163563311100006, -0.80901700258255, 0.55901700258255, 0.4755282700061798, -0.80901700258255, 0.345491498708725, 0.4755282700061798, -0.80901700258255, -0.345491498708725, -0.18163563311100006, -0.80901700258255, -0.55901700258255, -1.2246468525851679e-16, -1, 0]
  t.deepEquals(hull.generateHullIndices(vertices).sort(ascendingFn), [0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63], "sphere")

  t.end()
})

