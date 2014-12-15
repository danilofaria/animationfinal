var WIDTH, HEIGHT;
var VIEW_ANGLE, ASPECT, NEAR, FAR;
var scene, camera, renderer, dt, integrator;
var controls;
var two_ds_scene;
var i,j,k;
var edges = [];
var particles = [];
var edge_colors = [];
var particle_materials = [];
var paths = [];
var forces = [];
var do_stuff = function(){};
var do_stuff_before_render = function(){};
var reference;
var show_particles, show_edges;
THREE.ImageUtils.crossOrigin = '';

// set the scene size
WIDTH = window.innerWidth,//400,
  HEIGHT = window.innerHeight;//300;

// set some camera attributes
VIEW_ANGLE = 75,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 100000;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR );
camera.position.z = 10;
controls = new THREE.TrackballControls( camera );
renderer = new THREE.WebGLRenderer();
// renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
// renderer.sortObjects = false;
// renderer.autoClearColor = false;
renderer.setClearColor( 0x0b0b0b, 1 );
renderer.setSize( WIDTH, HEIGHT );
integrator = new SymplecticEuler();
dt = 0.01;
reference = new THREE.Mesh();
scene.add(reference);
show_particles = true, show_edges = true;
document.body.appendChild( renderer.domElement );

scene3();

two_ds_scene = new TwoDScene(particle_count);

for(i=0;i<particle_count;i++){
  two_ds_scene.setPosition(i, particles[i].pos);
  two_ds_scene.setVelocity(i, particles[i].vel);
  two_ds_scene.radii[i]= particles[i].radius;
  two_ds_scene.setM(i, particles[i].m);
  two_ds_scene.isFixed[i] = particles[i].isFixed;
  particle_materials.push( particles[i].material );
}

for(i=0;i<edge_count;i++){
  two_ds_scene.insertEdge([edges[i].particle_i,edges[i].particle_j], edges[i].radius);
  edge_colors.push(edges[i].color);
}

two_ds_scene.forces=forces;

// Create an ambient light
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
  
// set up the sphere vars
var radius = 0.8, segments = 16, rings = 16;
var particle_meshes = new Array(0);
for (i = 0; i < two_ds_scene.num_particles; i++) {
  var pos = two_ds_scene.getPosition(i);
  radius = two_ds_scene.radii[i];

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
      radius, segments,rings),
    particle_materials[i]);

  sphere.position.x=pos[0];
  sphere.position.y=pos[1];
  sphere.position.z=pos[2];
  // add the sphere to the scene
  reference.add(sphere);
  particle_meshes.push( sphere );
}

//Edges initialization  
var edge_meshes = new Array(0);
for (i = 0; i < two_ds_scene.edges.length; i++) {
  var edge = two_ds_scene.edges[i];
  var edge_radius = two_ds_scene.edges_radii[i];
  var pos1 = two_ds_scene.getPosition(edge[0]);
  var pos2 = two_ds_scene.getPosition(edge[1]);
  pos1 = new THREE.Vector3( pos1[0], pos1[1], pos1[2] );
  pos2 = new THREE.Vector3( pos2[0], pos2[1], pos2[2] );

  var height = pos1.distanceTo(pos2);
  var position  = pos2.clone().add(pos1).divideScalar(2);

  var edge_geometry = new THREE.CylinderGeometry( edge_radius, edge_radius, 1, 32 );
  edge_geometry.applyMatrix( new THREE.Matrix4().makeRotationFromEuler( new THREE.Euler( Math.PI / 2, Math.PI, 0 ) ) );
  var edge_material = new THREE.MeshBasicMaterial( {color: edge_colors[i]} );
  // var edge_material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: edge_colors[i], ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true } );
  var cylinder = new THREE.Mesh( edge_geometry, edge_material );

  cylinder.scale.z = height;
  cylinder.position.x=position.x;
  cylinder.position.y=position.y;
  cylinder.position.z=position.z;
  cylinder.lookAt(pos2);

  reference.add( cylinder );
  edge_meshes.push(cylinder);
}
//End of edges initialization

//Paths initialization
var path_geometries = []
for (var i=0; i<paths.length;i++){
  var material = new THREE.LineBasicMaterial({
    color: paths[i].color
  });
  var geometry = new THREE.Geometry();
  for (var j=0;j< paths[i].max_list_size ;j++)
    geometry.vertices.push(new THREE.Vector3( 0, 0, 0 ));
  path_geometries.push(geometry);
  var line = new THREE.Line( geometry, material );
  reference.add( line );
}
//End of paths initialization

function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );}
window.addEventListener( 'resize', onWindowResize, false );

do_stuff_before_render();

var render = function () {
  two_ds_scene = integrator.stepScene(two_ds_scene, dt)

  // Move particles
  for (i = 0; i < two_ds_scene.num_particles; i++) {
    var pos = two_ds_scene.getPosition(i);
    var sphere = particle_meshes[i];
    sphere.position.x=pos[0];
    sphere.position.y=pos[1];
    sphere.position.z=pos[2];
    sphere.visible=show_particles;

  }

  // Move edges
  for (i = 0; i < two_ds_scene.edges.length; i++) {
    var edge_info = two_ds_scene.edges[i];
    var pos1 = two_ds_scene.getPosition(edge_info[0]);
    var pos2 = two_ds_scene.getPosition(edge_info[1]);
    pos1 = new THREE.Vector3( pos1[0], pos1[1], pos1[2] );
    pos2 = new THREE.Vector3( pos2[0], pos2[1], pos2[2] );

    var height = pos1.distanceTo(pos2);
    var position  = pos2.clone().add(pos1).divideScalar(2);
  
    cylinder.visible=show_edges;
    cylinder=edge_meshes[i];
    cylinder.scale.z = height;
    cylinder.position.x=position.x;
    cylinder.position.y=position.y;
    cylinder.position.z=position.z;
    cylinder.lookAt(pos2);
  }

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

  do_stuff();
  controls.update();
  requestAnimationFrame( render );
  renderer.render(scene, camera);
};

  render();