export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}


let runningId = 0

export function statImages(imageOutputArray, statList) {
  let stats = Object.keys(statList)

  for (let stat of stats) {
    if (statList[stat] > 0) {
      for (let i = 0; i < statList[stat]; i++) {

        let imgURL = `https://npc-image-bucket.s3.ap-southeast-2.amazonaws.com/itemImages/${stat}.png`
        imageOutputArray.push(<img key={runningId} src={imgURL} alt={stat + i + (Math.random() * 1000)} className="damage" />)
        runningId++
      }
    }
  }

  return imageOutputArray
}