var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
var aspectRatio = window.innerWidth / window.innerHeight;
var loader = new THREE.TextureLoader();
var camera = new THREE.PerspectiveCamera(90, aspectRatio, 1, 10000);
	document.body.appendChild( renderer.domElement );
	camera.position.z = 400;
	scene.add(camera);
var light = new THREE.DirectionalLight( 0x737373 );
	light.position.set( 7, 7, 0 ).normalize();
	scene.add(light);
var light2 = new THREE.AmbientLight( 0x5a5a5a ); // soft white light
	scene.add(light2);
// Globe
//                                      radius
//                                        | width segments
//                                        |    | height segments
//                                        |    |   |
//                                        v    v   v
var bigSphere = new THREE.SphereGeometry(100, 32, 32);
var cover = new  THREE.MeshPhongMaterial();
	cover.map    = THREE.ImageUtils.loadTexture('image/Cjnkbcv.jpg');
	cover.bumpMap    = THREE.ImageUtils.loadTexture('image/earthbump1k.jpg');
	cover.bumpScale = 0.005;
	cover.specularMap    = THREE.ImageUtils.loadTexture('image/earthspec1k.jpg');
	cover.specular  = new THREE.Color('grey');
var globe = new THREE.Mesh(bigSphere, cover);
	scene.add(globe);
var cloudSphere = new THREE.SphereGeometry(103, 32, 32);
var colo = new  THREE.MeshPhongMaterial({transparent: true});
	colo.map = THREE.ImageUtils.loadTexture('image/fair_clouds_4k.png');
var clouds = new THREE.Mesh(cloudSphere, colo);
	scene.add(clouds);
// Orbital
var geometry = new THREE.BoxGeometry( 35, 2, 35);
var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('image/etsy.png') } );
var orbital = new THREE.Mesh(geometry, material);
	globe.add(orbital);
//Outine collision boxes
//	var coltest1 = new THREE.BoxHelper( orbital );
//		scene.add( coltest1 );
//                        x,y,z
orbital.position.set(-150,150,0);
// Orbital 2
var orbital2 = new THREE.Mesh(geometry, material);
	globe.add(orbital2);
orbital2.position.set(150,150,0);
//Outine collision boxes
//	var coltest2 = new THREE.BoxHelper( orbital2 );
//		scene.add( coltest2 );
// Orbital 3
var orbital3 = new THREE.Mesh(geometry, material);
	globe.add(orbital3);
orbital3.position.set(0,0,150);
// Orbital 4
var orbital4 = new THREE.Mesh(geometry, material);
	globe.add(orbital4);
orbital4.position.set(-150,30,0);
// Orbital 5
var orbital5 = new THREE.Mesh(geometry, material);
	globe.add(orbital5);
orbital5.position.set(150,30,0);
//Outine collision boxes
//	var coltest3 = new THREE.BoxHelper( orbital3 );
//		scene.add( coltest3 );
document.body.appendChild( renderer.domElement );
// Collision testing
orbital.geometry.computeBoundingBox();
orbital2.geometry.computeBoundingBox();
orbital3.geometry.computeBoundingBox();
orbital4.geometry.computeBoundingBox();
orbital5.geometry.computeBoundingBox();
//
firstBB = new THREE.Box3().setFromObject(orbital);
secondBB = new THREE.Box3().setFromObject(orbital2);
thirdBB = new THREE.Box3().setFromObject(orbital3);
forthBB = new THREE.Box3().setFromObject(orbital4);
fifthBB = new THREE.Box3().setFromObject(orbital5);
//
var clock = new THREE.Clock();
function onWindowResize () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize (window.innerWidth, window.innerHeight);
}
function animate() {
	requestAnimationFrame(animate);

	var t = clock.getElapsedTime();
				firstBB = new THREE.Box3().setFromObject(orbital);
				secondBB = new THREE.Box3().setFromObject(orbital2);
				thirdBB = new THREE.Box3().setFromObject(orbital3);
				forthBB = new THREE.Box3().setFromObject(orbital4);
				fifthBB = new THREE.Box3().setFromObject(orbital5);
				if(firstBB.intersectsBox(secondBB)){
					console.log('first and second');
				  	orbital.position.x =10000;
				  }
				if(secondBB.intersectsBox(thirdBB)){
				  	console.log('second and third');
				  }
				if(thirdBB.intersectsBox(firstBB)){
				  	console.log('third and first');
				  }
				if(firstBB.intersectsBox(forthBB)){
				  	console.log('first and forth');
				  }
				if(secondBB.intersectsBox(forthBB)){
				  	console.log('second and forth');
				  }
				if(thirdBB.intersectsBox(forthBB)){
				  	console.log('third and forth');
				  }
				if(fifthBB.intersectsBox(forthBB)){
				  	console.log('fifth and forth');
				  }
				if(firstBB.intersectsBox(fifthBB)){
				  	console.log('first and fifth');
				  }
				if(secondBB.intersectsBox(fifthBB)){
				  	console.log('second and fifth');
				  }
				if(thirdBB.intersectsBox(fifthBB)){
				  	console.log('third and fifth');
				  }
	// orbit from bottom right to top left
	//                            movement speed
	//                               |  orbit distance
	//                               |      |
	//                               v      v
	orbital.position.x = Math.sin(0.5*t) * -150;
	orbital.position.y = Math.sin(0.5*t) * 150;
	orbital.position.z = Math.cos(0.5*t) * 150;
	//orbit from top right to bottom left
	  			orbital2.position.x = Math.cos(0.9*t) * 150;
				orbital2.position.y = Math.cos(0.9*t) * 150;
				orbital2.position.z = Math.sin(0.9*t) * 150;

				var tOffset = 1.5 + clock.getElapsedTime();
				// orbit from the bottom to the top
				orbital3.position.x = Math.sin(0.7*tOffset) * 0;
				orbital3.position.y = Math.sin(0.7*tOffset) * 150;
				orbital3.position.z = Math.cos(0.7*tOffset) * 150;
				//orbit from the bottom to the top
				orbital4.position.x = Math.sin(0.5*tOffset) * 0;
				orbital4.position.y = Math.sin(0.5*tOffset) * 150;
				orbital4.position.z = Math.cos(0.5*tOffset) * 150;
				// orbit from top right to bottom left
				orbital5.position.x = Math.sin(0.8*tOffset) * 0;
				orbital5.position.y = Math.sin(0.8*tOffset) * 150;
				orbital5.position.z = Math.cos(0.8*tOffset) * 150;
				//main globe animations
				globe.rotation.y += 0.001;
				clouds.rotation.y += 0.0015;
				//Outine collision boxes
				// 	coltest1.update();
				// 	coltest2.update();
				// 	coltest3.update();
				//Listing rotations
				  	orbital.rotation.x += 0.01;
				  	orbital.rotation.y += 0.01;
				  	orbital2.rotation.x += 0.01;
				  	orbital2.rotation.y += 0.01;
				  	orbital3.rotation.x += 0.01;
				  	orbital3.rotation.y += 0.01;
				  	orbital4.rotation.x += 0.01;
				  	orbital4.rotation.y += 0.01;
				  	orbital5.rotation.x += 0.01;
				  	orbital5.rotation.y += 0.01;
	//Set Renderer always at bottom of function
	renderer.render(scene, camera);
};
javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
//Always have at bottom of file
window.addEventListener ('resize', onWindowResize, false);
animate();
