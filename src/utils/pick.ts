export const pick = (toPick: string[], obj: any) => {
  let pickedObj: any = {};
  console.log(toPick);
  Object.keys(obj).forEach((key) => {
    if (toPick.includes(key)) {
      console.log(key);
      console.log(obj[key]);
      pickedObj[key] = obj[key];
    }
  });
  console.log(pickedObj);
  return pickedObj;
};
