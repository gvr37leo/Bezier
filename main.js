var ctxt = createCanvasGetContext(400,500)
var controlPoints = [new Vector2(10,10),new Vector2(10,300),new Vector2(200,300),new Vector2(200,200)
    ,new Vector2(200,100), new Vector2(300,150), new Vector2(350,200)
];
var width = 10;
var time = 0;
var bezier = new Bezier(controlPoints[0],controlPoints[1],controlPoints[2],controlPoints[3])
var bezierPath = Bezier.pathFromPoints(controlPoints)

function sinewave(period){
    return Math.sin(time * Math.PI * 2 / period - Math.PI / 2) * 0.5 + 0.5
}

function trianglewave(period){
    return Math.abs(mod((time / period - 0.5), 1) - 0.5) * 2
}

loop((dt)=>{
    var wave = trianglewave(20)
    time += dt / 1000;
    ctxt.clearRect(0, 0, 400, 400);

    ctxt.fillStyle  = "black"
    for(point of controlPoints)ctxt.fillRect(point.x,point.y,width,width);
    ctxt.fillStyle  = "blue"
    for(point of bezierPath)ctxt.fillRect(point.x,point.y,width/2,width/2);
    // ctxt.fillStyle  = "red"
    // for(point of bezier.bezierPath)ctxt.fillRect(point.x,point.y,width/2,width/2);
    ctxt.fillStyle  = "black"
    var point = Bezier.tween(wave,bezierPath)
    // var point = Bezier.getBezierPoint(wave ,controlPoints[0],controlPoints[1],controlPoints[2],controlPoints[3])
    ctxt.fillRect(point.x,point.y,width,width)
})