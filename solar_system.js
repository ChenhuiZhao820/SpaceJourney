import * as THREE from "https://web.cs.manchester.ac.uk/three/three.js-master/build/three.module.js"
           
import { OrbitControls } from "https://web.cs.manchester.ac.uk/three/three.js-master/examples/jsm/controls/OrbitControls.js";




class Sphere extends THREE.Mesh {
    constructor(size, movspeed, rot_speed, xorbit, yorbit ,texture_path) {
      super()
      this.geometry = new THREE.SphereGeometry(size,size,size)

      var texture = loader.load(texture_path);


      this.material = new THREE.MeshPhongMaterial({ map: texture });
      
        this.rotationSpeed =  rot_speed;
        this.speed = movspeed;

        var curvestart = Math.random()*2*Math.PI;

        this.orbitX = xorbit;
        this.orbitY = yorbit;

        this.orbitPoints = new THREE.EllipseCurve(0,0,this.orbitX,this.orbitY, curvestart, curvestart+2*Math.PI  );



        


       

      this.active = false
    }
  
    render() {
      this.rotation.y += this.rotationSpeed;

      var time = timeSpeed * performance.now();


        var newPoint = this.orbitPoints.getPoint((time * this.speed) % 1 );
        this.position.x = newPoint.x;
        this.position.y = newPoint.y;

    }
  
    
    onPointerOver(e) {
      this.material.color.set('hotpink')
      this.material.color.convertSRGBToLinear()
    }
  
    onPointerOut(e) {
      this.material.color.set('orange')
      this.material.color.convertSRGBToLinear()
    }
  
    onClick(e) {
        console.log("object clicked");
      this.cubeActive = !this.cubeActive;
    }
  }

  class Group extends THREE.Group{

    constructor( movspeed, rot_speed, xorbit, yorbit, objects ) {
        super()
  
  
            objects.forEach( object => {
                this.add(object);
            });

          this.rotationSpeed =  rot_speed;
          this.speed = movspeed;
  
          var curvestart = Math.random()*2*Math.PI;
          this.orbitPoints = new THREE.EllipseCurve(0,0,this.orbitX,this.orbitY, curvestart, curvestart+2*Math.PI  );
  
          this.orbitX = xorbit;
          this.orbitY = yorbit;
  
  
         
  
        this.active = false
      }
    
      render() {
        this.rotation.y += this.rotationSpeed;
  
        var time = timeSpeed * performance.now();
  
  
          var newPoint = this.orbitPoints.getPoint((time * this.speed) % 1 );
          this.position.x = newPoint.x;
          this.position.y = newPoint.y;
      }
    

  }

var scene ;
var camera ;
var renderer ;

var controls;



var sunGeometry; 
var sunMaterial; 
var sunMesh;





var mercuryGeometry; 
var mercuryMaterial; 
var mercuryMesh;

var venusGeometry; 
var venusMaterial; 
var venusMesh;

var earthGeometry; 
var earthMaterial; 
var earthMesh;

var moonGeometry;
var moonMaterial;
var moonMesh;

var marsGeometry; 
var marsMaterial; 
var marsMesh;

var jupiterGeometry; 
var jupiterMaterial; 
var jupiterMesh;

var saturnGeometry; 
var saturnMaterial; 
var saturnMesh;

var saturnRingsGeometry;
var saturnRingsMaterial; 
var saturnRingsMesh;

var uranusGeometry; 
var uranusMaterial; 
var uranusMesh;

var neptuneGeometry; 
var neptuneMaterial; 
var neptuneMesh;





var earthSystemMesh;
var saturnSystemMesh;
var solarSystemMesh;

var orbitGeometry;
var orbitMaterial;
var orbitMesh;


var pointLight;
var ambientLight;

var orbitPoints = [];
var trackingOrbit;


var mercuryOrbitPoints = new THREE.EllipseCurve(0,0,139.5,211.5);
var venusOrbitPoints = new THREE.EllipseCurve(0,0,324,328.5,0.5,0.5+2*Math.PI);
var earthOrbitPoints = new THREE.EllipseCurve(0,0,450,459,1.7,1.7+2*Math.PI);
var marsOrbitPoints = new THREE.EllipseCurve(0,0,551,651.5,0.6,0.6+2*Math.PI);
var jupiterOrbitPoints = new THREE.EllipseCurve(0,0,750,810,2.7,2.7+2*Math.PI);
var saturnOrbitPoints = new THREE.EllipseCurve(0,0,920,940,4.2,4.2+2*Math.PI);
var uranusOrbitPoints = new THREE.EllipseCurve(0,0,950,970,6,6+2*Math.PI);
var neptuneOrbitPoints = new THREE.EllipseCurve(0,0,1000,1040,3.5,3.5+2*Math.PI);


var timeSpeed = 0.00005; 

var mercurySpeed = 4.15;
var venusSpeed = 1.62;
var earthSpeed = 1;
var marsSpeed = 0.53;
var jupiterSpeed = 0.3;
var saturnSpeed = 0.2;
var uranusSpeed = 0.15;
var neptuneSpeed = 0.12;


var rotationMultiplier = 3;

var mercuryRotationSpeed = 0.06;
var venusRotationSpeed = 0.82;
var earthRotationSpeed = 1;
var marsRotationSpeed = 0.11;
var jupiterRotationSpeed = 317.89;
var saturnRotationSpeed = 95.17;
var uranusRotationSpeed = 14.56;
var neptuneRotationSpeed = 17.24;




const loader = new THREE.TextureLoader();

var sunTexture = loader.load("sun_texture.jpg");
var moonTexture = loader.load("moon_texture.jpg");
var mercuryTexture = loader.load("mercury_texture.jpg");
var venusTexture = loader.load("venus_texture.webp");
var earthTexture = loader.load("earth_texture.jpg");
var marsTexture = loader.load("mars_texture.jpg");
var jupiterTexture = loader.load("jupiter_texture.jpg");
var saturnTexture = loader.load("saturn_texture.jpg");
var saturnRingsTexture = loader.load("saturn_rings_texture.png");

var uranusTexture = loader.load("uranus_texture.jpg");
var neptuneTexture = loader.load("neptune_texture.jpg");




var backgroundTexture = loader.load("background_texture5.jpg");


var mouse = new THREE.Vector2()

var raycaster = new THREE.Raycaster()




// events
// window.addEventListener('pointermove', (e) => {
//     console.log("mouse moved")


//     mouse.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1)
//     raycaster.setFromCamera(mouse, camera)
//     intersects = raycaster.intersectObjects(scene.children, true)
  
//     // If a previously hovered item is not among the hits we must call onPointerOut
//     Object.keys(hovered).forEach((key) => {
//       const hit = intersects.find((hit) => hit.object.uuid === key)
//       if (hit === undefined) {
//         const hoveredItem = hovered[key]
//         if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem)
//         delete hovered[key]
//       }
//     })
  
//     intersects.forEach((hit) => {
//       // If a hit has not been flagged as hovered we must call onPointerOver
//       if (!hovered[hit.object.uuid]) {
//         hovered[hit.object.uuid] = hit
//         if (hit.object.onPointerOver) hit.object.onPointerOver(hit)
//       }
//       // Call onPointerMove
//       if (hit.object.onPointerMove) hit.object.onPointerMove(hit)
//     })
// });


window.addEventListener('click', (e) => {
    console.log("mouse clicked");
    // intersects.forEach((hit) => {
    //   // Call onClick
    //   if (hit.object.onClick) hit.object.onClick(hit)
    // })
  });


init();
animate();

// var mercury = new Sphere(400,10,10,300,300,"jupiter_texture.jpg");
// var mercury = new Sphere(400,10,10,300,300,"jupiter_texture.jpg");
// var mercury = new Sphere(400,10,10,300,300,"jupiter_texture.jpg");
// var mercury = new Sphere(400,10,10,300,300,"jupiter_texture.jpg");

// var mercury = new Sphere(400,10,10,300,300,"jupiter_texture.jpg");
// var mercury = new Sphere(400,10,10,300,300,"jupiter_texture.jpg");
// var mercury = new Sphere(400,10,10,300,300,"jupiter_texture.jpg");
var mercury = new Sphere(40,0,0,0,0,"mercury_texture.jpg");



var test = new Sphere(15,1,1,60,60,"jupiter_texture.jpg");
scene.add(test);
scene.add(mercury);


var group = new Group(10,5,400,400,[mercury,test])
// var test = new Sphere(200,50,10,300,300,"jupiter_texture.jpg");


scene.add(group);


function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    


  
    camera.position.set(0,30,2000);



    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    createSolarSystem();


    createLight();

    createControls();


    createOrbit();



    trackingOrbit = earthSystemMesh;


}


function createOrbit(){

    // var points =[]
    // for(var i=0; i<100; i++ ){
    //     points.push(new THREE.Vector3(0,0,0))
    // }

    orbitGeometry = new THREE.BufferGeometry();//.setFromPoints(points);

    // attributes
    var positions = new Float32Array( 100 * 3 ); // 3 vertices per point
    orbitGeometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

    orbitMaterial = new THREE.LineBasicMaterial({
                                                    color: 0xffffff
                                                });

    orbitMesh = new THREE.Line(orbitGeometry,orbitMaterial);

    scene.add(orbitMesh);


}


function createMercury(){

    mercuryGeometry= new THREE.SphereGeometry(9.5785,19.157,19.157);


    mercuryMaterial = new THREE.MeshPhongMaterial(
        {
             map: mercuryTexture,
            //color: 0x0000ff
        }
    );

    mercuryMesh = new THREE.Mesh(mercuryGeometry,mercuryMaterial);


    scene.add(mercuryMesh);
}

function createVenus(){

    venusGeometry= new THREE.SphereGeometry(25,50,50);


    venusMaterial = new THREE.MeshPhongMaterial(
        {
             map: venusTexture,
            //color: 0x0000ff
        }
    );

    venusMesh = new THREE.Mesh(venusGeometry,venusMaterial);


    scene.add(venusMesh);
}

function createMoon(){
    moonGeometry= new THREE.SphereGeometry(5,8,5);

    moonMaterial = new THREE.MeshPhongMaterial(
        {
            //color: 0x0000ff
            map: moonTexture,        
        }
    );

    moonMesh = new THREE.Mesh(moonGeometry,moonMaterial);

    scene.add(moonMesh);
}

function createEarth(){
    earthGeometry= new THREE.SphereGeometry(25,50,50);


    earthMaterial = new THREE.MeshPhongMaterial(
        {
             map: earthTexture,
            //color: 0x0000ff
        }
    );

    earthMesh = new THREE.Mesh(earthGeometry,earthMaterial);

    scene.add(earthMesh);
    


    earthMesh.rotation.z += 0.15*Math.PI
    console.log(earthMesh.position);
}







function createEarthSystem(){

    createEarth();
    createMoon();

    earthSystemMesh = new THREE.Group();


    earthSystemMesh.add(earthMesh);
    earthSystemMesh.add(moonMesh);


    earthSystemMesh.position.x = 150;
    earthSystemMesh.position.y = 0;
    earthSystemMesh.position.z = 0;

    moonMesh.position.x = 75;

    scene.add(earthSystemMesh);

}


function createMars(){

    marsGeometry= new THREE.SphereGeometry(13.315,26.62,26.62);


    marsMaterial = new THREE.MeshPhongMaterial(
        {
             map: marsTexture,
            //color: 0x0000ff
        }
    );

    marsMesh = new THREE.Mesh(marsGeometry,marsMaterial);


    scene.add(marsMesh);
}


function createJupiter(){

    jupiterGeometry= new THREE.SphereGeometry(75,150,150);


    jupiterMaterial = new THREE.MeshPhongMaterial(
        {
             map: jupiterTexture,
            //color: 0x0000ff
        }
    );

    jupiterMesh = new THREE.Mesh(jupiterGeometry,jupiterMaterial);


    scene.add(jupiterMesh);
}

function createSaturn(){

    saturnGeometry= new THREE.SphereGeometry(65,120,120);


    saturnMaterial = new THREE.MeshPhongMaterial(
        {
             map: saturnTexture,
            //color: 0x0000ff
        }
    );

    saturnMesh = new THREE.Mesh(saturnGeometry,saturnMaterial);


    scene.add(saturnMesh);
}

function createSaturnRings(){

    saturnRingsGeometry= new THREE.RingGeometry(80,140,140);


    saturnRingsMaterial = new THREE.MeshBasicMaterial(
        {
             map: saturnRingsTexture,
             opacity: 0.1
            //color: 0x0000ff
        }
    );

    saturnRingsMesh = new THREE.Mesh(saturnRingsGeometry,saturnRingsMaterial);


    scene.add(saturnRingsMesh);
}

function createSaturnSystem(){
    createSaturn();
    createSaturnRings();

    saturnSystemMesh = new THREE.Group();

    saturnSystemMesh.add(saturnMesh);
    saturnSystemMesh.add(saturnRingsMesh);

    scene.add(saturnSystemMesh);

}

function createUranus(){

    uranusGeometry= new THREE.SphereGeometry(40,90,90);


    uranusMaterial = new THREE.MeshPhongMaterial(
        {
             map: uranusTexture,
            //color: 0x0000ff
        }
    );

    uranusMesh = new THREE.Mesh(uranusGeometry,uranusMaterial);


    scene.add(uranusMesh);
}

function createNeptune(){

    neptuneGeometry= new THREE.SphereGeometry(35,65,65);


    neptuneMaterial = new THREE.MeshPhongMaterial(
        {
             map: neptuneTexture,
            //color: 0x0000ff
        }
    );

    neptuneMesh = new THREE.Mesh(neptuneGeometry,neptuneMaterial);


    scene.add(neptuneMesh);
}


function createSun(){
    sunGeometry= new THREE.SphereGeometry(109,400,200);

    sunMaterial = new THREE.MeshStandardMaterial(
                    {
                        emissive: 0xffd700,
                        emissiveMap: sunTexture,
                        emissiveIntensity: 1,
                        
                    }
                );

    sunMesh = new THREE.Mesh(sunGeometry,sunMaterial);
                
    scene.add(sunMesh);

}

function createSolarSystem(){
    createSun();
    createMercury();
    createVenus()
    createEarthSystem();
    createMars();
    createJupiter();
    createSaturnSystem();
    createUranus();
    createNeptune();

    solarSystemMesh = new THREE.Group();

    solarSystemMesh.add(sunMesh);
    solarSystemMesh.add(mercuryMesh);
    solarSystemMesh.add(venusMesh);
    solarSystemMesh.add(earthSystemMesh);
    solarSystemMesh.add(marsMesh);
    solarSystemMesh.add(jupiterMesh);
    solarSystemMesh.add(saturnSystemMesh);
    solarSystemMesh.add(uranusMesh);
    solarSystemMesh.add(neptuneMesh);


    scene.add(solarSystemMesh);

}


function createControls(){
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
}



function createLight(){

    pointLight = new THREE.PointLight( 0xffffff, 1, 0,0 );

    //light.position.set( 50, 50, 50 );
    scene.add(pointLight);

    ambientLight = new THREE.AmbientLight( 0x404040,1 ); // soft white light
    scene.add(ambientLight);

}

var orbitIndex =0
function trackOrbit(){

    if(trackingOrbit!=null){
        // orbitPoints.push(new THREE.Vector3(trackingOrbit.position.x,
        //     trackingOrbit.position.y,
        //     trackingOrbit.position.z));
        // orbitMesh.geometry.vertices.push(new THREE.Vector3(trackingOrbit.position.x,
        //                                                     trackingOrbit.position.y,
        //     trackingOrbit.position.z));


        orbitIndex+=1;
        orbitIndex=orbitIndex%100;
        //orbitMesh.geometry = orbitGeometry;
        //createOrbit(orbitPoints);



        var positionAttribute = orbitMesh.geometry.getAttribute( 'position' );

        let x = trackingOrbit.position.x, y = trackingOrbit.y, z = trackingOrbit.z;
        positionAttribute.setXYZ( orbitIndex, x, y, z );

        
    }

    //orbitPoints.shift();


    
}

function resetOrbit(){
    orbitPoints = [];

}

var click = 0;


function movePlanets(){
    var time = timeSpeed * performance.now();

    // var t = (time % 1);

    var mercurypoint = mercuryOrbitPoints.getPoint((time *mercurySpeed) % 1 );
    mercuryMesh.position.x = mercurypoint.x;
    mercuryMesh.position.y = mercurypoint.y;
    
    var venuspoint = venusOrbitPoints.getPoint((time * venusSpeed) % 1);
    venusMesh.position.x = venuspoint.x;
    venusMesh.position.y = venuspoint.y;

    var earthpoint = earthOrbitPoints.getPoint((time * earthSpeed) % 1);
    earthSystemMesh.position.x = earthpoint.x;
    earthSystemMesh.position.y = earthpoint.y;

    var marspoint = marsOrbitPoints.getPoint((time * marsSpeed) % 1);
    marsMesh.position.x = marspoint.x;
    marsMesh.position.y = marspoint.y;

    var jupiterpoint = jupiterOrbitPoints.getPoint((time * jupiterSpeed) % 1);
    jupiterMesh.position.x = jupiterpoint.x;
    jupiterMesh.position.y = jupiterpoint.y;

    var saturnpoint = saturnOrbitPoints.getPoint((time * saturnSpeed) % 1);
    saturnSystemMesh.position.x = saturnpoint.x;
    saturnSystemMesh.position.y = saturnpoint.y;

    var uranuspoint = uranusOrbitPoints.getPoint((time * uranusSpeed) % 1);
    uranusMesh.position.x = uranuspoint.x;
    uranusMesh.position.y = uranuspoint.y;

    var neptunepoint = neptuneOrbitPoints.getPoint((time * neptuneSpeed) % 1);
    neptuneMesh.position.x = neptunepoint.x;
    neptuneMesh.position.y = neptunepoint.y;
}

function rotatePlanets(){
    mercuryMesh.rotation.y += mercuryRotationSpeed * rotationMultiplier;
    venusMesh.rotation.y += venusRotationSpeed * rotationMultiplier;
    earthMesh.rotation.y += earthRotationSpeed * rotationMultiplier;
    marsMesh.rotation.y += marsRotationSpeed * rotationMultiplier;
    jupiterMesh.rotation.y += jupiterRotationSpeed * rotationMultiplier;
    saturnMesh.rotation.y += saturnRotationSpeed * rotationMultiplier;
    uranusMesh.rotation.y += uranusRotationSpeed * rotationMultiplier;
    neptuneMesh.rotation.y += neptuneRotationSpeed * rotationMultiplier;


}



function animate(){

    orbitMesh.geometry.verticesNeedUpdate = true;

    scene.traverse((obj) => {
        if (obj.render) obj.render()
      })

    
    movePlanets();
 
   rotatePlanets();

  



    
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}