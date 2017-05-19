### Bezier class for smooth curves


Vector class comes from the vectorx package(it's in the depedencies) and can be 2d or 3d

Example to get a point halfway along a path. Points in the path are evenly spaced(approximately) so putting a lot of controlpoints near each other wont make the resulting points from the tween function bunch up.
```
var controlPoints = [new Vector2(10,10),new Vector2(10,300),new Vector2(200,300),new Vector2(200,200), new Vector2(200,100), new Vector2(300,150), new Vector2(350,200)];

var bezierPath = Bezier.path(controlPoints)
var point = Bezier.tween(0.5 ,bezierPath)
```
`static tween(t, waypoints:[Vector]): Vector`  
returns a vector along the waypoints with a weight of t, works similarly to lerping but with an array of vectors instead of only 2.

`static path(controlPoints:[Vector]):[Vector]`  
given a set of controlPoints returns an array of vectors that form a smooth line and are evenly spaced(approximately). the controlPoints should follow a specific pattern.    
![controlpoints order](http://devmag.org.za/blog/wp-content/uploads/2011/04/bezier_path.png)
