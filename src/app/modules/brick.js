import { mergeMeshes } from '../utils';
import { width, height, depth, colors } from '../utils/constants';

const color = colors[0];


export class Brick extends THREE.Mesh {
  constructor(intersect) {
    const cubeMaterial = new THREE.MeshLambertMaterial({
      color: parseInt(color || colors[Math.floor(Math.random()*colors.length)], 16),
    });
    const props = createMesh(cubeMaterial);
    super(...props);

    this.position.copy( intersect.point ).add( intersect.face.normal );
    this.position.divide( new THREE.Vector3(width / 2, height, depth / 2) ).floor()
      .multiply( new THREE.Vector3(width / 2, height, depth / 2) )
      .add( new THREE.Vector3( width / 2, height / 2, depth / 2 ) );
    this.castShadow = true;
    this.receiveShadow = true;
  }
}


function createMesh(material) {
  let meshes = [];
  const cubeGeo = new THREE.BoxGeometry( width, height, depth );
  const cylinderGeo = new THREE.CylinderGeometry( 7, 7, 7, 20);

  const mesh = new THREE.Mesh(cubeGeo, material);
  meshes.push(mesh);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const positions = [
    {x: 13, y: 25 / 1.5, z: - 13},
    {x: - 13, y: 25 / 1.5, z: 13},
    {x: - 13, y: 25 / 1.5, z: - 13},
    {x: 13, y: 25 / 1.5, z: 13}
  ];

  for (var i = 0; i < positions.length; i++) {
    const cylinder = new THREE.Mesh(cylinderGeo, material);

    cylinder.position.x = positions[i].x;
    cylinder.position.y = positions[i].y;
    cylinder.position.z = positions[i].z;

    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    meshes.push( cylinder );
  }

  const brickGeometry = mergeMeshes(meshes);
  return [brickGeometry, material];
}