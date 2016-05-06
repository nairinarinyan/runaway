var detectCollisions = (function() {
    var DELAY = 2.5;

    function initDetection(origin, targets) {
        var originPoint = cameraMesh.position.clone();
        var vertices = origin.geometry.vertices;

        for (var vertexIndex = 0; vertexIndex < vertices.length; vertexIndex++) {
            var localVertex = vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( origin.matrix );
            var directionVector = globalVertex.sub( origin.position );
            
            var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
            var collisionResults = ray.intersectObjects(targets);

            if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
                return true;
            }
        }
    }

    return function(origin, targets) {
        if (clock.elapsedTime >= DELAY) {
            return initDetection(origin, targets);
        }
    }
}());