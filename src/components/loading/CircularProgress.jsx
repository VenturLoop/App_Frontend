// import React from "react";
// import { View, Text } from "react-native";
// import { Svg, Circle } from "react-native-svg";

// const CircularProgress = ({ progress }) => {
//   const radius = 40; // Radius of the circle
//   const strokeWidth = 8; // Width of the stroke
//   const circumference = 2 * Math.PI * radius; // Circumference of the circle
//   const progressOffset = circumference - (progress / 100) * circumference; // Calculate offset

//   return (
//     <View className="flex items-center justify-center">
//       <Svg width={100} height={100}>
//         {/* Background Circle */}
//         <Circle
//           cx="50"
//           cy="50"
//           r={radius}
//           stroke="black"
//           strokeWidth={strokeWidth}
//           fill="none"
//         />
//         {/* Progress Circle */}
//         <Circle
//           cx="50"
//           cy="50"
//           r={radius}
//           stroke="#007BFF"
//           strokeWidth={strokeWidth}
//           fill="none"
//           strokeDasharray={circumference}
//           strokeDashoffset={progressOffset}
//           strokeLinecap="round"
//         />
//       </Svg>
//       {/* Progress Percentage */}
//       <View className="absolute">
//         <Text className="text-blue-500 font-bold text-lg">{`${progress}%`}</Text>
//       </View>
//     </View>
//   );
// };

// export default CircularProgress;
