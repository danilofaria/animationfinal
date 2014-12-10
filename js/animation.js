THREE.ImageUtils.crossOrigin = '';

var materials = [];
var transp_material = new THREE.MeshBasicMaterial( { color: 0x555555, transparent: true, blending: THREE.AdditiveBlending } );
var shininess = 0, specular = 0x333333, bumpScale = 1, shading = THREE.SmoothShading;
var earthTexture = THREE.ImageUtils.loadTexture( "https://dl.dropboxusercontent.com/u/25861113/planet_textures/earth.png" );
earthTexture.wrapS = earthTexture.wrapT = THREE.RepeatWrapping;
earthTexture.anisotropy = 16;

var mercuryTexture = THREE.ImageUtils.loadTexture( "https://dl.dropboxusercontent.com/u/25861113/planet_textures/mercury.png" );
mercuryTexture.wrapS = mercuryTexture.wrapT = THREE.RepeatWrapping;
mercuryTexture.anisotropy = 16;

materials.push( new THREE.MeshBasicMaterial( { color: 0xffff00, transparent: true, blending: THREE.AdditiveBlending } ) );
//materials.push( new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0xff0000, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true } ) );
materials.push( new THREE.MeshPhongMaterial( { map: earthTexture, bumpMap: earthTexture, bumpScale: bumpScale, color: 0xFFFFFF, ambient: 0x000000, specular: 0xffffff, shininess: shininess, metal: false, shading: shading } ) );
materials.push( new THREE.MeshPhongMaterial( { map: mercuryTexture, bumpMap: mercuryTexture, bumpScale: bumpScale, color: 0xFFFFFF, ambient: 0x000000, specular: 0xffffff, shininess: shininess, metal: false, shading: shading } ) );

var two_ds_scene = new TwoDScene(3);
two_ds_scene.setPosition(0, [-100,0,0]);
two_ds_scene.radii[0]=50;
two_ds_scene.setM(0,331436);
two_ds_scene.isFixed[0] = true;

two_ds_scene.setPosition(1, [0,0,0]);
two_ds_scene.setVelocity(1, [0,0,62.8316]);
two_ds_scene.radii[1]=20;
two_ds_scene.setM(1,1);
two_ds_scene.isFixed[1] = false;
var gravitational_force = new GravitationalForce(0,1,1.18419);
two_ds_scene.insertForce(gravitational_force);

two_ds_scene.setPosition(2, [0,0,0]);
two_ds_scene.setVelocity(2, [0,62.8316,0]);
two_ds_scene.radii[2]=30;
two_ds_scene.setM(2,4);
two_ds_scene.isFixed[2] = false;
var gravitational_force = new GravitationalForce(0,2,1.18419);
two_ds_scene.insertForce(gravitational_force);

// set the scene size
var WIDTH = window.innerWidth,//400,
  HEIGHT = window.innerHeight;//300;

// set some camera attributes
var VIEW_ANGLE = 75,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x0b0b0b, 1 );
renderer.setSize( WIDTH, HEIGHT );
var explicit_euler = new ExplicitEuler();
var dt = 0.01;
document.body.appendChild( renderer.domElement );

// set up the sphere vars
var radius = 0.8,
    segments = 16,
    rings = 16;

// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF, 1);
  
var particles = new Array(0);
for (i = 0; i < two_ds_scene.num_particles; i++) {
  var pos = two_ds_scene.getPosition(i).toArray()[0];
  radius = two_ds_scene.radii[i];

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
      radius, segments,rings),
    materials[i]);

  // var sphere2 = new THREE.Mesh(
  //   new THREE.SphereGeometry(
  //     radius+2, segments,rings),
  //   transp_material);
  // sphere.add(sphere2);

  sphere.position.x=pos[0];
  sphere.position.y=pos[1];
  sphere.position.z=pos[2];
  // add the sphere to the scene
  scene.add(sphere);
  if (i==0) sphere.add(pointLight);
  // if (i==1) sphere.add(camera);
  particles.push( sphere );
}


camera.position.z = 220;

var render = function () {
  two_ds_scene = explicit_euler.stepScene(two_ds_scene, dt)

// var pos = two_ds_scene.getPosition(1).toArray()[0];
// var vel = two_ds_scene.getVelocity(1).toArray()[0];
// camera.position.x = pos[0] //- vel[0];
// camera.position.y = pos[1] //- vel[1];
// camera.position.z = pos[2] //- vel[2];
// camera.lookAt(new THREE.Vector3( vel[0], vel[1], vel[2] ));

  for (i = 0; i < two_ds_scene.num_particles; i++) {
    var pos = two_ds_scene.getPosition(i).toArray()[0];
    var sphere = particles[i];
    sphere.position.x=pos[0];
    sphere.position.y=pos[1];
    sphere.position.z=pos[2];
    sphere.rotation.y += 0.01;
  }

	requestAnimationFrame( render );
	renderer.render(scene, camera);
};

  render();