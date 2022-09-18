import React from 'react'

export default function Dot({ color }) {
  const styles = {
    backgroundColor: color,
    borderRadius: "10px",
    display: "inlineBlock",
    marginLeft: "10px",
    height: "10px",
    width: "10px"
  }

  return (
    <span style={styles}></span>
  )
}
