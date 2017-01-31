//Author: Anatoly Grabovsky (https://github.com/grabantot)
//ixj=1 => ccw/left rotation - '+', right handed system
function Vector(x, y) {
  this.x = x || 0
  this.y = y || 0
}

Vector.O = new Vector(0, 0)
Vector.i = new Vector(1, 0)
Vector.j = new Vector(0, 1)

Vector.tripleProduct = function(a, b, c) {
  return b.mul(c.dot(a)).sub(a.mul(c.dot(b)))
}

Vector.prototype.toString = function() {
  return "[" + this.x + ", " + this.y + "]"
}

//======================================== result isn't a vector
Vector.prototype.lengthSq = function(v) {
  if (!v) return this.x*this.x + this.y*this.y
  return this.sub(v).lengthSq()
}
Vector.prototype.length = function(v) {
  return Math.sqrt(this.lengthSq(v))
}
Vector.prototype.angle = function(v) {
  if (v) return this.angle()-v.angle()
  if (this.x < 0 && this.y > 0) return Math.PI + Math.atan(this.y/this.x)
  if (this.x < 0 && this.y < 0) return -Math.PI + Math.atan(this.y/this.x)
  if (this.y == 0 && this.x < 0) return Math.PI
  return Math.atan(this.y/this.x)
}
Vector.prototype.angleDegr = function(v) {
  return this.angle(v) * 180 / Math.PI
}
Vector.prototype.dot = function(v) {
  return this.x*v.x + this.y*v.y
}
Vector.prototype.cross = function(v) {
  if (typeof v == 'number') {				//don't know what that means
    return new Vector(-v*this.y, v*this.x)	//was used in tutorial on collision detection
  }
  return this.x*v.y - this.y*v.x
}
Vector.prototype.side = function(vStart, vEnd) { //test if 'this' point lies on the left (>0) or on the right (<0) side of vStart to vEnd vector
  var v = vStart.to(vEnd)
  var p = vStart.to(this)
  return v.cross(p)
}

//========================================= 'i*' - in-place methods
Vector.prototype.set = function(x, y) { /*don't change x or y if undefined or null passed*/
  if (typeof x != 'number' && x != null) {
    this.x = x.x
    this.y = x.y
    return this
  }
  if (x != null) this.x = x
  if (y != null) this.y = y
  return this
}

Vector.prototype.inorm = function() {
  this.idiv(this.length())
  return this
}
Vector.prototype.imul = function(n) {
  this.x *= n
  this.y *= n
  return this
}
Vector.prototype.idiv = function(n) {
  this.x /= n
  this.y /= n
  return this
}
Vector.prototype.iadd = function(v) {
  this.x += v.x
  this.y += v.y
  return this
}
Vector.prototype.isub = function(v) {
  this.x -= v.x
  this.y -= v.y
  return this
}
Vector.prototype.ito = function(v) {  /*get direction from 'this' to 'v'*/
  this.x = v.x - this.x
  this.y = v.y - this.y
  return this
}
Vector.prototype.irot = function(angle, p0) {  /*rotate around p0 || O*/
  if (p0) this.isub(p0)
  var x = this.x*Math.cos(angle) - this.y*Math.sin(angle)
  var y = this.x*Math.sin(angle) + this.y*Math.cos(angle)
  this.set(x, y)
  if (p0) this.iadd(p0)
  return this
}
Vector.prototype.irotDegr = function(angle, p0) {
  return this.irot(angle/180*Math.PI, p0)
}
Vector.prototype.iproj = function(p1, p2) {  /*project on p1 to p2 line*/
  if (!p2) {
    var angle = p1.angle()
    this.irot(-angle).set(null, 0).irot(angle)
    return this
  }
  this.isub(p1)
  var angle = p1.to(p2).angle()
  this.irot(-angle).set(null, 0).irot(angle)
  this.iadd(p1)
  return this
}
Vector.prototype.iperp = function(vStart, vEnd) {
  if (!vStart)
    return this.irot(Math.PI/2)
  var v = vStart.to(vEnd)
  var p = vStart.to(this)
  return p.mul(v.dot(v)).sub(v.mul(v.dot(p))).ineg()
}

//=========================================
Vector.prototype.clone = function() {
  return new Vector(this.x, this.y)
}

Vector.prototype.norm = function() {
  return this.clone().inorm()
}
Vector.prototype.mul = function(n) {
  return this.clone().imul(n)
}
Vector.prototype.div = function(n) {
  return this.clone().idiv(n)
}
Vector.prototype.add = function(v) {
  return this.clone().iadd(v)
}
Vector.prototype.sub = function(v) {
  return this.clone().isub(v)
}
Vector.prototype.to = function(v) {
  return this.clone().ito(v)
}
Vector.prototype.rot = function(angle, p0) {
  return this.clone().irot(angle, p0)
}
Vector.prototype.rotDegr = function(angle, p0) {
  return this.clone().irotDegr(angle, p0)
}
Vector.prototype.proj = function(p1, p2) {
  return this.clone().iproj(p1, p2)
}
Vector.prototype.perp = function(vStart, vEnd) {
  return this.clone().iperp(vStart, vEnd)
}
