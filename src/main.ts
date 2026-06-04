import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import "./style.css";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.appendChild(
    renderer.domElement
);

const geometry = new THREE.BoxGeometry(
    2,
    2,
    2
);

const material =
    new THREE.MeshStandardMaterial({
        color: 0x00aaff,
        roughness: 0.4,
        metalness: 0.2,
    });

const cube = new THREE.Mesh(
    geometry,
    material
);

scene.add(cube as unknown as THREE.Object3D);

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.5
    );

scene.add(ambientLight);

const directionalLight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

(directionalLight as unknown as THREE.Object3D).position.set(
    5,
    5,
    5
);

scene.add(directionalLight);

const controls = new OrbitControls(
    camera,
    // renderer.domElement can be HTMLCanvasElement | OffscreenCanvas; cast to HTMLElement for type compatibility
    renderer.domElement as unknown as HTMLElement
);

controls.enableDamping = true;

function animate(): void {
    requestAnimationFrame(
        animate
    );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

animate();

window.addEventListener(
    "resize",
    () => {
        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);

const gridHelper = new THREE.GridHelper(
    15,
    15
) as any;

scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(
    5
) as any;

scene.add(axesHelper);


