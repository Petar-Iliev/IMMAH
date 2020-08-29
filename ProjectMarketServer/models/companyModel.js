const Company = require('../db_schemas/company');


const create_company = async ({companyName,companyLink}) =>{

    let company = await find_company_by_name(companyName);
    if(company === null){
         await new Company({name:companyName,link:companyLink}).save(function(err,suc){
             if(err){
                 console.log(err);
             }
         });
    }

}

 const find_company_by_name = async (name) =>{
  return await Company.findOne({name});
}


module.exports={
    create_company
}