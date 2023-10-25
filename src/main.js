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
  adams: 0.015011747, 
  allegheny: 0.13088188, 
  armstrong: 0.006787882, 
  beaver: 0.066391226, 
  bedford: 0.004035563, 
  berks: 0.051281453, 
  blair: 0.020623341, 
  bradford: 0.006737039, 
  bucks: 0.040791106, 
  butler: 0.011575997, 
  cambria: 0.043664589, 
  cameron: 0.003518804, 
  carbon: 0.018656659, 
  centre: 0.03462054, 
  chester: 0.055249404, 
  clarion: 0.014822373, 
  clearfield: 0.023658797, 
  clinton: 0.011935915, 
  columbia: 0.014089947, 
  crawford: 0.01822774, 
  cumberland: 0.04270645, 
  dauphin: 0.177611112, 
  delaware: 0.224055614, 
  elk: 0.002581478, 
  erie: 0.07599049, 
  fayette: 0.044944256, 
  forest: 0.177398537, 
  franklin: 0.034232871, 
  fulton: 0.008793625, 
  greene: 0.030121822, 
  huntingdon: 0.051505942, 
  indiana: 0.029959397, 
  jefferson: 0.00294435, 
  juniata: 0.005657408, 
  lackawanna: 0.038676029, 
  lancaster: 0.040496651, 
  lawrence: 0.042570001, 
  lebanon: 0.022567833, 
  lehigh: 0.073657681, 
  luzerne: 0.049835071, 
  lycoming: 0.05109994, 
  mckean: 0.021443411, 
  mercer: 0.05773958, 
  mifflin: 0.008408643, 
  monroe: 0.147890713, 
  montgomery: 0.095482708, 
  montour: 0.018250993, 
  northampton: 0.062124742, 
  northumberland: 0.028140583, 
  perry: 0.006587845, 
  philadelphia: 0.393105861, 
  pike: 0.05612027, 
  potter: 0.002622591, 
  schuylkill: 0.030716747, 
  snyder: 0.013564526, 
  somerset: 0.025374685, 
  sullivan: 0.014554795, 
  susquehanna: 0.003772701, 
  tioga: 0.008356682, 
  union: 0.060518732, 
  venango: 0.008800095, 
  warren: 0.003861404, 
  washington: 0.033236366, 
  wayne: 0.033662399, 
  westmoreland: 0.025906283, 
  wyoming: 0.008937819, 
  york: 0.061342395 
}

let nonNormIncidence = {
  'adams': [0.1035, 0.0615, 0.0006, 0.0892, 0.07657],
  'allegheny': [0.1044, 0.0585, 0.0006, 0.0829, 0.10177],
  'armstrong': [0.1027, 0.0642, 0.0006, 0.0947, 0.11519],
  'beaver': [0.1031, 0.0624, 0.0006, 0.0914, 0.08961],
  'bedford': [0.1024, 0.0645, 0.0006, 0.096, 0.10827],
  'berks': [0.1051, 0.0562, 0.0006, 0.0784, 0.10628],
  'blair': [0.1035, 0.0607, 0.0006, 0.0885, 0.11246],
  'bradford': [0.1032, 0.0612, 0.0006, 0.0903, 0.10568],
  'bucks': [0.1041, 0.0604, 0.0006, 0.0857, 0.05884],
  'butler': [0.1041, 0.0603, 0.0006, 0.0858, 0.07203],
  'cambria': [0.1026, 0.0635, 0.0006, 0.0943, 0.11937],
  'cameron': [0.1, 0.0707, 0.0007, 0.1102, 0.13256],
  'carbon': [0.1031, 0.0632, 0.0006, 0.0921, 0.11186],
  'centre': [0.1064, 0.0537, 0.0006, 0.0706, 0.11356],
  'chester': [0.1053, 0.0561, 0.0006, 0.0774, 0.05107],
  'clarion': [0.104, 0.0599, 0.0006, 0.0859, 0.12241],
  'clearfield': [0.1035, 0.0623, 0.0006, 0.0897, 0.13212],
  'clinton': [0.1045, 0.0577, 0.0006, 0.0821, 0.12738],
  'columbia': [0.1041, 0.0597, 0.0006, 0.085, 0.11025],
  'crawford': [0.1034, 0.0611, 0.0006, 0.0892, 0.12175],
  'cumberland': [0.1046, 0.0575, 0.0006, 0.0813, 0.07281],
  'dauphin': [0.1052, 0.0555, 0.0006, 0.0774, 0.11399],
  'delaware': [0.1055, 0.0552, 0.0006, 0.0762, 0.08948],
  'elk': [0.1026, 0.0646, 0.0006, 0.0951, 0.08194],
  'erie': [0.1046, 0.0574, 0.0006, 0.0813, 0.12841],
  'fayette': [0.1031, 0.0625, 0.0006, 0.0914, 0.18186],
  'forest': [0.1018, 0.0712, 0.0006, 0.1028, 0.14889],
  'franklin': [0.1041, 0.0587, 0.0006, 0.0846, 0.09223],
  'fulton': [0.1032, 0.0626, 0.0006, 0.0916, 0.10454],
  'greene': [0.1042, 0.0598, 0.0006, 0.085, 0.11662],
  'huntingdon': [0.1035, 0.0617, 0.0006, 0.0893, 0.09495],
  'indiana': [0.1041, 0.0593, 0.0006, 0.0848, 0.12634],
  'jefferson': [0.1034, 0.0608, 0.0006, 0.089, 0.10831],
  'juniata': [0.1037, 0.0597, 0.0006, 0.0869, 0.09842],
  'lackawanna': [0.104, 0.0594, 0.0006, 0.0855, 0.11747],
  'lancaster': [0.1048, 0.0557, 0.0006, 0.0793, 0.075],
  'lawrence': [0.1029, 0.0624, 0.0006, 0.0922, 0.12548],
  'lebanon': [0.1043, 0.0577, 0.0006, 0.0832, 0.08725],
  'lehigh': [0.1054, 0.0548, 0.0006, 0.076, 0.11431],
  'luzerne': [0.1041, 0.0595, 0.0006, 0.0852, 0.14602],
  'lycoming': [0.1041, 0.0589, 0.0006, 0.0845, 0.12608],
  'mckean': [0.104, 0.0601, 0.0006, 0.0858, 0.1286],
  'mercer': [0.103, 0.0626, 0.0006, 0.0922, 0.11679],
  'mifflin': [0.1033, 0.0605, 0.0006, 0.0894, 0.13008],
  'monroe': [0.1046, 0.0594, 0.0006, 0.0827, 0.10198],
  'montgomery': [0.1048, 0.0573, 0.0006, 0.0804, 0.05501],
  'montour': [0.1034, 0.0611, 0.0006, 0.0896, 0.08597],
  'northampton': [0.1042, 0.0592, 0.0006, 0.0843, 0.07291],
  'northumberland': [0.1032, 0.0619, 0.0006, 0.0904, 0.11621],
  'perry': [0.1042, 0.0595, 0.0006, 0.0847, 0.08348],
  'philadelphia': [0.1069, 0.0506, 0.0006, 0.0666, 0.18805],
  'pike': [0.1022, 0.0665, 0.0006, 0.0982, 0.09172],
  'potter': [0.102, 0.0648, 0.0006, 0.0979, 0.12016],
  'schuylkill': [0.1036, 0.0612, 0.0006, 0.0884, 0.1205],
  'snyder': [0.1043, 0.0585, 0.0006, 0.0835, 0.09418],
  'somerset': [0.1026, 0.0642, 0.0006, 0.0947, 0.10906],
  'sullivan': [0.0994, 0.0758, 0.0007, 0.1162, 0.11974],
  'susquehanna': [0.102, 0.0659, 0.0006, 0.0986, 0.11448],
  'tioga': [0.1029, 0.0625, 0.0006, 0.0924, 0.11127],
  'union': [0.1048, 0.0573, 0.0006, 0.0802, 0.09024],
  'venango': [0.1023, 0.065, 0.0006, 0.0968, 0.13682],
  'warren': [0.1023, 0.0647, 0.0006, 0.0966, 0.10876],
  'washington': [0.1035, 0.0614, 0.0006, 0.089, 0.08435],
  'wayne': [0.1019, 0.0669, 0.0006, 0.0999, 0.09767],
  'westmoreland': [0.1024, 0.0648, 0.0006, 0.096, 0.09088],
  'wyoming': [0.103, 0.0628, 0.0006, 0.0923, 0.10156],
  'york': [0.1049, 0.0572, 0.0006, 0.0802, 0.06969]
}

// incidence format: {'county' : [asthma, copd, lung cancer, cardiovascular, poverty]}
// incidence[county][factor]
// factor: {0: asthma, 1: copd, 2: lung cancer, 3: cardiovascular, 4: poverty}
let incidence = {
  'adams': [5.519503921, 4.372675309, 2.459950262, 4.636008015, 1.938015082],
  'allegheny': [6.759332989, 3.188334215, 2.808295382, 3.373499124, 3.802896357],
  'armstrong': [4.418888453, 5.465429542, 2.82971022, 5.753413437, 4.796234616],
  'beaver': [5.018926525, 4.732947307, 2.923628664, 5.086923251, 2.902841046],
  'bedford': [4.054499219, 5.601264138, 2.71518717, 6.030402825, 4.283691418],
  'berks': [7.70549645, 2.2830293, 2.847851251, 2.464162685, 4.136353283],
  'blair': [5.573732823, 4.084585698, 3.141713064, 4.499582934, 4.593722714],
  'bradford': [5.144840206, 4.25437653, 3.383721126, 4.858129889, 4.092056385],
  'bucks': [6.346851181, 3.941847598, 2.868215024, 3.937539125, 0.625797767],
  'butler': [6.29848913, 3.921176299, 2.846150888, 3.9537996, 1.602240291],
  'cambria': [4.338341297, 5.170136508, 2.691028242, 5.684170598, 5.105609284],
  'cameron': [0.848066776, 8.045054714, 10.00069284, 8.895022289, 6.081742025],
  'carbon': [4.990683011, 5.087305366, 2.894525973, 5.227146589, 4.549477405],
  'centre': [9.448188134, 1.286229619, 3.266853911, 0.873145434, 4.675178333],
  'chester': [7.983656225, 2.218783716, 2.800354515, 2.261797554, 0.051072692],
  'clarion': [6.153432842, 3.748115498, 2.206067604, 3.984457367, 5.330502924],
  'clearfield': [5.503002725, 4.716933897, 3.062324334, 4.755469602, 6.048715663],
  'clinton': [6.901805487, 2.88548784, 2.670473637, 3.198756172, 5.698212874],
  'columbia': [6.367412677, 3.685172506, 2.291964027, 3.797982817, 4.430640214],
  'crawford': [5.420528399, 4.217489629, 2.956623755, 4.640765241, 5.281398938],
  'cumberland': [7.067565973, 2.809338534, 2.988237502, 3.052710086, 1.660030766],
  'dauphin': [7.88208254, 2.009431011, 2.794260364, 2.251712589, 4.7072658],
  'delaware': [8.160815896, 1.876563546, 2.756311388, 2.014833995, 2.893631396],
  'elk': [4.395592452, 5.644766487, 2.840501478, 5.84384313, 2.335391656],
  'erie': [7.066680941, 2.772041048, 2.779709494, 3.045579311, 5.77447954],
  'fayette': [5.050475499, 4.798895376, 2.908951732, 5.083643981, 9.729896484],
  'forest': [3.255460264, 8.261640377, 0.0005743, 7.402391705, 7.289771843],
  'franklin': [6.340809489, 3.282724294, 3.045528031, 3.720370999, 3.096699205],
  'fulton': [5.093997677, 4.835552551, 3.91040261, 5.127580106, 4.008216394],
  'greene': [6.417618681, 3.70043997, 3.654483301, 3.800427059, 4.901602599],
  'huntingdon': [5.510927192, 4.477475444, 2.634038018, 4.661300514, 3.298479194],
  'indiana': [6.357066108, 3.522098899, 2.976899356, 3.748824404, 5.621078535],
  'jefferson': [5.459633731, 4.121231709, 2.433207926, 4.601630457, 4.286831285],
  'juniata': [5.866260361, 3.677271807, 2.951956488, 4.183749816, 3.554970183],
  'lackawanna': [6.188915575, 3.550023751, 2.817146598, 3.899194061, 4.96442557],
  'lancaster': [7.348375453, 2.08947119, 2.830422756, 2.63894427, 1.821606219],
  'lawrence': [4.78478143, 4.762534981, 3.110756925, 5.258900555, 5.557345076],
  'lebanon': [6.573939933, 2.873549842, 2.76543796, 3.422320268, 2.72829779],
  'lehigh': [8.15843839, 1.724856346, 2.741674302, 1.968246756, 4.730629394],
  'luzerne': [6.297759411, 3.603107397, 2.916682856, 3.843101525, 7.077880632],
  'lycoming': [6.394526657, 3.372037279, 2.969390978, 3.700803991, 5.601679097],
  'mckean': [6.259162485, 3.822693612, 3.842322282, 3.962892352, 5.788748591],
  'mercer': [4.821165379, 4.840347523, 2.847116548, 5.247985197, 4.91445483],
  'mifflin': [5.291831685, 3.993224941, 2.830851937, 4.680671921, 5.897943402],
  'monroe': [7.064951274, 3.562758754, 3.114393041, 3.321544945, 3.818733678],
  'montgomery': [7.324634601, 2.712670248, 2.844284105, 2.86182058, 0.342704737],
  'montour': [5.368469103, 4.223145869, 2.985953133, 4.719829447, 2.633332694],
  'northampton': [6.521647218, 3.476887938, 2.848381837, 3.646486169, 1.667469118],
  'northumberland': [5.190695441, 4.532527742, 2.958600342, 4.896617272, 4.871608872],
  'perry': [6.50254293, 3.596917515, 2.666626112, 3.723225723, 2.449708095],
  'philadelphia': [10.10690237, 0.050609856, 2.698138185, 0.066618224, 10.18805096],
  'pike': [3.80971032, 6.363475078, 2.705433424, 6.461593423, 3.059247978],
  'potter': [3.514071067, 5.702051679, 2.825954329, 6.412074856, 5.163862998],
  'schuylkill': [5.701392167, 4.269980869, 3.11265948, 4.473240303, 5.189288047],
  'snyder': [6.613985856, 3.179792625, 3.863073777, 3.487026376, 3.241096924],
  'somerset': [4.369158076, 5.471007403, 3.615280558, 5.762557021, 4.342159442],
  'sullivan': [0.099441908, 10.07576526, 8.620129406, 10.11618468, 5.132464275],
  'susquehanna': [3.577405665, 6.130272739, 2.161036684, 6.54283646, 4.743694118],
  'tioga': [4.764537861, 4.791025714, 3.780166467, 5.287809482, 4.505575832],
  'union': [7.316729924, 2.716409528, 2.975396911, 2.827735382, 2.949469825],
  'venango': [3.945162617, 5.782963404, 3.514959905, 6.178902223, 6.396921395],
  'warren': [3.91276388, 5.670632647, 3.585220208, 6.151643106, 4.320255777],
  'washington': [5.542248812, 4.362926098, 2.951111441, 4.608953016, 2.513795664],
  'wayne': [3.330926401, 6.544223454, 2.666911553, 6.817711648, 3.499342442],
  'westmoreland': [4.111063447, 5.704370571, 2.836487138, 6.022964567, 2.997353463],
  'wyoming': [4.904036652, 4.927047881, 2.377646603, 5.264335591, 3.786990322],
  'york': [7.364358816, 2.668456178, 2.867410415, 2.824847322, 1.428878999]
}

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
  'LUNG CANCER': 'Lung cancer is a type of cancer that originates in the tissues of the lung, typically in the cells lining the airways. There are two main variations: small cell and non-small cell lung cancer, which differ in growth and treatment methods. Non-small cell lung cancer is the more prevalent form. Lung cancer is the foremost cause of cancer-related deaths in the US, accounting for approximately one out of every five cancer deaths. Each year, more people die of lung cancer than of colon, breast, and prostate cancers combined.',
  'CARDIOVASCULAR': 'Cardiovascular disease refers to a group of diseases that impact the health of the heart and blood vessels. It is a leading cause of death globally and in the U.S., with nearly 50% of American adults experiencing some form of the disease. This disease does not discriminate based on age, gender, ethnicity, or socioeconomic status. However, women and individuals assigned female at birth are at a higher risk, with one in every three individuals in this group dying from cardiovascular disease.',
  'POVERTY': 'The federal poverty level (FPL), also known as the "poverty line," serves as a crucial economic measure to determine if an individual or family qualifies for specific federal benefits and programs. Once a year, the Department of Health and Human Services (HHS) updates the poverty guidelines, which represent the minimum amount of income necessary for a family to afford basic needs such as food, clothing, shelter, and transportation. These guidelines are adjusted for inflation to ensure their accuracy.'
}

//Choose factor:
let factors = {'ASTHMA': 0, 'COPD': 1, 'LUNG CANCER': 2, 'CARDIOVASCULAR': 3, 'POVERTY': 4}
const options = document.querySelectorAll(".button");
let selectedFactor = "ASTHMA";
factor = factors[selectedFactor]

const asthma = options[0]
asthma.classList.add("active");

const header = document.querySelector("#info-title");
const paragraph = document.querySelector("#info-text");
const statLine = document.querySelector("#statline");

const pennStats = {
  'ASTHMA': '10.46% of Pennsylvania\'s population suffers from asthma.',
  'COPD': "5.78% of Pennsylvania's population suffers from COPD.",
  'LUNG CANCER': "0.06% of Pennsylvania's population suffers from lung cancer.",
  'CARDIOVASCULAR': "8.16% of Pennsylvania's population suffers from cardiovascular disease.",
  'POVERTY': "10.53% of Pennsylvania's population lives in poverty."
}

const afflictionPhrase = {
  'ASTHMA': 'suffers from asthma.',
  'COPD': "suffers from COPD.",
  'LUNG CANCER': "suffers from lung cancer.",
  'CARDIOVASCULAR': "suffers from cardiovascular disease.",
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
      countySubtitle.textContent = "11.09% of Pennsylvania's population is Black or African-American."
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