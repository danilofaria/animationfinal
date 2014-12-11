var mouse = new THREE.Vector2(), INTERSECTED, CAM_FOLLOW_i;
var mouse_clicked = false;
function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
function onDocumentMouseClick( event ) {
  event.preventDefault();
  mouse_clicked = true;
}
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'click', onDocumentMouseClick, false );

THREE.ImageUtils.crossOrigin = '';

var texture_dir = [
"https://dl.dropboxusercontent.com/u/25861113/planet_textures/sun.png",
"https://dl.dropboxusercontent.com/u/25861113/planet_textures/earth.png",
"https://dl.dropboxusercontent.com/u/25861113/planet_textures/mercury.png"
]
var materials = [];
var transp_material = new THREE.MeshBasicMaterial( { color: 0x555555, transparent: true, blending: THREE.AdditiveBlending } );
var shininess = 0, specular = 0x333333, bumpScale = 1, shading = THREE.SmoothShading;

for(var i=0; i<3; i++){
  var texture = THREE.ImageUtils.loadTexture( texture_dir[i] );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  if (i==0)
  materials.push( new THREE.MeshPhongMaterial( { map: texture, emissive: 0xffff00, bumpMap: texture, bumpScale: bumpScale, color: 0xFFFFFF, ambient: 0x000000, specular: 0xffffff, shininess: shininess, metal: false, shading: shading } ) );
  else
  materials.push( new THREE.MeshPhongMaterial( { map: texture, bumpMap: texture, bumpScale: bumpScale, color: 0xFFFFFF, ambient: 0x000000, specular: 0xffffff, shininess: shininess, metal: false, shading: shading } ) );
}

var two_ds_scene = new TwoDScene(3);
two_ds_scene.setPosition(0, [0,0,0]);
two_ds_scene.radii[0]=50;
two_ds_scene.setM(0,331436);
two_ds_scene.isFixed[0] = true;

two_ds_scene.setPosition(1, [100,0,0]);
two_ds_scene.setVelocity(1, [0,0,62.8316]);
two_ds_scene.radii[1]=20;
two_ds_scene.setM(1,1);
two_ds_scene.isFixed[1] = false;
var gravitational_force = new GravitationalForce(0,1,1.18419);
two_ds_scene.insertForce(gravitational_force);

two_ds_scene.setPosition(2, [100,0,0]);
two_ds_scene.setVelocity(2, [0,62.8316,0]);
two_ds_scene.radii[2]=20;
two_ds_scene.setM(2,4);
two_ds_scene.isFixed[2] = false;
var gravitational_force = new GravitationalForce(0,2,1.18419);
two_ds_scene.insertForce(gravitational_force);

two_ds_scene.insertEdge([0,2],4);

// set the scene size
var WIDTH = window.innerWidth,//400,
  HEIGHT = window.innerHeight;//300;

// set some camera attributes
var VIEW_ANGLE = 75,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

var raycaster= new THREE.Raycaster();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
camera.position.z = 220;
var controls = new THREE.TrackballControls( camera );
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0x0b0b0b, 1 );
renderer.sortObjects = false;
renderer.setSize( WIDTH, HEIGHT );
var explicit_euler = new ExplicitEuler();
var dt = 0.01;
document.body.appendChild( renderer.domElement );

//http://threejs.org/examples/webgl_camera.html
var geometry = new THREE.Geometry();
for ( var i = 0; i < 10000; i ++ ) {
  var vertex = new THREE.Vector3();
  vertex.x = THREE.Math.randFloatSpread( 2000 );
  vertex.y = THREE.Math.randFloatSpread( 2000 );
  vertex.z = THREE.Math.randFloatSpread( 2000 );
  geometry.vertices.push( vertex );
}
var particles = new THREE.PointCloud( geometry, new THREE.PointCloudMaterial( { color: 0x888888 } ) );
scene.add( particles );

// set up the sphere vars
var radius = 0.8, segments = 16, rings = 16;

// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF, 1);

//Particles initialization  
var particles = new Array(0);
for (i = 0; i < two_ds_scene.num_particles; i++) {
  var pos = two_ds_scene.getPosition(i);
  radius = two_ds_scene.radii[i];

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
      radius, segments,rings),
    materials[i]);

  sphere.position.x=pos[0];
  sphere.position.y=pos[1];
  sphere.position.z=pos[2];
  sphere.particle_i = i;
  sphere.is_planet = true;
  if (i==0) sphere.add(pointLight);
  scene.add(sphere);
  particles.push( sphere );
}
//End of particless initialization

//Edges initialization  
// var edges = new Array(0);
// for (i = 0; i < two_ds_scene.edges.length; i++) {
//   var edge = two_ds_scene.edges[i];
//   var edge_radius = two_ds_scene.edges_radii[i];
//   var pos1 = two_ds_scene.getPosition(edge[0]);
//   var pos2 = two_ds_scene.getPosition(edge[1]);
//   pos1 = new THREE.Vector3( pos1[0], pos1[1], pos1[2] );
//   pos2 = new THREE.Vector3( pos2[0], pos2[1], pos2[2] );

//   var height = pos1.distanceTo(pos2);
//   var half_way = new THREE.Vector3();
//   half_way.subVectors(pos2,pos1);
//   half_way.divideScalar(2);
//   half_way.add(pos1);

//   var edge_geometry = new THREE.CylinderGeometry( edge_radius, edge_radius, height, 32 );
//   var edge_material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
//   var cylinder = new THREE.Mesh( edge_geometry, edge_material );
//   cylinder.position=half_way;
//   cylinder.position.x=half_way.x;
//   cylinder.position.y=half_way.y;
//   cylinder.position.z=half_way.z;

//   scene.add( cylinder );
//   edges.push(cylinder);
// }
//End of edges initialization


//Paths initialization
var paths = [];
var path_geometries = []
paths.push(new ParticlePath( 1, Math.ceil(6/dt), 0xffffff));
paths.push(new ParticlePath( 2, Math.ceil(6/dt), 0xffffff));
for (var i=0; i<paths.length;i++){
  var material = new THREE.LineBasicMaterial({
    color: paths[i].color
  });
  var geometry = new THREE.Geometry();
  for (var j=0;j< paths[i].max_list_size ;j++)
    geometry.vertices.push(new THREE.Vector3( 0, 0, 0 ));
  path_geometries.push(geometry);
  var line = new THREE.Line( geometry, material );
  scene.add( line );
}
//End of paths initialization

var geometry_axis = new THREE.CylinderGeometry( 5, 5, 150, 32 );
var material_x = new THREE.MeshBasicMaterial( {color: 0xddddff} );
var material_y = new THREE.MeshBasicMaterial( {color: 0xaaaaff} );
var material_z = new THREE.MeshBasicMaterial( {color: 0xccccff} );
var cylinder_x = new THREE.Mesh( geometry_axis, material_x );
var cylinder_y = new THREE.Mesh( geometry_axis, material_y );
var cylinder_z = new THREE.Mesh( geometry_axis, material_z );
cylinder_x.position=new THREE.Vector3(0,0,0);
cylinder_y.position=new THREE.Vector3(0,0,0);
cylinder_z.position=new THREE.Vector3(0,0,0);
cylinder_x.rotation.z = -3.1415/2; 
cylinder_z.rotation.x = 3.1415/2; 
scene.add( cylinder_x );
scene.add( cylinder_y );
scene.add( cylinder_z );




var pos,vel;
var render = function () {
  two_ds_scene = explicit_euler.stepScene(two_ds_scene, dt)
      
  // Paths update and rendering
  for (i = 0; i < paths.length; i++){
    pos = two_ds_scene.getPosition(paths[i].particle_i);
    paths[i].addToPath(pos);
  }
  for (var i=0; i<paths.length;i++){
    path = paths[i];
    var geometry = path_geometries[i];
    var max_n = path.max_list_size;
    for ( var j = 0, l = max_n; j < l; j ++ ) {
      pos_temp = path.getPoint(j);
      if (pos_temp != undefined) pos = pos_temp;
      geometry.vertices[ j ].x = pos[0];
      geometry.vertices[ j ].y = pos[1];
      geometry.vertices[ j ].z = pos[2];
    }
    geometry.verticesNeedUpdate = true;
  }
  // End of paths update and rendering

  for (i = 0; i < two_ds_scene.num_particles; i++) {
    var pos = two_ds_scene.getPosition(i);
    var sphere = particles[i];
    sphere.position.x=pos[0];
    sphere.position.y=pos[1];
    sphere.position.z=pos[2];
    sphere.rotation.y += 0.01;
  }

  // find intersections
  var vector = new THREE.Vector3( mouse.x, mouse.y, 1 ).unproject( camera );
  raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
  var intersects = raycaster.intersectObjects( scene.children );
  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      if ( intersects[ 0 ].object.is_planet){
        INTERSECTED = intersects[ 0 ].object;
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        INTERSECTED.material.emissive.setHex( 0xff0000 );
      } else {INTERSECTED=null;}
    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    INTERSECTED = null;
  }
  if (mouse_clicked && INTERSECTED){
    CAM_FOLLOW_i=INTERSECTED.particle_i;
  }
  if(CAM_FOLLOW_i){
    pos = two_ds_scene.getPosition(CAM_FOLLOW_i);
    vel = two_ds_scene.getVelocity(CAM_FOLLOW_i);
    radius = two_ds_scene.radii[CAM_FOLLOW_i];
    vel = new THREE.Vector3( vel[0], vel[1], vel[2] );
    vel = vel.normalize();
    camera.position.x = pos[0] -vel.x*radius*5;
    camera.position.y = pos[1] -vel.y*radius*5;//- vel[1];
    camera.position.z = pos[2] -vel.z*radius*5;//- vel[2];+220;//
    camera.up = new THREE.Vector3(0,1,0);
    camera.lookAt(new THREE.Vector3( pos[0], pos[1], pos[2] ));
  }else{
  controls.update();
  }

  raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
  mouse_clicked = false;
  
  requestAnimationFrame( render );
  renderer.render(scene, camera);
};

  render();

