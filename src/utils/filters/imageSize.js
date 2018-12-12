// 图片尺寸对应标识
let imgMap = new Map();
imgMap.set('origin', '00000');
imgMap.set('750x750', '00001');
imgMap.set('165x165', '00002');
imgMap.set('690x490', '00003');
imgMap.set('80x80', '00004');
imgMap.set('240x240', '00005');
imgMap.set('750x500', '00006');
imgMap.set('330x330', '00007');
imgMap.set('56x56', '00008');
imgMap.set('184x184', '00009');
imgMap.set('200x200', '00010');
imgMap.set('160x160', '00011');
imgMap.set('750x280', '00012');
imgMap.set('750x422', '00013');
imgMap.set('690x388', '00014');
imgMap.set('455x455', '00015');
imgMap.set('220x220', '00016');
imgMap.set('690x690', '00017');
imgMap.set('750x425', '00018');
imgMap.set('690x0', '10001');
imgMap.set('minSide', '1101');

imgMap.set('minSide690', '10004');
imgMap.set('minSide200', '10005');
imgMap.set('minSide400', '10006');

let imageSize = (url, size) => {
  if(!url) return;
  let pattern = /(app|m|pc)-(\d{4,5})/g;
  return url.replace(pattern, `m-${imgMap.get(size)}`);
};

export default imageSize;
