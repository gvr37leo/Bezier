class Bezier{

    constructor(p0,p1,p2,p3){
        this.p0 = p0;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        var numberOfWaypoints = Math.ceil(Bezier.calcLength(this.computeWaypoints(4)) / 10)
        this.waypoints = this.computeWaypoints(numberOfWaypoints)
    }

    static tween(t, waypoints){
        var lm1 = waypoints.length - 1;
        var low = Math.floor(lm1 * t)
        var high = Math.ceil(lm1 * t)
        return waypoints[low].lerp(waypoints[high],t*lm1 - Math.floor(t*lm1))
    }

    static path(pointArray){
        var beziers = [];
        for(var i = 0; i < pointArray.length - 1; i+=3){
            beziers.push(new Bezier(pointArray[i],pointArray[i + 1],pointArray[i + 2],pointArray[i + 3]))
        }
        var waypoints = [];
        for(var bezier of beziers){
            waypoints = waypoints.concat(bezier.waypoints)
        }
        return Bezier.computeConstantWaypoints(waypoints, waypoints.length);
    }

    static computeConstantWaypoints(waypoints,numberOfWaypoints){
        var constantWaypoints = [];
        var length = Bezier.calcLength(waypoints);
        var waypointI = 0;
        var lengthPerWaypoint = length / numberOfWaypoints
        var distTraveled = 0;
        var nextMark = lengthPerWaypoint;
        
        constantWaypoints.push(waypoints[0].c())
        var distToNextWaypoint = waypoints[waypointI].dist(waypoints[waypointI + 1])
        for(var i = 1; i < numberOfWaypoints; i++){
            while(true){
                if(nextMark < distTraveled + distToNextWaypoint){//section longer than lpw
                    var smallDist = lengthPerWaypoint * i - distTraveled;
                    var ratioToConstantWaypoint = smallDist / distToNextWaypoint
                    constantWaypoints.push(waypoints[waypointI].lerp(waypoints[waypointI + 1], ratioToConstantWaypoint))
                    break;
                }else{//jumped over a waypoint
                    distTraveled += distToNextWaypoint
                    waypointI++
                    distToNextWaypoint = waypoints[waypointI].dist(waypoints[waypointI + 1])
                }
            }
            nextMark += lengthPerWaypoint;
        }
        constantWaypoints.push(waypoints[waypoints.length - 1].c())
        return constantWaypoints;
    }

    static calcLength(waypoints){
        var length = 0;
        for(var i = 1; i < waypoints.length; i++){
            length += waypoints[i].dist(waypoints[i - 1])
        }
        return length;
    }

    computeWaypoints(numberOfWaypoints){
        var detail = 1 / numberOfWaypoints;
        var waypoints = [];
        for(var t = 0; t < 1; t += detail){
            waypoints.push(Bezier.getBezierPoint(t, this.p0,this.p1,this.p2,this.p3))
        }
        waypoints.push(Bezier.getBezierPoint(1, this.p0,this.p1,this.p2,this.p3))
        return waypoints;
    }

    static getBezierPoint(t,p0,p1,p2,p3){
        var u = 1 - t;
        var tt = t*t;
        var uu = u * u;
        var uuu = uu * u;
        var ttt = tt * t;

        var p = p0.c().scale(uuu);
        p.add(p1.c().scale(3 * uu * t))
        p.add(p2.c().scale(3 * u * tt))
        p.add(p3.c().scale(ttt))
        return p;
    }
}

function sinewave(period){
    return Math.sin(time * Math.PI * 2 / period - Math.PI / 2) * 0.5 + 0.5
}

function trianglewave(period){
    return Math.abs(mod((time / period - 0.5), 1) - 0.5) * 2
}