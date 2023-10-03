export const pick = (toPick: string[], obj: any) => {
  let pickedObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (toPick.includes(key)) {
      pickedObj[key] = obj[key];
    }
  });
  console.log(pickedObj);
  return pickedObj;
};




