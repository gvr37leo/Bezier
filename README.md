Bezier class for smooth curves


`add(vector)`  
adds another vector to this one modifying itself

`iterate(callback(i))`  
calls the callback as many times as the vector has dimensions.
mainly meant to replace this code construct
```
for(var i = 0; i < this.dimensions;i++){
    console.log(this.get(i))
}
```