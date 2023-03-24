import React, { useRef, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  const shoe1 = useLoader(GLTFLoader, "./shoe.glb");

  const shoe2 = useLoader(GLTFLoader, "./shoe2.glb");

  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <p>
          This is a documentation of my research into Neural Radience
          Fields/Photogrammetry. First, I used an iOS app called Luma, which
          advertises itself as a mobile device app to create and share NeRFs, to
          take a rough scan of one of my shoes with out any lighting set-up, and
          AirDropped the file to my laptop. The shoe on the left is the original
          scan, and the shoe on the right is after attempted to clean up the
          mesh in Blender. In some areas it worked really well, but odd face's
          UV maps would break and since the glb had around 85 materials randomly
          assigned to faces, and there was a lot of non-manifold and invalid
          geometry (edges/vertices shared by more than 2 faces/edges, or less
          than 2 creating a non-continuous surface) I wasn't confident in a
          method to fix. The inside of the shoe was too inaccurate it didn't
          seem worth approaching at this stage.
        </p>
        <div
          style={{
            width: "100%",
            height: "500px",
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
          My next step is to research alternative approaches that will produce a
          less messy and more accurate mesh. From what I understand, both
          Photogrammtery and NeRFs take a series of 2D images from different
          perspectives as inputs and mark common points in the scene to align
          the 2D images in 3D space to estimate structure, but NeRFs use a
          neural network which trains itself on the input images to reconstruct
          new camera angles, which can create much more visually accurate
          results. Due to this, it also handles inconsistent lighting and
          occlusion better than photogrammetry.
          <br />
          <br />
          Semantically, it appears the difference between the two is that 'NeRF'
          refers to the method of using a neural network to reproduce a 3D
          space, not the mesh created as a result of using it on a target
          object. I might be technically incorrect, but I understand that the
          process of creating a mesh from a NeRF would be classed as
          Photogrammetry using a lot more data points from the AI created
          intermediary images. Regardless, from here on I will refer to the goal
          mesh as my 'NeRF' if using that technology.
          <br />
          <br />
          As a side note, Luma has an interesting 'alpha' feature called{" "}
          <a
            href="https://captures.lumalabs.ai/imagine"
            target="_blank"
            rel="noreferrer"
          >
            Imagine
          </a>{" "}
          that attempts to create 3D models with textures from prompts only. I
          assume they're using the Dall-E API to generate multiple angles of the
          same prompted object and using their NeRF/Photogrammetry technology
          the create a model from that.
        </p>
        <br />
        <br />
        
      </div>
    </>
  );
}

export default App;
