class Object{


    geometry; 
    material; 
    mesh;

    rotationVector;

    orbitSpeed = 0;

    orbitPoints = 0;

    constructor(geometry,material) {

       
        this.geometry= geometry;
    
        this.material = material;
        
    
        this.mesh = new THREE.Mesh(geometry,material);


        
       
    }





    getMesh (){
        return this.mesh;
    }

   

    

}