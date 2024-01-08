import React, { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    document.querySelectorAll(".work-link").forEach(element => {
      element.addEventListener("mouseenter", () => {
        const targetId = element.getAttribute("data-img")
        const target = document.getElementById(targetId)
        document.getElementById(targetId).className("active")
        // target.className("active")
        console.log("Mouse enter:", target)
      })
      element.addEventListener("mouseout", () =>
        console.log("Mouse out:", element.getAttribute("data-img"))
      )
    })
  }, [])
}

export default Home
