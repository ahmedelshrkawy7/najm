/* eslint-disable react/prop-types */

// const CustomLegend = ({ payload }) => {
//   if (!payload || payload.length === 0) return null;

//   return (
//     <div style={styles.legendContainer}>
//       <div className="mr-3 w-fit text-[#33835C] text-xl font-bold mb-4 justify-between relative after:absolute after:content-[''] after:w-full after:h-1 after:left-0 after:from-green-700 after:to-green-100 after:bg-gradient-to-l after:top-full after:rounded-md after:mt-2">
//         <h2>تصنيف البلاغات</h2>
//       </div>
//       {payload.map((entry) => (
//         <div key={entry.value} style={styles.legendItem}>
//           <span
//             style={{
//               ...styles.colorBox,
//               backgroundColor: entry.color,
//             }}
//           ></span>
//           <span style={styles.legendText}>{entry.value}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// const styles = {
//   legendContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     justifyContent: "center", // Space between legend container and its content
//     marginLeft: "20px",
//     position: "absolute",
//     top: "0",
//     right: "0",
//     height: "320px",
//     width: "25%",
//     gap: "10px",
//     marginTop: "20px",
//     paddingRight: "10px", // Width of legend container

//     // Space between chart and legend
//   },
//   legendItem: {
//     display: "flex",
//     alignItems: "center",
//     marginTop: "15px",
//     gap: "10px", // Space between legend items
//   },
//   colorBox: {
//     width: "16px",
//     height: "16px",
//     borderRadius: "50%",
//     marginRight: "8px", // Space between color box and text
//   },
//   legendText: {
//     fontSize: "14px",
//   },
// };

// export default CustomLegend;

/* eslint-disable react/prop-types */

const CustomLegend = ({ payload }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="hidden md:flex flex-col items-start justify-center ml-2 absolute top-3 right-0 h-[320px] md:w-1/4 gap-2 p-2 box-border ">
      <div className="mr-3 text-[#33835C] text-xl font-bold my-4 relative after:absolute after:content-[''] after:w-full after:h-1 after:left-0 after:bg-gradient-to-l after:from-green-700 after:to-green-100 after:top-full after:rounded-md after:mt-2">
        <h2>تصنيف البلاغات</h2>
      </div>
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center mb-4 gap-2">
          <span
            className="w-4 h-4 rounded-full mr-2 mt-4"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-sm mt-4">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
