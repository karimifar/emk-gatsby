// P5Sketch.js

import React, { useEffect } from "react"
import p5 from "p5"

const P5Sketch = () => {
  useEffect(() => {
    let sandboxDiv

    const sketch = p => {
      let angle = 0

      p.setup = () => {
        // Get the width and height of the sandbox div
        sandboxDiv = document.getElementById("sandbox")

        // Dynamically set canvas size based on the sandbox dimensions
        const canvas = p.createCanvas(
          sandboxDiv.offsetWidth,
          sandboxDiv.offsetHeight
        )
        canvas.parent("sandbox")
        p.noStroke()
        p.fill(255, 150)
      }

      p.draw = () => {
        p.background(0)

        const numShapes = 6
        const radius = 100

        for (let i = 0; i < numShapes; i++) {
          const x = p.cos(angle + (p.TWO_PI / numShapes) * i) * radius
          const y = p.sin(angle + (p.TWO_PI / numShapes) * i) * radius

          p.ellipse(p.width / 2 + x, p.height / 2 + y, 40, 40)
        }

        angle += 0.02
      }

      p.windowResized = () => {
        // Resize the canvas when the window is resized
        p.resizeCanvas(sandboxDiv.offsetWidth, sandboxDiv.offsetHeight)
      }
    }

    new p5(sketch)

    // Clean up on component unmount
    return () => {
      p5.remove()
    }
  }, [])

  return <div id="p5sketch"></div>
}

export default P5Sketch
