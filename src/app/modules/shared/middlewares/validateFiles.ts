import { isEmpty, validate } from "class-validator"
import ErrorResponse from "../utils/errorResponse"
import { NextFunction, Request, Response } from "express"

const validateFiles = function(...args) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req["files"]) {
                throw new ErrorResponse(400, "Files required")
            }
            for (let i = 0; i < args.length; i++) {
                if (!req["files"][args[i]]) {
                    throw new ErrorResponse(400, `No ${args[i]} were uploaded`)
                }
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

export default validateFiles