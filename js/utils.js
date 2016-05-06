var utils = {
    onWindowResize: function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    },
    getRandom: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    resetScene: function() {
        objects.forEach(function(object) {
            scene.remove(object);
        });
        objects = [];
        clock = new THREE.Clock();
        init(true);
    }
};