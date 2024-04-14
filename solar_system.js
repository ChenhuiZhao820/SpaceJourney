import * as THREE from "https://web.cs.manchester.ac.uk/three/three.js-master/build/three.module.js"
           
import { OrbitControls } from "https://web.cs.manchester.ac.uk/three/three.js-master/examples/jsm/controls/OrbitControls.js";


let width = window.innerWidth
let height = window.innerHeight


class Sphere extends THREE.Mesh {
    constructor(size, movspeed, rot_speed, xorbit, yorbit ,texture_path, redirect_path) {
      super()
      this.geometry = new THREE.SphereGeometry(size,size*3,size*3);

      var texture = loader.load(texture_path);


      this.material = new THREE.MeshPhongMaterial({ map: texture });
      
        this.rotationSpeed =  rot_speed;
        this.speed = movspeed;

        var curvestart = Math.random()*2*Math.PI;

        this.orbitX = xorbit;
        this.orbitY = yorbit;

        this.orbitPoints = new THREE.EllipseCurve(0,0,this.orbitX,this.orbitY, curvestart, curvestart+2*Math.PI  );

        this.redirect_path  = redirect_path;

        createOrbitLine(this.orbitPoints.getSpacedPoints(70));
      this.active = false
    }


    resetPosition(){
        this.position.x=0;// = new THREE.Vector3(0,0,0);
        this.position.y=0;
        this.position.z=0;
    }
    
  
    render() {


      this.rotation.y += this.rotationSpeed * rotationMultiplier;

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
        redirect(this.redirect_path);
    //   this.cubeActive = !this.cubeActive;
    }
  }





  class Group extends THREE.Group{

    constructor( movspeed, rot_speed, xorbit, yorbit, objects ) {
        super()
  
  
            objects.forEach( object => {
                this.add(object);
                //object.resetPosition();//position = new THREE.Vector3(0,0,0);
            });

          this.rotationSpeed =  rot_speed;
          this.speed = movspeed;

          this.orbitX = xorbit;
          this.orbitY = yorbit;
  
          var curvestart = Math.random()*2*Math.PI;
          this.orbitPoints = new THREE.EllipseCurve(0,0,this.orbitX,this.orbitY, curvestart, curvestart+2*Math.PI  );
  
        
  
  
         
  
        this.active = false
      }
    
      render() {
        this.rotation.y += this.rotationSpeed+ rotationMultiplier;
  
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


var earthGeometry; 
var earthMaterial; 
var earthMesh;

var moonGeometry;
var moonMaterial;
var moonMesh;




var saturnGeometry; 
var saturnMaterial; 
var saturnMesh;

var saturnRingsGeometry;
var saturnRingsMaterial; 
var saturnRingsMesh;




var earthSystemMesh;
var saturnSystemMesh;
var solarSystemMesh;

var orbitGeometry;
var orbitMaterial;
var orbitMesh;


var pointLight;
var ambientLight;


var timeSpeed = 0.00001; 



var rotationMultiplier = 0.01;





const loader = new THREE.TextureLoader();

var sunTexture = loader.load("textures/sun_texture.jpg");
var backgroundTexture = loader.load("textures/background_texture5.jpg");



var mouse = new THREE.Vector2()

var raycaster = new THREE.Raycaster()

var intersects = [];


// events
window.addEventListener('pointermove', (e) => {
    console.log("mouse moved")


    mouse.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1)
    raycaster.setFromCamera(mouse, camera)
    intersects = raycaster.intersectObjects(scene.children, true)
  
    // // If a previously hovered item is not among the hits we must call onPointerOut
    // Object.keys(hovered).forEach((key) => {
    //   const hit = intersects.find((hit) => hit.object.uuid === key)
    //   if (hit === undefined) {
    //     const hoveredItem = hovered[key]
    //     if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem)
    //     delete hovered[key]
    //   }
    // })
  
    // intersects.forEach((hit) => {
    //   // If a hit has not been flagged as hovered we must call onPointerOver
    //   if (!hovered[hit.object.uuid]) {
    //     hovered[hit.object.uuid] = hit
    //     //if (hit.object.onPointerOver) hit.object.onPointerOver(hit)
    //   }
    //   // Call onPointerMove
    //   if (hit.object.onPointerMove) hit.object.onPointerMove(hit)
    // })
});


window.addEventListener('click', (e) => {
    console.log("mouse clicked");
    intersects.forEach((hit) => {
      // Call onClick
      if (hit.object.onClick) hit.object.onClick(hit)
    })
  });


init();

var backgroundGeometry;
var backgroundMaterial;
var backgroundMesh;

var mercury = new Sphere(4,4.15,10,52,62,"textures/mercury_texture.jpg","redirect.html");
var venus = new Sphere(5,1.62,10,92.4,92.85,"textures/venus_texture.webp","redirect.html");

var earth = new Sphere(7,0,1,0,0,"textures/earth_texture.jpg","redirect.html");
var moon = new Sphere(2.5,1,0,12,12,"textures/moon_texture.jpg","moon.html");


var mars = new Sphere(5,0.53,10,140,145,"textures/mars_texture.jpg","redirect.html");

var jupiter = new Sphere(15,0.25,10,185,195,"textures/jupiter_texture.jpg","redirect.html");
var saturn = new Sphere(12,0.3,10,232,234,"textures/saturn_texture.jpg","redirect.html");
var uranus = new Sphere(9,0.15,10,295,298,"textures/uranus_texture.jpg","redirect.html");
var neptune = new Sphere(6.5,0.12,10,334,339,"textures/neptune_texture.jpg","redirect.html");


scene.add(mercury);
scene.add(venus);


// scene.add(moon);
scene.add(earth);
scene.add(moon);

earthSystemMesh = new THREE.Group();
earthSystemMesh.add(earth);
earthSystemMesh.add(moon);


var earthSystemOrbitPoints = new THREE.EllipseCurve(0,0,120,120,0,2*Math.PI );

createOrbitLine(earthSystemOrbitPoints.getSpacedPoints(70));
console.log(earthSystemOrbitPoints);earthSystemOrbitPoints

// var earthSystem = new Group(0,0,1200,1200,[moon]);


scene.add(earthSystemMesh);

console.log(moon);
// console.log(earthSystem);
console.log(earth);

scene.add(mars);
scene.add(jupiter);
scene.add(saturn);
scene.add(uranus);

scene.add(neptune);


animate();


// var center = new Sphere(50, 0, 0, 0, 0, "sun_texture.jpg");

// var mercury = new Sphere(40,0,1,0,0,"mercury_texture.jpg");



// var test = new Sphere(10,10,0,120,120,"jupiter_texture.jpg");
// scene.add(center);

// scene.add(test);
// scene.add(mercury);


// var group = new Group(1,0,500,520,[test,mercury]);
// var test = new Sphere(200,50,10,300,300,"jupiter_texture.jpg");


// scene.add(group);


function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    


  
    camera.position.set(0,30,500);



    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    createSolarSystem();
    createBackground();

    createLight();

    createControls();







}


function redirect(path){
    window.location.pathname= path;
}


function createOrbitLine(points){

    var orbitgeometry = new THREE.BufferGeometry().setFromPoints( points);
    var orbitmaterial = new THREE.LineBasicMaterial({
                                                    color: 0xffffff
                                                });

    var orbitmesh = new THREE.Line(orbitgeometry,orbitmaterial);

    scene.add(orbitmesh);
    

}

function createBackground(){

    backgroundGeometry= new THREE.SphereGeometry(1000,80,80);

    backgroundMaterial = new THREE.MeshStandardMaterial(
        {
            map:backgroundTexture,
            side:THREE.DoubleSide
        }
    );

    backgroundMesh = new THREE.Mesh(backgroundGeometry,backgroundMaterial);
    
    scene.add(backgroundMesh);  

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



function createSun(){
    sunGeometry= new THREE.SphereGeometry(35,35,35);

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
 




}


function createControls(){
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
}



function createLight(){

    pointLight = new THREE.PointLight( 0xffffff, 1, 0,0 );

    scene.add(pointLight);

    ambientLight = new THREE.AmbientLight( 0x404040,1 ); // soft white light
    scene.add(ambientLight);

}


function moveEarthSystem(){

    let speed = 1;

    var time = timeSpeed * performance.now();
  
  
    var newPoint = earthSystemOrbitPoints.getPoint((time * speed) % 1 );
    earthSystemMesh.position.x = newPoint.x;
    earthSystemMesh.position.y = newPoint.y;

}





function animate(){


    scene.traverse((obj) => {
        if (obj.render) obj.render()
      });

      moveEarthSystem();
    
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

