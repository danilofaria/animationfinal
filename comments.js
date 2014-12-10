// var two_ds_scene = new TwoDScene(4);
// two_ds_scene.setPosition(1,[1,1,1]);
// two_ds_scene.setPosition(2,[2,0,2]);
// two_ds_scene.setPosition(3,[2,6,2]);
// var simple_gravity = new SimpleGravityForce(math.matrix([0.4,-1,2]));
// two_ds_scene.insertForce(simple_gravity);
// for (i = 0; i < two_ds_scene.num_particles; i++) {
//   two_ds_scene.setM(i,1);
//   two_ds_scene.radii[i]=i/4;
//   two_ds_scene.isFixed[i] = false;
// }

var sunMaterial = 
  new THREE.MeshLambertMaterial( { color: 0x666666, emissive: 0xffff00, ambient: 0x000000, shading: THREE.SmoothShading } );
// create the sphere's material
var sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000//, wireframe:true
    });

  // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// set its position
// pointLight.position.x = 10;
// pointLight.position.y = 50;
// pointLight.position.z = 130;
// add to the scene
// scene.add(pointLight);
