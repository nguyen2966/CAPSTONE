import { responseError } from "./response.helper.js";
import jwt from "jsonwebtoken"
import { statusCodes } from "./status-code.helper.js";

export const appError = (err, req, res, next) => {
    //console.log("mid đặc biệt bắt lỗi", err);
    if(err instanceof jwt.JsonWebTokenError){
        err.code = statusCodes.UNAUTHORIZED; //401 thì FE sẽ logout user
    }
    //Phải check Lỗi JsonWebToken trước vì nó là class cha của TokenExpired. Nếu check JsonWebToken trước thì sau đó TokenExpred sẽ ghi đè mã lỗi -> FE ko xử lí dc

    if(err instanceof jwt.TokenExpiredError){
        err.code = statusCodes.FORBIDDEN; //403 thì FE gọi refresh-token
    }
    
    // console.log({
    //     cause: err?.cause,
    //     message: err?.message,
    //     name: err?.name,
    //     stack: err?.stack,
    //     code: err?.code
    // });
    const response = responseError(err?.message, err?.code, err?.stack);
    res.status(response.statusCode).json(response);
};
