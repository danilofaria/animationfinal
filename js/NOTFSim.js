// http://mathjs.org/docs/datatypes/matrices.html
function TwoDScene(num_particles) {
	this.num_particles = num_particles;
	this.X = math.zeros(num_particles, 3);
	this.V = math.zeros(num_particles, 3);
	this.M = new Array(num_particles);
	this.radii = new Array(num_particles);
	this.isFixed = new Array(num_particles);
	this.forces = new Array(0);
}

TwoDScene.prototype.setPosition = function (particle_i, pos) { 
	this.X.subset(math.index(particle_i, [0, 3]), pos);
};

TwoDScene.prototype.getPosition = function (particle_i) { 
	return this.X.subset(math.index(particle_i, [0, 3]));
}

TwoDScene.prototype.setVelocity = function (particle_i, vel) { 
	this.V.subset(math.index(particle_i, [0, 3]), vel);
};

TwoDScene.prototype.getVelocity = function (particle_i) { 
	return this.V.subset(math.index(particle_i, [0, 3]));
};

TwoDScene.prototype.setM = function (particle_i, m) { 
	this.M[particle_i] = m;
};

TwoDScene.prototype.getM = function (particle_i) { 
	return this.M[particle_i];
};

TwoDScene.prototype.insertForce = function (newForce) { 
	this.forces.push(newForce);
};

TwoDScene.prototype.accumulateGradU = function (F) { 
  	for( i = 0; i < this.forces.length ; i++ ) 
  		F = this.forces[i].addGradEToTotal( this.X, this.V, this.M, F );
  	return F;
};

//http://code.stephenmorley.org/javascript/queues/
function ParticlePath( particle_i, max_list_size, color ) {
	this.particle_i = particle_i;
	this.max_list_size = max_list_size;
	this.color = color;
	this.path = new Queue();
}
ParticlePath.prototype.addToPath = function( newpoint )
{
  if( this.max_list_size <= 0 ) return;
  if( this.path.getLength() >= this.max_list_size ) this.path.dequeue();
  this.path.enqueue(newpoint);
}

function Force() {
}

function SimpleGravityForce(gravity) {
	Force.call();
	this.gravity = gravity;
}
SimpleGravityForce.prototype = new Force();
SimpleGravityForce.prototype.constructor = SimpleGravityForce;

SimpleGravityForce.prototype.addGradEToTotal = function(x,v,m,gradE){
  for( i = 0; i < x.size()[0]; i++ ) {
  	var grad_e = math.multiply(this.gravity, -m[i]);
	grad_e = math.add(math.squeeze(gradE.subset(math.index(i, [0, 3]))), grad_e);
	gradE.subset(math.index(i, [0, 3]), grad_e)
	}
  return gradE; 
}

function GravitationalForce(particle1, particle2, G) {
	Force.call();
	this.particle1 = particle1;
	this.particle2 = particle2;
	this.G = G;
}
GravitationalForce.prototype = new Force();
GravitationalForce.prototype.constructor = GravitationalForce;

GravitationalForce.prototype.addGradEToTotal = function(x,v,m,gradE){
	var m1 = m[this.particle1];
	var m2 = m[this.particle2];
	var x1=x.subset(math.index(this.particle1, [0, 3]));
	var x2=x.subset(math.index(this.particle2, [0, 3]));
	var nhat = math.subtract(x2,x1);
	var r = math.norm(nhat,"fro");
	nhat = math.divide(nhat, r);
	nhat = math.multiply(nhat, this.G*m1*m2/(r*r));

	var a = math.subtract(gradE.subset(math.index(this.particle1, [0, 3])), nhat);
	var b = math.add(gradE.subset(math.index(this.particle2, [0, 3])), nhat);
	gradE.subset(math.index(this.particle1, [0, 3]), a);
	gradE.subset(math.index(this.particle2, [0, 3]), b);
	return gradE;
}

function SceneStepper() {
}

function ExplicitEuler() {
}
ExplicitEuler.prototype = new SceneStepper();
ExplicitEuler.prototype.constructor = ExplicitEuler;
ExplicitEuler.prototype.stepScene = function( scene, dt ){
	var x = scene.X;
	var v = scene.V;
	var m = scene.M;

	var F = math.zeros(scene.num_particles, 3);
	F = scene.accumulateGradU(F);
	F = math.multiply(F,-1);
	for (i = 0; i < scene.num_particles; i++){
		if (scene.isFixed[i]) F.subset(math.index(i,[0,3]),[0,0,0]);
		else {
			var f = math.divide(F.subset(math.index(i,[0,3])), m[i]);
			F.subset(math.index(i,[0,3]), f);
		}
	}

	var dx = math.multiply(v,dt);
	var dv = math.multiply(F,dt);
	scene.X =math.add(scene.X, dx);
	scene.V =math.add(scene.V, dv);

	return scene;
}