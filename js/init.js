var init = (function() {
    function initScene() {
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 0, 750);

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xffffff);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', utils.onWindowResize, false);
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    }

    function initLights() {
        var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
        light.position.set(0.5, 1, 0.75);
        scene.add(light);
    }

    function initControls() {
        controls = new THREE.PointerLockControls(camera);
        scene.add(controls.getObject());
    }

    function initGround() {
        var groundGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        groundGeometry.rotateX(- Math.PI / 2);

        for (var i = 0, l = groundGeometry.vertices.length; i < l; i++) {
            var vertex = groundGeometry.vertices[i];
            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;
        }

        for (var i = 0, l = groundGeometry.faces.length; i < l; i++) {
            var face = groundGeometry.faces[ i ];
            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        }

        var groundMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

        ground = new THREE.Mesh(groundGeometry, groundMaterial);
        scene.add(ground);
    }

    function initObjects(objectCount) {
        var boxGeometry = new THREE.BoxGeometry( 20, 20, 20 );

        for (var i = 0; i < objectCount; i++) {
            var material = new THREE.MeshPhongMaterial( { specular: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );

            var box = new THREE.Mesh(boxGeometry, material);
            box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
            box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
            box.position.y = 10;

            box.userData.staticTime = 0;
            box.userData.direction = new THREE.Vector3(utils.getRandom(-1, 1), 0, utils.getRandom(-1, 1));

            material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

            objects.push(box);
            scene.add(box);
        }

        // for detecting collisions with the camera
        cameraMesh = new THREE.Mesh(boxGeometry, material);
        scene.add(cameraMesh);
    }

    return function(reset) {
        if (!reset) {
            initScene();
            initCamera();
            initLights();
            initControls();
            initGround();
        }
        initObjects(BOX_COUNT);
    };
}());
