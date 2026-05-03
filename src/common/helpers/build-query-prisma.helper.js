export const queryHelperPrisma = (req)=>{
  // index = (page-1)*pageSize
    //FE gửi pageSize qua QUERY
    let { page, pageSize, filters } = req.query;
    // page = Number(page);
    // pageSize = Number(pageSize);

    //nếu FE gửi sai kiểu dữ liệu (chữ)-> NaN
    const pageDefault = 1, pageSizeDefault = 3;

    page = Number(page) || pageDefault;
    pageSize = Number(pageSize)|| pageSizeDefault;

    try{
      filters = JSON.parse(filters) || filters;
    } catch {
      filters = {};
    }
    
    console.log({page,pageSize,filters});
    //nếu số âm
    if(page < 1) page = pageDefault;
    if (pageSize < 1) pageSize =pageDefault;
    
    const index = (page-1)*pageSize;
    console.log(index);

    //Xử lí filter
    //Nếu có key string thì bọc bằng object có key contains
    Object.entries(filters).forEach(([key,value])=>{
        if(typeof value === "string"){
          filters[key] = {
            contains: value
          }
        }
      });
    
    const where = {
      ...filters,
      isDeleted: false
    };

    return {page,
           pageSize,
           where,
           index}
}