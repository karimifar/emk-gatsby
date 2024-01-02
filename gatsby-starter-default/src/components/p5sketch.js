import React, { useEffect, useRef } from "react"
import p5 from "p5"

const P5Sketch = () => {
  const sketchRef = useRef()

  useEffect(() => {
    const sketch = p => {
      let particles = []

      class Particle {
        constructor() {
          this.position = p.createVector(p.random(p.width), p.random(p.height))
          this.velocity = p.createVector(p.random(-10, 10), p.random(-10, 10))
          this.size = p.random(5, 15)
          this.color = p.color(p.random(255), p.random(255), p.random(255), 150)
        }

        update() {
          this.position.add(this.velocity)

          if (this.position.x < 0 || this.position.x > p.width) {
            this.velocity.x *= -1
          }

          if (this.position.y < 0 || this.position.y > p.height) {
            this.velocity.y *= -1
          }
        }

        display() {
          p.noStroke()
          p.fill(this.color)
          p.ellipse(this.position.x, this.position.y, this.size, this.size)
        }
      }

      p.setup = () => {
        const parentElement = sketchRef.current.parentElement
        const canvasWidth = parentElement.offsetWidth
        const canvasHeight = parentElement.offsetHeight
        p.createCanvas(canvasWidth, canvasHeight).parent(sketchRef.current)

        for (let i = 0; i < 100; i++) {
          particles.push(new Particle())
        }
      }

      p.draw = () => {
        p.background(255)

        for (let i = 0; i < particles.length; i++) {
          particles[i].update()
          particles[i].display()
        }
      }

      p.mouseMoved = () => {
        const force = p.createVector(
          p.mouseX - p.width / 2,
          p.mouseY - p.height / 2
        )
        force.normalize()

        for (let i = 0; i < particles.length; i++) {
          const distance = p.dist(
            p.mouseX,
            p.mouseY,
            particles[i].position.x,
            particles[i].position.y
          )
          const strengthMapped = p.map(distance, 0, p.width, 1, 1)

          const direction = force.copy()
          direction.mult(strengthMapped)

          particles[i].velocity = direction
        }
      }
    }

    new p5(sketch, sketchRef.current)
  }, [])

  return <div ref={sketchRef}></div>
}

export default P5Sketch
