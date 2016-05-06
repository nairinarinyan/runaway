init();
render();

function randomMove(objects) {
    var delta = clock.getDelta();

    objects.forEach(function(obj) {
        obj.position.add(obj.userData.direction);
        obj.userData.staticTime += 1000 * delta;

        if (obj.userData.staticTime >= interval) {
            obj.userData.direction = new THREE.Vector3(utils.getRandom(-1, 1), 0, utils.getRandom(-1, 1));
            interval = utils.getRandom(800, 3000);
            obj.userData.staticTime = 0;
        }
    });
}


function handleCollisions(detected) {
    if (detected && !resetGame) {
        utils.resetScene();
        resetGame = true;
        document.exitPointerLock();
        controlsEnabled = false;
    }
}

function controlMovement() {
    var delta = clock.getDelta();

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    if (direction.moveForward) velocity.z -= 400.0 * delta;
    if (direction.moveBackward) velocity.z += 400.0 * delta;

    if (direction.moveLeft) velocity.x -= 400.0 * delta;
    if (direction.moveRight) velocity.x += 400.0 * delta;

    controls.getObject().translateX( velocity.x * delta );
    controls.getObject().translateY( velocity.y * delta );
    controls.getObject().translateZ( velocity.z * delta );
}

function updateCamMesh() {
    var camPosition = controls.getObject().position;
    cameraMesh.position.x = camPosition.x;
    cameraMesh.position.y = camPosition.y;
    cameraMesh.position.z = camPosition.z;
}

function render() {
    requestAnimationFrame(render);

    if (controlsEnabled) {
        controlMovement();
        handleCollisions(detectCollisions(cameraMesh, objects));
    }

    randomMove(objects);
    updateCamMesh();

    renderer.render( scene, camera );
}