# vector2d
Simple javascript 2d vector library.

Class methods/members:
```
Vector.i`
Vector.j`
Vector.tripleProduct(a, b, c)`
```

Instance methods/members (`var vec = new Vector(x, y)`):
```
vec.x
vec.y
vec.toString()
vec.lengthSq()
vec.lengthSq(v)
vec.length()
vec.length(v)
vec.angle()
vec.angle(v)
vec.angleDegr()
vec.angleDegr(v)
vec.dot(v)
vec.cross(v)
vec.side(vStart, vEnd)

vec.set(v)
vec.set(x, y)
vec.inorm()
vec.imul(n)
vec.idiv(n)
vec.iadd(v)
vec.isub(v)
vec.ito(v)
vec.irot(angle)
vec.irotDegr(angle)
vec.iproj(p1)
vec.iproj(p1, p2)
vec.iperp(vStart, vEnd)

vec.clone()
vec.norm()
vec.mul(n)
vec.div(n)
vec.add(v)
vec.sub(v)
vec.to(v)
vec.rot(angle)
vec.rotDegr(angle)
vec.proj(p1)
vec.proj(p1, p2)
vec.perp(vStart, vEnd)
```
