const filterObj = (obj : { [key: string]: any }, ...allowedFields : string[]) : { [key: string]: any } => {
  
  const newObj: { [key: string]: any } = {};
  
  Object.keys(obj).forEach((el : string) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el] ;
  });
  
  return newObj;
};

export default filterObj