function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/.test(navigator.userAgent);
}

function setUpControl() {
    // Use the flag to choose the appropriate controls
    if (isMobileDevice()===true) {
        // Mobile device: Enable device orientation controls
        console.log("Mobile device detected!");
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false; 
        controls.enablePan = false; 
        controls.enableRotate = true; // Allow rotating
        controls.enableKeys = false;
        controls.minDistance = 200;
        controls.maxDistance = 200;
        // vertical orbit angle
        controls.minPolarAngle = Math.PI * 0.5; // radians
        controls.maxPolarAngle = Math.PI * 0.5; // radians
        // herizontal orbit angle
        //this.minAzimuthAngle = 0; // radians, default -Infinity
        //this.maxAzimuthAngle = 0; // radians, default Infinity
        controls.enabled = true; // Disable controls initially
        controls.update();
    } else {
        // Orbit Controls - initially disabled
        // Non-mobile device: Enable OrbitControls
        console.log("Non-mobile device detected!");

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false; 
        controls.enablePan = false; 
        controls.enableRotate = true; // Allow rotating
        controls.enableKeys = false;
        controls.minDistance = 200;
        controls.maxDistance = 200;
        // vertical orbit angle
        controls.minPolarAngle = Math.PI * 0.45; // radians
        controls.maxPolarAngle = Math.PI * 0.7; // radians
        // herizontal orbit angle
        //this.minAzimuthAngle = 0; // radians, default -Infinity
        //this.maxAzimuthAngle = 0; // radians, default Infinity
        controls.enabled = true; // Disable controls initially
        controls.update();
    }
}