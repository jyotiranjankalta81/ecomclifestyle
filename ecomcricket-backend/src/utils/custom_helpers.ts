export default {
  file_changepath: (path: string) =>
    (path && path.replace(/\\/g, "/").split("public/").pop()) ||
    "defaults/images/NoImage.png",
};

// export default {
//   file_changepath: (path: string) => {
//     if (path) {
//       var patho = path.replace(/\\/g, "/");
//       var paths = patho.split("public/").pop();
//       return paths;
//     } else {
//       var pathos = "defaults/images/NoImage.png";

//       return pathos;
//     }
//   },
//   // (path  && path.replace(/\\/g, "/")) && path.split("public/").pop() ||
//   // "defaults/images/NoImage.png",
// };
