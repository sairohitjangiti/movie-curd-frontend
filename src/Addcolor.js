import React, { useState } from "react";
import Button from "@mui/material/Button";

// function Colorbox() {
//   const [color, setcolor] = useState("red");
//   const styles = { backgroundColor: color };
//   return (
//     <div>
//       <input
//         value={color}
//         onChange={(event) => setcolor(event.target.value)}
//         style={styles}
//         placeholder="Enter the color"
//       ></input>
//     </div>
//   );
// }
export function Addcolor() {
  const [color, setcolor] = useState("red");
  const styles = { backgroundColor: color };
  const [colors, setcolors] = useState(["teal", "orange", "lavender"]);
  return (
    <div className="addcolor">
      <input
        value={color}
        onChange={(event) => setcolor(event.target.value)}
        style={styles}
        placeholder="Enter the color"
      />
      <Button onClick={() => setcolors([...colors, color])}>Add color</Button>
      {colors.map((clr, index) => (
        <Colorbox key={index} color={clr} />
      ))}
    </div>
  );
}
function Colorbox({ color }) {
  const styles = {
    backgroundColor: color,
    height: "25px",
    width: "250px",
  };
  return <div style={styles}></div>;
}

// import React, { useState } from "react";
// import Button from "@mui/material/Button";

// // function Colorbox() {
// //   const [color, setcolor] = useState("red");
// //   const styles = { backgroundColor: color };
// //   return (
// //     <div>
// //       <input
// //         value={color}
// //         onChange={(event) => setcolor(event.target.value)}
// //         style={styles}
// //         placeholder="Enter the color"
// //       ></input>
// //     </div>
// //   );
// // }
// export function Addcolor() {
//   const [color, setcolor] = useState("red");
//   const styles = { backgroundColor: color };
//   const [colors, setcolors] = useState(["teal", "orange", "lavender"]);
//   return (
//     <div className="addcolor">
//       <input
//         value={color}
//         onChange={(event) => setcolor(event.target.value)}
//         style={styles}
//         placeholder="Enter the color"
//       />
//       <Button onClick={() => setcolors([...colors, color])}>Add color</Button>
//       {colors.map((clr, index) => (
//         <Colorbox key={index} color={clr} />
//       ))}
//     </div>
//   );
// }
// function Colorbox({ color }) {
//   const styles = {
//     backgroundColor: color,
//     height: "25px",
//     width: "250px",
//   };
//   return <div style={styles}></div>;
// }
