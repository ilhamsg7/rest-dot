import 'dotenv/config';
import { type Response } from 'express';
import { ZodError } from 'zod';

export const wrapError = async (res: Response, process: Function) => {
    try {
        await process();
    } catch (err: any) {
        if(err instanceof ZodError) {
            res.status(400).json({
                message: "Invalid request",
                errors: err.formErrors.fieldErrors
            });
            res.end();
        } else {
            console.error(err);
            res.status(400).json({
                message: err?.message ?? "Something went wrong"
            });
            res.end();
        }
    }
        
}