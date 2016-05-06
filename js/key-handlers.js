var direction = {};

(function() {
    function onKeyDown( event ) {
        switch ( event.keyCode ) {
            case 38: // up
            case 87: // w
                direction.moveForward = true;
                break;

            case 37: // left
            case 65: // a
                direction.moveLeft = true; break;

            case 40: // down
            case 83: // s
                direction.moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                direction.moveRight = true;
                break;
        }
    }

    function onKeyUp(event) {
        switch(event.keyCode) {
            case 38: // up
            case 87: // w
                direction.moveForward = false;
                break;

            case 37: // left
            case 65: // a
                direction.moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                direction.moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                direction.moveRight = false;
                break;
        }
    }

    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );
}());