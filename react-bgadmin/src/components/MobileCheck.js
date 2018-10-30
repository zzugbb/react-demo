
export default function MobileCheck(mobile) {
  
  let regx = /^1\d{10}$/;

  return regx.test(mobile) ? true: false;

}