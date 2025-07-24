import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

//Data:
// Initial county position data:
// 'filename.gltf': [x_offset, z_offset]
let countyPositionData = {
  'adams.gltf': [0.9869, 3.4059],
  'allegheny.gltf': [-5.6384, 1.684],
  'armstrong.gltf': [-4.2803, 0.4335],
  'beaver.gltf': [-6.3648, 0.9463],
  'bedford.gltf': [-2.0057, 3.0102],
  'berks.gltf': [3.8702, 1.7836],
  'blair.gltf': [-1.7488, 1.564],
  'bradford.gltf': [2.5393, -2.4107],
  'bucks.gltf': [5.9648, 1.966],
  'butler.gltf': [-5.3726, 0.2032],
  'cambria.gltf': [-2.5378, 1.5838],
  'cameron.gltf': [-1.3469, -1.2855],
  'carbon.gltf': [4.4243, 0.1466],
  'centre.gltf': [-0.3158, 0.0911],
  'chester.gltf': [4.4621, 3.0851],
  'clarion.gltf': [-4.2577, -0.648],
  'clearfield.gltf': [-1.8659, 0.0369],
  'clinton.gltf': [0.0221, -0.6748],
  'columbia.gltf': [2.8023, -0.1574],
  'crawford.gltf': [-5.6531, -2.1255],
  'cumberland.gltf': [0.9188, 2.6602],
  'dauphin.gltf': [1.9904, 1.8685],
  'delaware.gltf': [5.2815, 3.2071],
  'elk.gltf': [-2.423, -1.2859],
  'erie.gltf': [-5.6292, -3.3038],
  'fayette.gltf': [-4.7987, 3.263],
  'forest.gltf': [-3.746, -1.4879],
  'franklin.gltf': [-0.3511, 3.0713],
  'fulton.gltf': [-1.1734, 3.2589],
  'greene.gltf': [-6.1437, 3.4159],
  'huntingdon.gltf': [-0.8006, 1.8438],
  'indiana.gltf': [-3.5283, 1.0965],
  'jefferson.gltf': [-3.1238, -0.4424],
  'juniata.gltf': [0.6663, 1.6058],
  'lackawanna.gltf': [4.616, -1.3076],
  'lancaster.gltf': [3.1465, 2.9948],
  'lawrence.gltf': [-6.2702, -0.0493],
  'lebanon.gltf': [2.8593, 1.9085],
  'lehigh.gltf': [4.7354, 1.1595],
  'luzerne.gltf': [3.8818, -0.5519],
  'lycoming.gltf': [1.3982, -1.0289],
  'mckean.gltf': [-2.2178, -2.4706],
  'mercer.gltf': [-6.1273, -0.9364],
  'mifflin.gltf': [0.0757, 1.2215],
  'monroe.gltf': [5.4087, -0.1849],
  'montgomery.gltf': [5.375, 2.356],
  'montour.gltf': [2.2726, -0.0949],
  'northampton.gltf': [5.3738, 0.6818],
  'northumberland.gltf': [2.2568, 0.3333],
  'perry.gltf': [0.7894, 1.8412],
  'philadelphia.gltf': [5.9485, 2.9794],
  'pike.gltf': [6.05, -1.1532],
  'potter.gltf': [-0.645, -2.2683],
  'schuylkill.gltf': [3.2829, 0.8268],
  'snyder.gltf': [1.2844, 0.725],
  'somerset.gltf': [-3.3397, 3.0601],
  'sullivan.gltf': [2.5625, -1.3508],
  'susquehanna.gltf': [4.1974, -2.5845],
  'tioga.gltf': [0.8811, -2.3809],
  'union.gltf': [1.2556, 0.0662],
  'venango.gltf': [-4.9182, -1.2646],
  'warren.gltf': [-3.7975, -2.5239],
  'washington.gltf': [-6.0466, 2.3287],
  'wayne.gltf': [5.4447, -1.9706],
  'westmoreland.gltf': [-4.2793, 1.9439],
  'wyoming.gltf': [3.7603, -1.6192],
  'york.gltf': [2.2353, 3.1607]
}

let countyPops = {
  adams: 0.025286,
  allegheny: 0.150731,
  armstrong: 0.013469,
  beaver: 0.086401,
  bedford: 0.009353,
  berks: 0.075388,
  blair: 0.031810,
  bradford: 0.013257,
  bucks: 0.052312,
  butler: 0.019477,
  cambria: 0.059623,
  cameron: 0.008797,
  carbon: 0.027692,
  centre: 0.043175,
  chester: 0.069218,
  clarion: 0.020381,
  clearfield: 0.027941,
  clinton: 0.019306,
  columbia: 0.022402,
  crawford: 0.028688,
  cumberland: 0.058177,
  dauphin: 0.211043,
  delaware: 0.242888,
  elk: 0.008519,
  erie: 0.096454,
  fayette: 0.058267,
  forest: 0.180267,
  franklin: 0.050458,
  fulton: 0.015320,
  greene: 0.036408,
  huntingdon: 0.059580,
  indiana: 0.038224,
  jefferson: 0.006653,
  juniata: 0.011825,
  lackawanna: 0.055680,
  lancaster: 0.058334,
  lawrence: 0.062565,
  lebanon: 0.037017,
  lehigh: 0.101063,
  luzerne: 0.068091,
  lycoming: 0.070034,
  mckean: 0.028270,
  mercer: 0.073618,
  mifflin: 0.016059,
  monroe: 0.178248,
  montgomery: 0.112855,
  montour: 0.027900,
  northampton: 0.083039,
  northumberland: 0.038048,
  perry: 0.014506,
  philadelphia: 0.420132,
  pike: 0.071086,
  potter: 0.006404,
  schuylkill: 0.039756,
  snyder: 0.020536,
  somerset: 0.029516,
  sullivan: 0.021404,
  susquehanna: 0.008482,
  tioga: 0.014813,
  union: 0.068251,
  venango: 0.017818,
  warren: 0.009278,
  washington: 0.049076,
  wayne: 0.040954,
  westmoreland: 0.038969,
  wyoming: 0.014538,
  york: 0.080699,
};

let nonNormIncidence = {
  'adams': [0.106000, 0.065000, 0.073000, 0.065000, 0.079000],
  'allegheny': [0.106000, 0.062000, 0.073000, 0.062000, 0.111000],
  'armstrong': [0.112000, 0.079000, 0.074000, 0.079000, 0.104000],
  'beaver': [0.107000, 0.066000, 0.074000, 0.066000, 0.104000],
  'bedford': [0.108000, 0.078000, 0.073000, 0.078000, 0.108000],
  'berks': [0.104000, 0.064000, 0.070000, 0.064000, 0.118000],
  'blair': [0.113000, 0.084000, 0.073000, 0.084000, 0.132000],
  'bradford': [0.109000, 0.072000, 0.075000, 0.072000, 0.131000],
  'bucks': [0.102000, 0.061000, 0.073000, 0.061000, 0.056000],
  'butler': [0.101000, 0.051000, 0.078000, 0.051000, 0.079000],
  'cambria': [0.110000, 0.078000, 0.074000, 0.078000, 0.144000],
  'cameron': [0.112000, 0.090000, 0.073000, 0.090000, 0.150000],
  'carbon': [0.106000, 0.073000, 0.072000, 0.073000, 0.118000],
  'centre': [0.104000, 0.067000, 0.073000, 0.067000, 0.170000],
  'chester': [0.097000, 0.045000, 0.074000, 0.045000, 0.060000],
  'clarion': [0.110000, 0.075000, 0.075000, 0.075000, 0.137000],
  'clearfield': [0.109000, 0.084000, 0.073000, 0.084000, 0.137000],
  'clinton': [0.112000, 0.076000, 0.075000, 0.076000, 0.131000],
  'columbia': [0.110000, 0.073000, 0.076000, 0.073000, 0.153000],
  'crawford': [0.112000, 0.079000, 0.075000, 0.079000, 0.127000],
  'cumberland': [0.104000, 0.060000, 0.073000, 0.060000, 0.077000],
  'dauphin': [0.111000, 0.070000, 0.067000, 0.070000, 0.122000],
  'delaware': [0.104000, 0.049000, 0.070000, 0.049000, 0.097000],
  'elk': [0.107000, 0.074000, 0.073000, 0.074000, 0.090000],
  'erie': [0.107000, 0.075000, 0.072000, 0.075000, 0.154000],
  'fayette': [0.115000, 0.087000, 0.073000, 0.087000, 0.162000],
  'forest': [0.100000, 0.085000, 0.069000, 0.085000, 0.192000],
  'franklin': [0.106000, 0.070000, 0.073000, 0.070000, 0.090000],
  'fulton': [0.107000, 0.070000, 0.074000, 0.070000, 0.107000],
  'greene': [0.109000, 0.078000, 0.074000, 0.078000, 0.129000],
  'huntingdon': [0.105000, 0.071000, 0.072000, 0.071000, 0.113000],
  'indiana': [0.112000, 0.074000, 0.076000, 0.074000, 0.130000],
  'jefferson': [0.112000, 0.084000, 0.074000, 0.084000, 0.141000],
  'juniata': [0.109000, 0.078000, 0.073000, 0.078000, 0.090000],
  'lackawanna': [0.105000, 0.068000, 0.072000, 0.068000, 0.130000],
  'lancaster': [0.108000, 0.062000, 0.073000, 0.062000, 0.082000],
  'lawrence': [0.109000, 0.072000, 0.075000, 0.072000, 0.123000],
  'lebanon': [0.106000, 0.064000, 0.072000, 0.064000, 0.109000],
  'lehigh': [0.106000, 0.064000, 0.069000, 0.064000, 0.119000],
  'luzerne': [0.112000, 0.074000, 0.072000, 0.074000, 0.149000],
  'lycoming': [0.105000, 0.068000, 0.075000, 0.068000, 0.125000],
  'mckean': [0.108000, 0.072000, 0.075000, 0.072000, 0.141000],
  'mercer': [0.114000, 0.073000, 0.075000, 0.073000, 0.135000],
  'mifflin': [0.114000, 0.084000, 0.074000, 0.084000, 0.167000],
  'monroe': [0.106000, 0.062000, 0.067000, 0.062000, 0.113000],
  'montgomery': [0.098000, 0.054000, 0.071000, 0.054000, 0.063000],
  'montour': [0.109000, 0.073000, 0.073000, 0.073000, 0.087000],
  'northampton': [0.102000, 0.059000, 0.070000, 0.059000, 0.092000],
  'northumberland': [0.108000, 0.076000, 0.073000, 0.076000, 0.124000],
  'perry': [0.108000, 0.072000, 0.074000, 0.072000, 0.082000],
  'philadelphia': [0.116000, 0.080000, 0.055000, 0.080000, 0.227000],
  'pike': [0.103000, 0.058000, 0.073000, 0.058000, 0.100000],
  'potter': [0.109000, 0.074000, 0.075000, 0.074000, 0.122000],
  'schuylkill': [0.110000, 0.079000, 0.072000, 0.079000, 0.123000],
  'snyder': [0.106000, 0.070000, 0.074000, 0.070000, 0.084000],
  'somerset': [0.107000, 0.073000, 0.073000, 0.073000, 0.108000],
  'sullivan': [0.117000, 0.086000, 0.073000, 0.086000, 0.122000],
  'susquehanna': [0.104000, 0.060000, 0.077000, 0.060000, 0.112000],
  'tioga': [0.112000, 0.079000, 0.075000, 0.079000, 0.122000],
  'union': [0.107000, 0.075000, 0.072000, 0.075000, 0.108000],
  'venango': [0.109000, 0.076000, 0.074000, 0.076000, 0.134000],
  'warren': [0.110000, 0.075000, 0.075000, 0.075000, 0.116000],
  'washington': [0.113000, 0.067000, 0.075000, 0.067000, 0.095000],
  'wayne': [0.108000, 0.078000, 0.073000, 0.078000, 0.110000],
  'westmoreland': [0.104000, 0.056000, 0.076000, 0.056000, 0.097000],
  'wyoming': [0.111000, 0.079000, 0.073000, 0.079000, 0.112000],
  'york': [0.107000, 0.058000, 0.075000, 0.058000, 0.086000],
};

// incidence format: {'county' : [asthma, copd, lung cancer, cardiovascular, poverty]}
// incidence[county][factor]
// factor: {0: asthma, 1: copd, 2: lung cancer, 3: cardiovascular, 4: poverty}
let incidence = {
  'adams': [5.600000, 5.555556, 8.260870, 5.555556, 3.076023],
  'allegheny': [5.600000, 5.022222, 8.260870, 5.022222, 4.573099],
  'armstrong': [8.000000, 8.044444, 8.608696, 8.044444, 4.245614],
  'beaver': [6.000000, 5.733333, 8.608696, 5.733333, 4.245614],
  'bedford': [6.400000, 7.866667, 8.260870, 7.866667, 4.432749],
  'berks': [4.800000, 5.377778, 7.217391, 5.377778, 4.900585],
  'blair': [8.400000, 8.933333, 8.260870, 8.933333, 5.555556],
  'bradford': [6.800000, 6.800000, 8.956522, 6.800000, 5.508772],
  'bucks': [4.000000, 4.844444, 8.260870, 4.844444, 2.000000],
  'butler': [3.600000, 3.066667, 10.000000, 3.066667, 3.076023],
  'cambria': [7.200000, 7.866667, 8.608696, 7.866667, 6.116959],
  'cameron': [8.000000, 10.000000, 8.260870, 10.000000, 6.397661],
  'carbon': [5.600000, 6.977778, 7.913043, 6.977778, 4.900585],
  'centre': [4.800000, 5.911111, 8.260870, 5.911111, 7.333333],
  'chester': [2.000000, 2.000000, 8.608696, 2.000000, 2.187135],
  'clarion': [7.200000, 7.333333, 8.956522, 7.333333, 5.789474],
  'clearfield': [6.800000, 8.933333, 8.260870, 8.933333, 5.789474],
  'clinton': [8.000000, 7.511111, 8.956522, 7.511111, 5.508772],
  'columbia': [7.200000, 6.977778, 9.304348, 6.977778, 6.538012],
  'crawford': [8.000000, 8.044444, 8.956522, 8.044444, 5.321637],
  'cumberland': [4.800000, 4.666667, 8.260870, 4.666667, 2.982456],
  'dauphin': [7.600000, 6.444444, 6.173913, 6.444444, 5.087719],
  'delaware': [4.800000, 2.711111, 7.217391, 2.711111, 3.918129],
  'elk': [6.000000, 7.155556, 8.260870, 7.155556, 3.590643],
  'erie': [6.000000, 7.333333, 7.913043, 7.333333, 6.584795],
  'fayette': [9.200000, 9.466667, 8.260870, 9.466667, 6.959064],
  'forest': [3.200000, 9.111111, 6.869565, 9.111111, 8.362573],
  'franklin': [5.600000, 6.444444, 8.260870, 6.444444, 3.590643],
  'fulton': [6.000000, 6.444444, 8.608696, 6.444444, 4.385965],
  'greene': [6.800000, 7.866667, 8.608696, 7.866667, 5.415205],
  'huntingdon': [5.200000, 6.622222, 7.913043, 6.622222, 4.666667],
  'indiana': [8.000000, 7.155556, 9.304348, 7.155556, 5.461988],
  'jefferson': [8.000000, 8.933333, 8.608696, 8.933333, 5.976608],
  'juniata': [6.800000, 7.866667, 8.260870, 7.866667, 3.590643],
  'lackawanna': [5.200000, 6.088889, 7.913043, 6.088889, 5.461988],
  'lancaster': [6.400000, 5.022222, 8.260870, 5.022222, 3.216374],
  'lawrence': [6.800000, 6.800000, 8.956522, 6.800000, 5.134503],
  'lebanon': [5.600000, 5.377778, 7.913043, 5.377778, 4.479532],
  'lehigh': [5.600000, 5.377778, 6.869565, 5.377778, 4.947368],
  'luzerne': [8.000000, 7.155556, 7.913043, 7.155556, 6.350877],
  'lycoming': [5.200000, 6.088889, 8.956522, 6.088889, 5.228070],
  'mckean': [6.400000, 6.800000, 8.956522, 6.800000, 5.976608],
  'mercer': [8.800000, 6.977778, 8.956522, 6.977778, 5.695906],
  'mifflin': [8.800000, 8.933333, 8.608696, 8.933333, 7.192982],
  'monroe': [5.600000, 5.022222, 6.173913, 5.022222, 4.666667],
  'montgomery': [2.400000, 3.600000, 7.565217, 3.600000, 2.327485],
  'montour': [6.800000, 6.977778, 8.260870, 6.977778, 3.450292],
  'northampton': [4.000000, 4.488889, 7.217391, 4.488889, 3.684211],
  'northumberland': [6.400000, 7.511111, 8.260870, 7.511111, 5.181287],
  'perry': [6.400000, 6.800000, 8.608696, 6.800000, 3.216374],
  'philadelphia': [9.600000, 8.222222, 2.000000, 8.222222, 10.000000],
  'pike': [4.400000, 4.311111, 8.260870, 4.311111, 4.058480],
  'potter': [6.800000, 7.155556, 8.956522, 7.155556, 5.087719],
  'schuylkill': [7.200000, 8.044444, 7.913043, 8.044444, 5.134503],
  'snyder': [5.600000, 6.444444, 8.608696, 6.444444, 3.309942],
  'somerset': [6.000000, 6.977778, 8.260870, 6.977778, 4.432749],
  'sullivan': [10.000000, 9.288889, 8.260870, 9.288889, 5.087719],
  'susquehanna': [4.800000, 4.666667, 9.652174, 4.666667, 4.619883],
  'tioga': [8.000000, 8.044444, 8.956522, 8.044444, 5.087719],
  'union': [6.000000, 7.333333, 7.913043, 7.333333, 4.432749],
  'venango': [6.800000, 7.511111, 8.608696, 7.511111, 5.649123],
  'warren': [7.200000, 7.333333, 8.956522, 7.333333, 4.807018],
  'washington': [8.400000, 5.911111, 8.956522, 5.911111, 3.824561],
  'wayne': [6.400000, 7.866667, 8.260870, 7.866667, 4.526316],
  'westmoreland': [4.800000, 3.955556, 9.304348, 3.955556, 3.918129],
  'wyoming': [7.600000, 8.044444, 8.260870, 8.044444, 4.619883],
  'york': [6.000000, 4.311111, 8.956522, 4.311111, 3.403509],
};

let factor = 0

function getColor(percentage) {
  percentage = Math.round(percentage * 10) / 10;
  var r = Math.round((1 - percentage / 0.39) * 255 + (percentage / 0.39) * 101);
  var g = Math.round((1 - percentage / 0.39) * 235 + (percentage / 0.39) * 72);
  var b = Math.round((1 - percentage / 0.39) * 215 + (percentage / 0.39) * 33);
  return [r/255, g/255, b/255]
}

//Scene
const scene = new THREE.Scene()
const loader = new GLTFLoader()
loader.setPath('/assets/')

//const axesHelper = new THREE.AxesHelper( 10 );
//scene.add( axesHelper );

let scaleFactor = 10.5

// load in counties:
// load adams county
const adams = new THREE.Group()
adams.name = 'adams'
scene.add(adams)
loader.load('adams.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['adams'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.4059)
  model.translateX(0.9869)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'adams'
  adams.add(model)
})


// load allegheny county
const allegheny = new THREE.Group()
allegheny.name = 'allegheny'
scene.add(allegheny)
loader.load('allegheny.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['allegheny'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.684)
  model.translateX(-5.6384)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'allegheny'
  allegheny.add(model)
})


// load armstrong county
const armstrong = new THREE.Group()
armstrong.name = 'armstrong'
scene.add(armstrong)
loader.load('armstrong.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['armstrong'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.4335)
  model.translateX(-4.2803)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'armstrong'
  armstrong.add(model)
})


// load beaver county
const beaver = new THREE.Group()
beaver.name = 'beaver'
scene.add(beaver)
loader.load('beaver.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['beaver'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.9463)
  model.translateX(-6.3648)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'beaver'
  beaver.add(model)
})


// load bedford county
const bedford = new THREE.Group()
bedford.name = 'bedford'
scene.add(bedford)
loader.load('bedford.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['bedford'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.0102)
  model.translateX(-2.0057)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'bedford'
  bedford.add(model)
})


// load berks county
const berks = new THREE.Group()
berks.name = 'berks'
scene.add(berks)
loader.load('berks.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['berks'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.7836)
  model.translateX(3.8702)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'berks'
  berks.add(model)
})


// load blair county
const blair = new THREE.Group()
blair.name = 'blair'
scene.add(blair)
loader.load('blair.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['blair'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.564)
  model.translateX(-1.7488)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'blair'
  blair.add(model)
})


// load bradford county
const bradford = new THREE.Group()
bradford.name = 'bradford'
scene.add(bradford)
loader.load('bradford.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['bradford'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-2.4107)
  model.translateX(2.5393)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'bradford'
  bradford.add(model)
})


// load bucks county
const bucks = new THREE.Group()
bucks.name = 'bucks'
scene.add(bucks)
loader.load('bucks.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['bucks'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.966)
  model.translateX(5.9648)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'bucks'
  bucks.add(model)
})


// load butler county
const butler = new THREE.Group()
butler.name = 'butler'
scene.add(butler)
loader.load('butler.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['butler'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.2032)
  model.translateX(-5.3726)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'butler'
  butler.add(model)
})


// load cambria county
const cambria = new THREE.Group()
cambria.name = 'cambria'
scene.add(cambria)
loader.load('cambria.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['cambria'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.5838)
  model.translateX(-2.5378)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'cambria'
  cambria.add(model)
})


// load cameron county
const cameron = new THREE.Group()
cameron.name = 'cameron'
scene.add(cameron)
loader.load('cameron.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['cameron'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.2855)
  model.translateX(-1.3469)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'cameron'
  cameron.add(model)
})


// load carbon county
const carbon = new THREE.Group()
carbon.name = 'carbon'
scene.add(carbon)
loader.load('carbon.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['carbon'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.1466)
  model.translateX(4.4243)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'carbon'
  carbon.add(model)
})


// load centre county
const centre = new THREE.Group()
centre.name = 'centre'
scene.add(centre)
loader.load('centre.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['centre'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.0911)
  model.translateX(-0.3158)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'centre'
  centre.add(model)
})


// load chester county
const chester = new THREE.Group()
chester.name = 'chester'
scene.add(chester)
loader.load('chester.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['chester'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.0851)
  model.translateX(4.4621)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'chester'
  chester.add(model)
})


// load clarion county
const clarion = new THREE.Group()
clarion.name = 'clarion'
scene.add(clarion)
loader.load('clarion.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['clarion'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-0.648)
  model.translateX(-4.2577)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'clarion'
  clarion.add(model)
})


// load clearfield county
const clearfield = new THREE.Group()
clearfield.name = 'clearfield'
scene.add(clearfield)
loader.load('clearfield.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['clearfield'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.0369)
  model.translateX(-1.8659)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'clearfield'
  clearfield.add(model)
})


// load clinton county
const clinton = new THREE.Group()
clinton.name = 'clinton'
scene.add(clinton)
loader.load('clinton.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['clinton'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-0.6748)
  model.translateX(0.0221)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'clinton'
  clinton.add(model)
})


// load columbia county
const columbia = new THREE.Group()
columbia.name = 'columbia'
scene.add(columbia)
loader.load('columbia.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['columbia'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-0.1574)
  model.translateX(2.8023)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'columbia'
  columbia.add(model)
})


// load crawford county
const crawford = new THREE.Group()
crawford.name = 'crawford'
scene.add(crawford)
loader.load('crawford.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['crawford'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-2.1255)
  model.translateX(-5.6531)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'crawford'
  crawford.add(model)
})


// load cumberland county
const cumberland = new THREE.Group()
cumberland.name = 'cumberland'
scene.add(cumberland)
loader.load('cumberland.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['cumberland'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(2.6602)
  model.translateX(0.9188)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'cumberland'
  cumberland.add(model)
})


// load dauphin county
const dauphin = new THREE.Group()
dauphin.name = 'dauphin'
scene.add(dauphin)
loader.load('dauphin.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['dauphin'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.8685)
  model.translateX(1.9904)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'dauphin'
  dauphin.add(model)
})


// load delaware county
const delaware = new THREE.Group()
delaware.name = 'delaware'
scene.add(delaware)
loader.load('delaware.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['delaware'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.2071)
  model.translateX(5.2815)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'delaware'
  delaware.add(model)
})


// load elk county
const elk = new THREE.Group()
elk.name = 'elk'
scene.add(elk)
loader.load('elk.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['elk'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.2859)
  model.translateX(-2.423)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'elk'
  elk.add(model)
})


// load erie county
const erie = new THREE.Group()
erie.name = 'erie'
scene.add(erie)
loader.load('erie.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['erie'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-3.3038)
  model.translateX(-5.6292)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'erie'
  erie.add(model)
})


// load fayette county
const fayette = new THREE.Group()
fayette.name = 'fayette'
scene.add(fayette)
loader.load('fayette.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['fayette'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.263)
  model.translateX(-4.7987)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'fayette'
  fayette.add(model)
})


// load forest county
const forest = new THREE.Group()
forest.name = 'forest'
scene.add(forest)
loader.load('forest.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['forest'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.4879)
  model.translateX(-3.746)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'forest'
  forest.add(model)
})


// load franklin county
const franklin = new THREE.Group()
franklin.name = 'franklin'
scene.add(franklin)
loader.load('franklin.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['franklin'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.0713)
  model.translateX(-0.3511)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'franklin'
  franklin.add(model)
})


// load fulton county
const fulton = new THREE.Group()
fulton.name = 'fulton'
scene.add(fulton)
loader.load('fulton.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['fulton'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.2589)
  model.translateX(-1.1734)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'fulton'
  fulton.add(model)
})


// load greene county
const greene = new THREE.Group()
greene.name = 'greene'
scene.add(greene)
loader.load('greene.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['greene'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.4159)
  model.translateX(-6.1437)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'greene'
  greene.add(model)
})


// load huntingdon county
const huntingdon = new THREE.Group()
huntingdon.name = 'huntingdon'
scene.add(huntingdon)
loader.load('huntingdon.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['huntingdon'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.8438)
  model.translateX(-0.8006)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'huntingdon'
  huntingdon.add(model)
})


// load indiana county
const indiana = new THREE.Group()
indiana.name = 'indiana'
scene.add(indiana)
loader.load('indiana.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['indiana'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.0965)
  model.translateX(-3.5283)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'indiana'
  indiana.add(model)
})


// load jefferson county
const jefferson = new THREE.Group()
jefferson.name = 'jefferson'
scene.add(jefferson)
loader.load('jefferson.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['jefferson'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-0.4424)
  model.translateX(-3.1238)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'jefferson'
  jefferson.add(model)
})


// load juniata county
const juniata = new THREE.Group()
juniata.name = 'juniata'
scene.add(juniata)
loader.load('juniata.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['juniata'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.6058)
  model.translateX(0.6663)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'juniata'
  juniata.add(model)
})


// load lackawanna county
const lackawanna = new THREE.Group()
lackawanna.name = 'lackawanna'
scene.add(lackawanna)
loader.load('lackawanna.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['lackawanna'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.3076)
  model.translateX(4.616)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'lackawanna'
  lackawanna.add(model)
})


// load lancaster county
const lancaster = new THREE.Group()
lancaster.name = 'lancaster'
scene.add(lancaster)
loader.load('lancaster.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['lancaster'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(2.9948)
  model.translateX(3.1465)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'lancaster'
  lancaster.add(model)
})


// load lawrence county
const lawrence = new THREE.Group()
lawrence.name = 'lawrence'
scene.add(lawrence)
loader.load('lawrence.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['lawrence'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-0.0493)
  model.translateX(-6.2702)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'lawrence'
  lawrence.add(model)
})


// load lebanon county
const lebanon = new THREE.Group()
lebanon.name = 'lebanon'
scene.add(lebanon)
loader.load('lebanon.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['lebanon'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.9085)
  model.translateX(2.8593)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'lebanon'
  lebanon.add(model)
})


// load lehigh county
const lehigh = new THREE.Group()
lehigh.name = 'lehigh'
scene.add(lehigh)
loader.load('lehigh.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['lehigh'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.1595)
  model.translateX(4.7354)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'lehigh'
  lehigh.add(model)
})


// load luzerne county
const luzerne = new THREE.Group()
luzerne.name = 'luzerne'
scene.add(luzerne)
loader.load('luzerne.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['luzerne'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-0.5519)
  model.translateX(3.8818)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'luzerne'
  luzerne.add(model)
})


// load lycoming county
const lycoming = new THREE.Group()
lycoming.name = 'lycoming'
scene.add(lycoming)
loader.load('lycoming.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['lycoming'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.0289)
  model.translateX(1.3982)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'lycoming'
  lycoming.add(model)
})


// load mckean county
const mckean = new THREE.Group()
mckean.name = 'mckean'
scene.add(mckean)
loader.load('mckean.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['mckean'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-2.4706)
  model.translateX(-2.2178)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'mckean'
  mckean.add(model)
})


// load mercer county
const mercer = new THREE.Group()
mercer.name = 'mercer'
scene.add(mercer)
loader.load('mercer.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['mercer'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-0.9364)
  model.translateX(-6.1273)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'mercer'
  mercer.add(model)
})


// load mifflin county
const mifflin = new THREE.Group()
mifflin.name = 'mifflin'
scene.add(mifflin)
loader.load('mifflin.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['mifflin'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.2215)
  model.translateX(0.0757)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'mifflin'
  mifflin.add(model)
})


// load monroe county
const monroe = new THREE.Group()
monroe.name = 'monroe'
scene.add(monroe)
loader.load('monroe.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['monroe'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-0.1849)
  model.translateX(5.4087)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'monroe'
  monroe.add(model)
})


// load montgomery county
const montgomery = new THREE.Group()
montgomery.name = 'montgomery'
scene.add(montgomery)
loader.load('montgomery.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['montgomery'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(2.356)
  model.translateX(5.375)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'montgomery'
  montgomery.add(model)
})


// load montour county
const montour = new THREE.Group()
montour.name = 'montour'
scene.add(montour)
loader.load('montour.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['montour'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-0.0949)
  model.translateX(2.2726)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'montour'
  montour.add(model)
})


// load northampton county
const northampton = new THREE.Group()
northampton.name = 'northampton'
scene.add(northampton)
loader.load('northampton.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['northampton'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.6818)
  model.translateX(5.3738)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'northampton'
  northampton.add(model)
})


// load northumberland county
const northumberland = new THREE.Group()
northumberland.name = 'northumberland'
scene.add(northumberland)
loader.load('northumberland.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['northumberland'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.3333)
  model.translateX(2.2568)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'northumberland'
  northumberland.add(model)
})


// load perry county
const perry = new THREE.Group()
perry.name = 'perry'
scene.add(perry)
loader.load('perry.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['perry'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.8412)
  model.translateX(0.7894)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'perry'
  perry.add(model)
})


// load philadelphia county
const philadelphia = new THREE.Group()
philadelphia.name = 'philadelphia'
scene.add(philadelphia)
loader.load('philadelphia.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['philadelphia'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(2.9794)
  model.translateX(5.9485)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'philadelphia'
  philadelphia.add(model)
})


// load pike county
const pike = new THREE.Group()
pike.name = 'pike'
scene.add(pike)
loader.load('pike.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['pike'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.1532)
  model.translateX(6.05)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'pike'
  pike.add(model)
})


// load potter county
const potter = new THREE.Group()
potter.name = 'potter'
scene.add(potter)
loader.load('potter.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['potter'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-2.2683)
  model.translateX(-0.645)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'potter'
  potter.add(model)
})


// load schuylkill county
const schuylkill = new THREE.Group()
schuylkill.name = 'schuylkill'
scene.add(schuylkill)
loader.load('schuylkill.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['schuylkill'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.8268)
  model.translateX(3.2829)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'schuylkill'
  schuylkill.add(model)
})


// load snyder county
const snyder = new THREE.Group()
snyder.name = 'snyder'
scene.add(snyder)
loader.load('snyder.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['snyder'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.725)
  model.translateX(1.2844)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'snyder'
  snyder.add(model)
})


// load somerset county
const somerset = new THREE.Group()
somerset.name = 'somerset'
scene.add(somerset)
loader.load('somerset.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['somerset'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.0601)
  model.translateX(-3.3397)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'somerset'
  somerset.add(model)
})


// load sullivan county
const sullivan = new THREE.Group()
sullivan.name = 'sullivan'
scene.add(sullivan)
loader.load('sullivan.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['sullivan'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.3508)
  model.translateX(2.5625)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'sullivan'
  sullivan.add(model)
})


// load susquehanna county
const susquehanna = new THREE.Group()
susquehanna.name = 'susquehanna'
scene.add(susquehanna)
loader.load('susquehanna.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['susquehanna'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-2.5845)
  model.translateX(4.1974)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'susquehanna'
  susquehanna.add(model)
})


// load tioga county
const tioga = new THREE.Group()
tioga.name = 'tioga'
scene.add(tioga)
loader.load('tioga.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['tioga'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-2.3809)
  model.translateX(0.8811)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'tioga'
  tioga.add(model)
})


// load union county
const union = new THREE.Group()
union.name = 'union'
scene.add(union)
loader.load('union.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['union'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(0.0662)
  model.translateX(1.2556)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'union'
  union.add(model)
})


// load venango county
const venango = new THREE.Group()
venango.name = 'venango'
scene.add(venango)
loader.load('venango.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['venango'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.2646)
  model.translateX(-4.9182)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'venango'
  venango.add(model)
})


// load warren county
const warren = new THREE.Group()
warren.name = 'warren'
scene.add(warren)
loader.load('warren.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['warren'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-2.5239)
  model.translateX(-3.7975)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'warren'
  warren.add(model)
})


// load washington county
const washington = new THREE.Group()
washington.name = 'washington'
scene.add(washington)
loader.load('washington.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['washington'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(2.3287)
  model.translateX(-6.0466)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'washington'
  washington.add(model)
})


// load wayne county
const wayne = new THREE.Group()
wayne.name = 'wayne'
scene.add(wayne)
loader.load('wayne.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['wayne'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.9706)
  model.translateX(5.4447)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'wayne'
  wayne.add(model)
})


// load westmoreland county
const westmoreland = new THREE.Group()
westmoreland.name = 'westmoreland'
scene.add(westmoreland)
loader.load('westmoreland.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['westmoreland'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(1.9439)
  model.translateX(-4.2793)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'westmoreland'
  westmoreland.add(model)
})


// load wyoming county
const wyoming = new THREE.Group()
wyoming.name = 'wyoming'
scene.add(wyoming)
loader.load('wyoming.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['wyoming'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(-1.6192)
  model.translateX(3.7603)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'wyoming'
  wyoming.add(model)
})


// load york county
const york = new THREE.Group()
york.name = 'york'
scene.add(york)
loader.load('york.gltf', function(gltf) {
  var model = gltf.scene
  model.traverse( function(node) {
    if (node.isMesh) {
      const color = getColor(countyPops['york'])
      node.material.color.setRGB(color[0], color[1], color[2])
    }
  })
  model.translateZ(3.1607)
  model.translateX(2.2353)
  model.scale.set(scaleFactor, scaleFactor, scaleFactor)
  model.name = 'york'
  york.add(model)
})

//Factor explanations:
let expl = {
  'ASTHMA': 'Asthma is a chronic respiratory condition that impacts the lungs\' airways, which are responsible for transporting air in and out of the lungs. Those who suffer from asthma can experience inflamed and narrow airways, which can make exhaling difficult. In the United States, around 25 million individuals have asthma, which equates to roughly 1 in 13 people. Out of the 25 million, approximately 20 million are adults aged 18 and above. Asthma rates are particularly high among Black adults in the United States.',
  'COPD': 'Chronic obstructive pulmonary disease, commonly known as COPD, is an umbrella term for a collection of illnesses that impede airflow and breathing. This category includes diseases such as emphysema and chronic bronchitis. COPD is an ailment that progresses over time, reducing the volume of air that travels through the airways, thus making it challenging to breathe. COPD is a principal cause of disability and the fourth most common cause of death in the US, as reported by the CDC.',
  "CANCER": "Cancer is a broad group of diseases in which abnormal cells grow uncontrollably and can invade nearby tissues or spread to distant organs. There are more than 100 known cancer types—such as breast, prostate, colorectal, skin, and blood cancers—each with distinct risk factors, symptoms, and treatments. Taken together, cancer is the second‑leading cause of death in the United States, responsible for roughly one in every five deaths.",
  "CORONARY": "Coronary heart disease (CHD) is a form of cardiovascular disease in which plaque builds up inside the coronary arteries, restricting blood flow to the heart muscle. This can lead to angina, heart attacks, heart failure, and sudden cardiac death. CHD is the single largest contributor to cardiovascular mortality worldwide and in the United States, causing about one in three heart‑related deaths. Early detection, lifestyle changes, and effective medical or surgical treatments can dramatically lower CHD‑related deaths.",
  'POVERTY': 'The federal poverty level (FPL), also known as the "poverty line," serves as a crucial economic measure to determine if an individual or family qualifies for specific federal benefits and programs. Once a year, the Department of Health and Human Services (HHS) updates the poverty guidelines, which represent the minimum amount of income necessary for a family to afford basic needs such as food, clothing, shelter, and transportation. These guidelines are adjusted for inflation to ensure their accuracy.'
}

//Choose factor:
let factors = {'ASTHMA': 0, 'COPD': 1, 'CANCER': 2, 'CORONARY': 3, 'POVERTY': 4}
const options = document.querySelectorAll(".button");
let selectedFactor = "ASTHMA";
factor = factors[selectedFactor]

const asthma = options[0]
asthma.classList.add("active");

const header = document.querySelector("#info-title");
const paragraph = document.querySelector("#info-text");
const statLine = document.querySelector("#statline");

const pennStats = {
  'ASTHMA': '8.52% of Pennsylvania\'s population suffers from asthma.',
  'COPD': "5.23% of Pennsylvania's population suffers from COPD.",
  'CANCER': "5.62% of Pennsylvania's population suffers from cancer.",
  'CORONARY': "4.74% of Pennsylvania's population suffers from coronary heart disease.",
  'POVERTY': "12.2% of Pennsylvania's population lives in poverty."
}

const afflictionPhrase = {
  'ASTHMA': 'suffers from asthma.',
  'COPD': "suffers from COPD.",
  'CANCER': "suffers from cancer.",
  'CORONARY': "suffers from coronary heart disease.",
  'POVERTY': "lives in poverty."
}

header.textContent = selectedFactor + '.'
paragraph.textContent = expl[selectedFactor]

options.forEach((option) => {
  option.addEventListener("click", function() {
    options.forEach((option) => {
      option.classList.remove('active')
    })
    this.classList.add('active')

    selectedFactor = this.textContent
    console.log(selectedFactor)
    factor = factors[selectedFactor]
    header.textContent = selectedFactor + '.'
    paragraph.textContent = expl[selectedFactor]
    statLine.textContent = pennStats[selectedFactor]

    counties.forEach((county) => scaleCounty(county))
  })
})

//Scale functionality
const counties = [adams, allegheny, armstrong, beaver, bedford, berks, blair, bradford, bucks, butler, cambria, cameron, carbon, centre, chester, clarion, clearfield, clinton, columbia, crawford, cumberland, dauphin, delaware, elk, erie, fayette, forest, franklin, fulton, greene, huntingdon, indiana, jefferson, juniata, lackawanna, lancaster, lawrence, lebanon, lehigh, luzerne, lycoming, mckean, mercer, mifflin, monroe, montgomery, montour, northampton, northumberland, perry, philadelphia, pike, potter, schuylkill, snyder, somerset, sullivan, susquehanna, tioga, union, venango, warren, washington, wayne, westmoreland, wyoming, york]

// translate all counties up
const y_trans = 15

counties.forEach((county) => county.translateY(y_trans))

function scaleCounty(county) {
  const height = incidence[county.name][factor]
  gsap.to(county.scale, 1, {x: 1, y: height, z: 1})
}

setTimeout(function(){
  counties.forEach((county) => scaleCounty(county))
}, 1500)

// Create a raycaster to detect mouse intersections with the scene
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Keep track of the hovered object
var hoveredObject;
var currentHoverColor;
var hoveredName;
const countySubtitle = document.querySelector("#county");

// Add the event listener for mousemove
document.addEventListener('mousemove', onMouseMove, false);

// Function that gets called on mousemove
function onMouseMove(event) {
  // Calculate the mouse position in normalized device coordinates
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // Cast a ray from the mouse position into the scene
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);

  var hoverScale = 1

  // If there's an intersection with an object, increase its scale
  if (intersects.length > 0) {
    var object = intersects[0].object;
    if (object !== hoveredObject) {
      if (hoveredObject) {
          // Revert the scale of the previously hovered object
          hoveredObject.scale.x /= hoverScale;
          hoveredObject.scale.y /= hoverScale;
          hoveredObject.scale.z /= hoverScale;
          hoveredObject.material.color = hoveredObject.currentHoverColor;
      }
      hoveredObject = object;
      // Increase the scale of the newly hovered object
      hoveredObject.scale.x *= hoverScale;
      hoveredObject.scale.y *= hoverScale;
      hoveredObject.scale.z *= hoverScale;
      hoveredObject.currentHoverColor = hoveredObject.material.color;
      var darkenFactor = 0.75;
      hoveredObject.material.color = new THREE.Color(
          hoveredObject.currentHoverColor.r * darkenFactor,
          hoveredObject.currentHoverColor.g * darkenFactor,
          hoveredObject.currentHoverColor.b * darkenFactor
      );

      var parentGroup = hoveredObject.parent;
      while (!parentGroup.hasOwnProperty("name")) {
          parentGroup = parentGroup.parent;
      }
      console.log("Hovered over " + parentGroup.name);
      hoveredName = parentGroup.name
      let upperHoveredName = hoveredName.charAt(0).toUpperCase() + hoveredName.slice(1);
      countySubtitle.textContent = Math.round(countyPops[hoveredName] * 10000)/100 + '% of ' + upperHoveredName + " County's population is Black or African-American."
      statLine.textContent = Math.round(nonNormIncidence[hoveredName][factor] * 10000)/100 + '% of ' + upperHoveredName + " County's population " + afflictionPhrase[selectedFactor]
    }
  } else {
    // If there's no intersection, reset the hovered object
    if (hoveredObject) {
      hoveredObject.scale.x /= hoverScale;
      hoveredObject.scale.y /= hoverScale;
      hoveredObject.scale.z /= hoverScale;
      hoveredObject.material.color = hoveredObject.currentHoverColor;
      hoveredObject = null;
      countySubtitle.textContent = "12.73% of Pennsylvania's population is Black or African-American."
      statLine.textContent = pennStats[selectedFactor]
    }
  }
}

//Canvas
const canvas = document.querySelector('#contentWindow')

//Sizes
const sizes = {
  width: canvas.clientWidth,
  height: canvas.clientHeight,
}

//Light
/*
const ptLight = new THREE.PointLight(0xffffff, 0.75, 150)
ptLight.position.set(50, 50, 50)
ptLight.castShadow = true
scene.add(ptLight)

const ptLight2 = new THREE.PointLight(0xffffff, 0.75, 150)
ptLight2.position.set(-50, 50, 50)
ptLight2.castShadow = true
scene.add(ptLight2)

const ptLight3 = new THREE.PointLight(0xffffff, 0.75, 150)
ptLight3.position.set(-50, 50, -50)
ptLight3.castShadow = true
scene.add(ptLight3)

const ptLight4 = new THREE.PointLight(0xffffff, 0.75, 150)
ptLight4.position.set(50, 50, -50)
ptLight4.castShadow = true
scene.add(ptLight4)

const topLight = new THREE.PointLight(0xffffff, 0.75, 25)
topLight.position.set(0, 50, 0)
topLight.castShadow = true
scene.add(topLight)

const backLight = new THREE.PointLight(0xffffff, 0.25, 75)
backLight.position.set(0, -50, -50)
backLight.castShadow = true
scene.add(backLight)
*/

const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.25)
dirLight1.position.set(0, 50*scaleFactor, 50*scaleFactor)
dirLight1.castShadow = true
scene.add(dirLight1)

const ambLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambLight)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 50 * scaleFactor)
camera.position.z = 0 * scaleFactor
camera.position.y = 30 * scaleFactor
scene.add(camera)

//Renderer
const renderer = new THREE.WebGLRenderer({canvas}, {alpha: true})
renderer.setClearColor ( 0x000000, 0)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.render(scene, camera)


//Controls
const controls = new OrbitControls(camera, canvas) // experiment with other controls in import statement?
controls.enableDamping = true
//controls.enableZoom = false
//controls.enablePan = false
//controls.autoRotate = true
//controls.autoRotateSpeed = 10
controls.maxPolarAngle = Math.PI / 2


var minPan = new THREE.Vector3(-20, -20, -20);
var maxPan = new THREE.Vector3(20, 20, 20);
var _v = new THREE.Vector3();

controls.minDistance = 75;
controls.maxDistance = 150;
    
controls.addEventListener("change", function() {
    _v.copy(controls.target);
    controls.target.clamp(minPan, maxPan);
    _v.sub(controls.target);
    camera.position.sub(_v);
})


//Resize
window.addEventListener('resize', () => {
    sizes.width = canvas.clientWidth
    sizes.height = canvas.clientHeight
    
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

//Timeline
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
tl.to("#contentWindow", {duration: 1.5, top: "0%", delay: 10}, 0)
tl.to(camera.position, {duration: 1.5, x: 0, y: 15*scaleFactor, z: 25*scaleFactor, delay: 1}, 0)
scene.translateY(-2.5*scaleFactor)

//Loop
const loop = () => {
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()