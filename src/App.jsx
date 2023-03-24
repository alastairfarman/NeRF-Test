import React, { useRef, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";

function App() {
  const shoe1 = useLoader(GLTFLoader, "./shoe.glb");

  const shoe2 = useLoader(GLTFLoader, "./shoe2.glb");

  return (
    <>
        <p>
          This is a documentation of my research into Neural Radience
          Fields/Photogrammetry. First, I used an iOS app called Luma to take a
          rough scan of one of my shoes with out any lighting set-up, and
          AirDropped the file to my laptop. The shoe on the left is the original
          scan, and the shoe on the right is after attempted to clean up the
          mesh in Blender. In some areas it worked really well, but odd faces UV
          maps would break and since the glb had around 85 materials randomly
          assigned to faces, I wasn't confident in a method to fix.The inside of
          the shoe was too inaccurate it didn't seem worth approaching at this
          stage.
        </p>
      <div
        style={{
          width: "100vw",
          height: "100vw",
          maxHeight: "500px",
          display: "flex",
        }}
      >
        <Suspense fallback={"Loading..."}>
          <Canvas>
            <OrbitControls enablePan={false} />
            <ambientLight />
            <primitive object={shoe1.scene} rotation={[0, Math.PI / 2, 0]} />
          </Canvas>
          <Canvas>
            <OrbitControls enablePan={false} />
            <ambientLight />
            <primitive object={shoe2.scene} rotation={[0, Math.PI / 2, 0]} />
          </Canvas>
        </Suspense>
      </div>
      <p>
        My next step is to research an approach that will produce a less messy
        and more accurate mesh.
      </p>
    </>
  );
}

export default App;
