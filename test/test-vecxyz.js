import test from "tape"
import * as vecxyz from "../src/vecxyz.js"

test("vecxyz.create", (t) => {
  t.deepEquals(vecxyz.create(), {x:0, y:0, z:0}, "default ctor" )
  t.deepEquals(vecxyz.create(1, 2, 3), {x:1, y:2, z:3}, "ctor with values" )  
  t.end()
})

test("vecxyz.clone", (t) => {
  t.deepEquals(vecxyz.clone({x:0, y:0, z:0}), {x:0, y:0, z:0}, "clone zero" )
  t.deepEquals(vecxyz.clone({x:-1, y:-2, z:5}), {x:-1, y:-2, z:5}, "clone vector" )  
  t.end()
})

test("vecxyz.copy", (t) => {
  let out = {x:0,y:0,z:0}
  t.deepEquals(vecxyz.copy(out, {x:4, y:-5, z:-3.3}), {x:4, y:-5, z:-3.3}, "copy values" )  
  t.end()
})

test("vecxyz.set", (t) => {
  let out = {x:1, y:2, z: 3}
  t.deepEquals(vecxyz.set(out, 5, 4, 3), {x:5, y:4, z: 3}, "set values" )
  out = {x:1, y:2, z:3}
  t.deepEquals(vecxyz.setZero(out), {x:0, y:0, z:0}, "set zero" )
  t.end()
})

test("vecxyz.fill", (t) => {
  let out = {x:-1, y:-2, z:3}
  t.deepEquals(vecxyz.fill(out, 5), {x:5, y:5, z: 5}, "fill values" )  
  t.end()
})

test("vecxyz.add", (t) => {
  let out = {x:0,y:0,z:0}
  t.deepEquals(vecxyz.add(out, {x:1, y:-1, z:2}, {x:3, y:.5, z:-.5}), {x:4, y:-.5, z:1.5}, "add values" )
  out = {x:1, y:1, z:1}
  t.deepEquals(vecxyz.add(out, out, out), {x:2, y:2, z:2}, "reuse inputs" )
  t.end()
})

test("vecxyz.isVecXYZ", (t) => {
  t.notOk(vecxyz.isVecXYZ(""), "empty string")
  t.notOk(vecxyz.isVecXYZ(1), "number")
  t.notOk(vecxyz.isVecXYZ({}), "empty object")
  t.notOk(vecxyz.isVecXYZ([1,2,3]), "array")
  t.ok(vecxyz.isVecXYZ({x:1, y:1, z:2}), "vecxyz")
  t.ok(vecxyz.isVecXYZ({x:1, y:1, z:2, s:.1, t:.2}), "extra parameters")
  t.end()
})
