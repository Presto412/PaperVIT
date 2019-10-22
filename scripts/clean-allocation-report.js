const path = require("path");
const csv = require("csvtojson");
const csvFilePath = path.join("../assets/winsem1920.csv");
const fs = require("fs");

const main = async () => {
  const jsonObj = await csv().fromFile(csvFilePath);

  let cleanedArray = jsonObj
    .map(obj => {
      return {
        courseCode: obj["COURSE CODE"],
        courseTitle: obj["COURSE TITLE"],
        courseSlot: obj["SLOT"],
        courseType: obj["COURSE TYPE"]
      };
    })
    .filter(c => c.courseSlot !== "NIL")
    .filter(c => c.courseType === "ETH" || c.courseType === "TH")
    .filter(
      (v, i, a) =>
        a.findIndex(t => JSON.stringify(t) === JSON.stringify(v)) === i
    );

  // cleanedArray = [...new Set(cleanedArray)];
  console.log(cleanedArray);
  fs.writeFileSync(
    "../assets/cleanedCourseList.json",
    JSON.stringify(cleanedArray)
  );
  console.log("Written courses to file.");
};

main();
