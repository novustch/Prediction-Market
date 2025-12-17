import { Request, Response, NextFunction } from "express";

export const proposeValidator = (req: Request, res: Response, next: NextFunction) => {
    const { isChecked } = req.body;
    const propose = {...req.body.data};
    
    let errocount = 0;

    if (propose) {
        for (const key in propose) {
            if (propose[key] === "") {
                propose[key] = "empty";
                errocount++;
            } else {
                propose[key] = "";
            }
        }

        if (propose.feedName.length > 32) {
            propose.feedName = "too long";
            errocount++;
        }
    }
    if (errocount > 0) {
        res.status(401).send(propose);
        return;
    }

    if (!isChecked) {
        res.status(401).send({
            checkbox: "Please check the box to agree to the terms and conditions." 
        });
        return;
    } else {
        next();
    }
}