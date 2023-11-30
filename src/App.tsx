import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "./Input";
import ParallaxText from "./ParallaxText";



function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotate, setRotate] = useState(0);
  return (
    <div>
      <div className="bg-[red] h-[100vh]">
        <motion.h1 className="text-white text-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >Hello world</motion.h1>
      <motion.div
          className="bg-[green] w-[200px] h-[200px]"
          animate={{ x, y, rotate }}
          transition={{ type: "spring" }}
        />
              <div className="inputs">
        <Input value={x} set={setX}>
          x
        </Input>
        <Input value={y} set={setY}>
          y
        </Input>
        <Input value={rotate} set={setRotate} min={-180} max={180}>
          rotate
        </Input>
      </div>
      </div>
      <div className="bg-[blue] h-[100vh]">
      <motion.h1 className="text-white text-5xl"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1  }}
          transition={{ type: "spring", duration: 1}}
          viewport={{margin: '-300px', once: true}}
        >hellloooooooooooooooo</motion.h1>
      </div>
      <section className="bg-[purple] h-[100vh]">
      <ParallaxText baseVelocity={-5}>Framer Motion</ParallaxText>
      <ParallaxText baseVelocity={5}>Scroll velocity</ParallaxText>
    </section>
    </div>
  );
}

export default App;
