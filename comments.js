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

    pseudo_cam.position.x = pos[0] -vel.x*radius*2;
    pseudo_cam.position.y = pos[1] -vel.y*radius*2;//- vel[1];
    pseudo_cam.position.z = pos[2] -vel.z*radius*2;//- vel[2];
  var sphereMaterial =
    new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000//, wireframe:true
    });
  var pseudo_cam = new THREE.Mesh(
    new THREE.SphereGeometry(
      40, segments,rings),
    sphereMaterial);
    pseudo_cam.position.x = 0;
    pseudo_cam.position.y = 0;//- vel[1];
    pseudo_cam.position.z = 0;//- vel[2];
  scene.add( pseudo_cam );


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

     var delta = clock.getDelta(),
          time = clock.getElapsedTime() * 10;
  
   for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
          geometry.vertices[ i ].y = 35 * Math.sin( i / 5 + ( time + i ) / 7 );
        }
  g


  // var sunTexture = THREE.ImageUtils.loadTexture( "https://dl.dropboxusercontent.com/u/25861113/planet_textures/sun.png" );
// sunTexture.wrapS = sunTexture.wrapT = THREE.RepeatWrapping;
// sunTexture.anisotropy = 16;

// var earthTexture = THREE.ImageUtils.loadTexture( "https://dl.dropboxusercontent.com/u/25861113/planet_textures/earth.png" );
// earthTexture.wrapS = earthTexture.wrapT = THREE.RepeatWrapping;
// earthTexture.anisotropy = 16;

// var mercuryTexture = THREE.ImageUtils.loadTexture( "https://dl.dropboxusercontent.com/u/25861113/planet_textures/mercury.png" );
// mercuryTexture.wrapS = mercuryTexture.wrapT = THREE.RepeatWrapping;
// mercuryTexture.anisotropy = 16;



// var sunMaterial = new THREE.MeshLambertMaterial( { color: 0x666666, emissive: 0xffff00, ambient: 0x000000, shading: THREE.SmoothShading } );
// materials.push(sunMaterial);
// materials.push( new THREE.MeshBasicMaterial( { color: 0xffff00, transparent: true, blending: THREE.AdditiveBlending } ) );
// materials.push( new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, ambient: 0x000000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.9, transparent: true } ) );

// materials.push( new THREE.MeshPhongMaterial( { map: sunTexture, emissive: 0xffff00, bumpMap: sunTexture, bumpScale: bumpScale, color: 0xFFFFFF, ambient: 0x000000, specular: 0xffffff, shininess: shininess, metal: false, shading: shading } ) );
// materials.push( new THREE.MeshPhongMaterial( { map: earthTexture, bumpMap: earthTexture, bumpScale: bumpScale, color: 0xFFFFFF, ambient: 0x000000, specular: 0xffffff, shininess: shininess, metal: false, shading: shading } ) );
// materials.push( new THREE.MeshPhongMaterial( { map: mercuryTexture, bumpMap: mercuryTexture, bumpScale: bumpScale, color: 0xFFFFFF, ambient: 0x000000, specular: 0xffffff, shininess: shininess, metal: false, shading: shading } ) );


  // var pos = two_ds_scene.getPosition(1).toArray()[0];
// var vel = two_ds_scene.getVelocity(1).toArray()[0];
// camera.position.x = pos[0] //- vel[0];
// camera.position.y = pos[1] //- vel[1];
// camera.position.z = pos[2] //- vel[2];
// camera.lookAt(new THREE.Vector3( vel[0], vel[1], vel[2] ));
  // geometry.dynamic = true;


  // var sphere2 = new THREE.Mesh(
  //   new THREE.SphereGeometry(
  //     radius+2, segments,rings),
  //   transp_material);
  // sphere.add(sphere2);



// var basic_material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// materials.push(new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));

// genComets = function(count) {
//   for (var i = 0; i < count; i++) {
//     materials.push(new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));

//     // name = "comet" + i;
//     var ca = Math.random() * 360; // angle in x-z plane
//     var cr = (Math.random() * 100000) + 100000; // distance from sun
//     cr *= 4e6;
//     var pos = [cr * Math.sin(ca * 3.1415/180), 0, cr * Math.cos(ca * 3.1415/180)];
//     // comet initial velocity
//     var v = ((Math.random() * 200) + 100) * 50.0;
//     v = (i % 2 == 1) ? -v : v;
//     var vel = [0, v, 0];
//     // var color = engine.planetColors[i % engine.planetColors.length];
//     // var comet = new OrbitBody(name, 1e3, pos, vel, 1e9, color);
//     // OrbitBody = function(name, radius, pos, vel, mass, color) {
//     // comet_array.push(comet);

//     two_ds_scene.setPosition(3+i, pos);
//     two_ds_scene.setVelocity(3+i, vel);
//     two_ds_scene.radii[3+i] = 20;
//     two_ds_scene.setM(3+i, 1);
//     two_ds_scene.isFixed[3+i] = false;
//     var gravitational_force = new GravitationalForce( 0, 3+i, 1.18419 );
//     two_ds_scene.insertForce(gravitational_force);
//   }
// }
// genComets(2);




    // "Name,OrbitRad,BodyRad,Mass,OrbitVel\n"
    // + "Sun,0,695000000,1.989E+030,0\n"
    // + "Mercury,57900000000,2440000,3.33E+023,47900\n"
    // + "Venus,108000000000,6050000,4.869E+024,35000\n"
    // + "Earth,150000000000,6378140,5.976E+024,29800\n"
    // + "Mars,227940000000,3397200,6.421E+023,24100\n"
    // + "Jupiter,778330000000,71492000,1.9E+027,13100\n"
    // + "Saturn,1429400000000,60268000,5.688E+026,9640\n"
    // + "Uranus,2870990000000,25559000,8.686E+025,6810\n"
    // + "Neptune,4504300000000,24746000,1.024E+026,5430\n"
// two_ds_scene.setPosition(2, [100,0,0]);
// two_ds_scene.setVelocity(2, [0,62.8316,0]);
// two_ds_scene.radii[2]=20;
// two_ds_scene.setM(2,1);
// two_ds_scene.isFixed[2] = false;
// var gravitational_force = new GravitationalForce(0,2,1.18419);
// two_ds_scene.insertForce(gravitational_force);

// two_ds_scene.setPosition(2, [200,0,0]);
// two_ds_scene.setVelocity(2, [0,44.299,0]);
// two_ds_scene.radii[2]=20;
// two_ds_scene.setM(2,1);
// two_ds_scene.isFixed[2] = false;
// var gravitational_force = new GravitationalForce(0,2,1.18419);
// two_ds_scene.insertForce(gravitational_force);

// two_ds_scene.insertEdge([1,2],4);
// two_ds_scene.insertEdge([2,3],4);
// two_ds_scene.insertEdge([4,0],4);


    // edge from X to Y
    var direction = new THREE.Vector3().subVectors( pointY, pointX );
    var arrow = new THREE.ArrowHelper( direction, pointX );

    // cylinder: radiusAtTop, radiusAtBottom, 
    //     height, radiusSegments, heightSegments
    var edgeGeometry = new THREE.CylinderGeometry( 2, 2, direction.length(), 6, 4 );

    var edge = new THREE.Mesh( edgeGeometry, 
        new THREE.MeshBasicMaterial( { color: 0x0000ff } ) );
    edge.rotation = arrow.rotation.clone();
    edge.position = new THREE.Vector3().addVectors( pointX, direction.multiplyScalar(0.5) );
    return edge;






    /* edge from X to Y */
    var direction = new THREE.Vector3().subVectors( pointY, pointX );
    var orientation = new THREE.Matrix4();
    /* THREE.Object3D().up (=Y) default orientation for all objects */
    orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
    /* rotation around axis X by -90 degrees 
     * matches the default orientation Y 
     * with the orientation of looking Z */
    orientation.multiply(new THREE.Matrix4(1,0,0,0,
                                            0,0,1,0, 
                                            0,-1,0,0,
                                            0,0,0,1));

    /* cylinder: radiusAtTop, radiusAtBottom, 
        height, radiusSegments, heightSegments */
    var edgeGeometry = new THREE.CylinderGeometry( 2, 2, direction.length(), 8, 1);
    var edge = new THREE.Mesh( edgeGeometry, 
            new THREE.MeshBasicMaterial( { color: 0x0000ff } ) );

    edge.applyMatrix(orientation)
    edge.position = new THREE.Vector3().addVectors( pointX, direction.multiplyScalar(0.5) );
    return edge;

    http://stackoverflow.com/questions/15316127/three-js-line-vector-to-cylinder










    var direction = new THREE.Vector3().subVectors(point2, point1);
        var arrow = new THREE.ArrowHelper(direction.clone().normalize(), point1);

        var rotation = new THREE.Vector3().setEulerFromQuaternion(arrow.quaternion);

        var edgeGeometry = new THREE.CylinderGeometry( 2, 2, direction.length(), 10, 4 );

        var edge = new THREE.Mesh(edgeGeometry, material);
        edge.rotation = rotation.clone();
        edge.position = new THREE.Vector3().addVectors(point1, direction.multiplyScalar(0.5));










  // var imageCanvas = document.createElement( "canvas" ),
  //  context = imageCanvas.getContext( "2d" );
  // imageCanvas.width = imageCanvas.height = 128;
  // context.fillStyle = "#444";
  // context.fillRect( 0, 0, 128, 128 );
  // context.fillStyle = "#fff";
  // context.fillRect( 0, 0, 64, 64);
  // context.fillRect( 64, 64, 64, 64 );
  // var textureCanvas = new THREE.Texture( imageCanvas, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping );
  //  materialCanvas = new THREE.MeshBasicMaterial( { map: textureCanvas } );
  // textureCanvas.needsUpdate = true;
  // textureCanvas.repeat.set( 100, 100 );
  // var geometry = new THREE.PlaneBufferGeometry( 100, 100 );

  // var meshCanvas = new THREE.Mesh( geometry, materialCanvas );
  // meshCanvas.rotation.x = - Math.PI / 2;
  // meshCanvas.scale.set( 100, 100, 100 );
  // meshCanvas.position.y=-100;
  // scene.add(meshCanvas);

  // var start = Date.now();
  // do_stuff=function(){
  //     var timer = Date.now() - start;
  //  // reference.position.y = Math.sin( timer * 0.002 ) * 150;
  //  reference.rotation.x = timer * 0.0003;
  //  reference.rotation.z = timer * 0.0002;
  // }


  // Ground
  var plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry( 2000, 2000 ),
    new THREE.MeshPhongMaterial( { ambient: 0x999999, color: 0x999999, specular: 0x101010 } )
  );
  plane.rotation.x = -Math.PI/2;
  plane.position.y = -200;
  scene.add( plane );

  plane.receiveShadow = true;
