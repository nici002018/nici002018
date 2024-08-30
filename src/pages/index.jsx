import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Stars } from "@react-three/drei";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import * as THREE from "three";
import { motion } from "framer-motion";
import "../styles/globals.css";

export default function Home() {
  return (
    <div className="background">
      <Canvas className="background">
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SpinningOutlineBox position={[0, 0, 0]} />
      </Canvas>
      <Content />
    </div>
  );
}

function Content() {
  return (
    <div className="container">
      <Head>
        <title>Niceas&rsquo;s Portfolio</title>
        <meta
          name="description"
          content="Niceas's portfolio website showcasing his projects."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="profile-container"
      >
        <Image
          src="/profile.svg"
          alt="Profile Picture"
          className="profile-picture"
          priority
          width={150}
          height={150}
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        About Me
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Hi, I&apos;m Niclas, also known as Niceas. As a passionate hobby
        developer, I work on a variety of projects and constantly explore new
        technologies and frameworks. My interests range from creating
        interactive websites to developing bots, scripts, plugins, and more. I
        enjoy finding creative solutions and tackling new IT challenges.
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Projects
      </motion.h2>
      <motion.ul
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {projects.map((project, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Link href={project.href}>{project.title}</Link>
            <p>{project.description}</p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

const projects = [
  {
    href: "https://github.com/nici002018/Fivem-Autoupdater",
    title: "Fivem Autoupdater",
    description:
      "This Node.js script provides an automatic updater for a FiveM FXServer. It checks for the latest release of FiveM, downloads the update if a new version is available, and updates the server accordingly..",
  },
  {
    href: "https://github.com/nici002018/Github-Commits-Faker",
    title: "Github-Commits-Faker",
    description:
      "This project provides a script for generating fake GitHub commits for testing purposes. Please note that using this code is at your own risk.",
  },
  {
    href: "https://github.com/nici002018/nici002018/tree/Website",
    title: "About me Website",
    description: "My current portfolio website created with Next.js and React.",
  },
  {
    href: "https://github.com/nici002018/about-me-website",
    title: "About me Website (Old)",
    description: "My old portfolio website created with node.js and express.",
  },
];

function SpinningOutlineBox({ position }) {
  const mesh = useRef();
  const [color, setColor] = useState(0);

  useFrame((state, delta) => {
    mesh.current.rotation.x += 0.001;
    mesh.current.rotation.y += 0.001;

    const hue = (color + delta * 0.1) % 1;
    setColor(hue);
    const rainbowColor = new THREE.Color(`hsl(${hue * 360}, 100%, 50%)`);
    mesh.current.children[0].material.color = rainbowColor;
  });

  return (
    <mesh position={position} ref={mesh}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial
        attach="material"
        color="black"
        transparent
        opacity={0}
        depthWrite={false}
      />
      <Edges scale={1.05} renderOrder={1000}>
        <lineBasicMaterial attach="material" color={new THREE.Color("white")} />
      </Edges>
    </mesh>
  );
}
