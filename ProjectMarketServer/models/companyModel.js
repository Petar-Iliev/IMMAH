const Company = require('../db_schemas/company');
const Post = require('../db_schemas/post');

const create_company = async ({companyName,companyLink}) =>{

    let company = await find_company_by_name(companyName);
    if(company === null){
     company = await new Company({name:companyName,link:companyLink}).save();
    }

    return company;

}

 const find_company_by_id = async (req,res)=>{
    
    let {id} = req.query;

    const company = await Company.findById(id).populate({
        path:'posts',
        populate:{
            path:'author'
        }
    });

    
    res.json(company);
 }

 const find_company_by_name = async (name) =>{
  return await Company.findOne({name});
}

const find_companies = async (req,res)=>{
    
    const companies = await Company.find().populate('posts');

    res.send(JSON.stringify(companies));
}


module.exports={
    create_company,
    find_companies,
    find_company_by_id
}