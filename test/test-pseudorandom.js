import test from "tape"
import * as pseudorandom from "../src/pseudorandom.js"

/** 
 * @param {number[]} list 
 * @param {number} min 
 * @param {number} max 
 */
function waldWolfowitz(list, min, max) {
  const mid = (min + max)*.5
  let bools = list.map(x => x <= mid)
  const n = list.length
  let runCount = bools.reduce((runCount, v, i, bools) => runCount + (i > 0 && v !== bools[i-1] ? 1 : 0), 1)
  let numTrue = bools.reduce((count,v) => count + (v ? 1 : 0), 0)
  let numFalse = n - numTrue

  const idealMean = 1 + 2*numTrue*numFalse/n
  const idealVariance = (idealMean - 1)*(idealMean - 2)/(n - 1)

  return Math.abs(runCount - idealMean) < idealVariance // for large sets we should be within one standard deviation
}

test("pseudorandom.entry", (t) => {
  let entries = []
  let indexes = []
  let integers = []
  let floats = []
  let colors = []
  let vec2s = []
  let vec3s = []
  let vec4s = []
  const list = [1,2,3,4,5,6]

  for (let i = 0; i < 1000; i++) {
    entries.push( pseudorandom.entry(list) )
    indexes.push( pseudorandom.index(list.length) )
    integers.push( pseudorandom.integer(1, 6) )
    floats.push( pseudorandom.float(1, 6) )
    colors.push( pseudorandom.color({r:0,g:0,b:0}, { r:.4,g:.5,b:.6 }, { r:.8, g:.9, b:1 }) )
    vec2s.push( pseudorandom.vector({x:0,y:0}, {x:-1,y:-2}, {x:1,y:-1}) )
    vec3s.push( pseudorandom.vector({x:0,y:0}, {x:-1,y:-2,z:-3}, {x:1,y:-1,z:-2}) )
    vec4s.push( pseudorandom.vector({x:0,y:0}, {x:-1,y:-2,z:-3,w:-4}, {x:1,y:-1,z:-2,w:-3}) )
  }

  t.ok(entries.every(x => list.includes(x)), "entries in range")
  t.ok(indexes.every(x => x >= 0 && x < list.length), "indexes in range")
  t.ok(integers.every(x => x >= 1 && x <= 6), "integers in range")
  t.ok(floats.every(x => x >= 1 && x < 6), "floats in range")
  t.ok(colors.every(col => col.r >= .4 && col.g >= .5 && col.b >= .6 && col.r <= .8 && col.g <= .9 && col.b <= 1), "colors in range")
  t.ok(waldWolfowitz(entries, 1, 6), "entries well distributed")
  t.ok(waldWolfowitz(indexes, 0, list.length - 1), "indexes well distributed")
  t.ok(waldWolfowitz(integers, 1, 6), "integers well distributed")
  t.ok(waldWolfowitz(floats, 1, 6), "floats well distributed")
  t.ok(vec2s.every(vec => vec.x >= -1 && vec.x < 1 && vec.y >= -2 && vec.y < -1), "vec2s in range")
  t.ok(vec3s.every(vec => vec.x >= -1 && vec.x < 1 && vec.y >= -2 && vec.y < -1 && vec.z >= -3 && vec.z < -2), "vec3s in range")
  t.ok(vec4s.every(vec => vec.x >= -1 && vec.x < 1 && vec.y >= -2 && vec.y < -1 && vec.z >= -3 && vec.z < -2 && vec.w >= -4 && vec.w < -3), "vec4s in range")

  t.end()
})