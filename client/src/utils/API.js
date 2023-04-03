export const VerifiRecap = (token) => {
  // console.log("token final!!!!----------",token)
//  console.log(process.env.REACT_APP_SECRET_KEY,"secret!!!!!!!!!")
  return fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SECRET_KEY}&response=${token}`);
};
