window.onload = function() {
    var circle = document.getElementById('circle');
    var point = document.getElementById('point');
    var angleDisplay = document.getElementById('angle');
    var trigValuesDisplay = document.getElementById('trigValues');
    var radius = circle.offsetWidth / 2;

    // Initialize the point position and angle
    var angle = 0;
    var centerX = circle.offsetLeft + radius;
    var centerY = circle.offsetTop + radius;
    var pointX = centerX + radius * Math.cos(angle);
    var pointY = centerY + radius * Math.sin(angle);
    point.style.left = pointX - point.offsetWidth / 2 + 'px';
    point.style.top = pointY - point.offsetHeight / 2 + 'px';
    updateAngleDisplay(angle);
    updateTrigValues(angle);

    // Function to calculate angle from point to center
    function getAngle(x, y) {
        return Math.atan2(y - centerY, x - centerX);
    }

    // Function to update point position and angle display
    function updatePointPosition(event) {
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        var newAngle = getAngle(mouseX, mouseY);
        var newX = centerX + radius * Math.cos(newAngle);
        var newY = centerY + radius * Math.sin(newAngle);
        point.style.left = newX - point.offsetWidth / 2 + 'px';
        point.style.top = newY - point.offsetHeight / 2 + 'px';
        angle = newAngle;
        if (angle < 0) {
            angle += 2 * Math.PI;
        } else if (angle >= 2 * Math.PI) {
            angle -= 2 * Math.PI;
        }
        updateAngleDisplay(angle);
        updateTrigValues(angle);
    }

    // Function to update angle display
    function updateAngleDisplay(angle) {
        var degrees = (angle * 180 / Math.PI).toFixed(2);
        angleDisplay.innerText = 'Angle: ' + degrees + '°';
    }

    // Function to update trigonometric values display
    function updateTrigValues(angle) {
        var cosValue = Math.cos(angle).toFixed(2);
        var sinValue = Math.sin(angle).toFixed(2);
        trigValuesDisplay.innerHTML = 'cos' + `(${(angle * 180 / Math.PI).toFixed(1)}°) = ` + cosValue + '<br>' + 'sin: ' + `(${(angle * 180 / Math.PI).toFixed(1)}°) = ` + sinValue;
    }

    // Mouse down event listener
    point.addEventListener('mousedown', function(event) {
        // Prevent default drag behavior
        event.preventDefault();

        // Mouse move event listener
        function onMouseMove(event) {
            updatePointPosition(event);
        }

        // Mouse up event listener
        function onMouseUp() {
            // Remove mouse move and mouse up event listeners
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        // Add mouse move and mouse up event listeners
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
};
