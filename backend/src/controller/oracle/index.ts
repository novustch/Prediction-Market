import { Request, Response } from "express"

export const registFeed = async (req: Request, res: Response) => {
    try {
        const { feedName, dataLink, task } = req.body.data;
        // const cluster = process.env.CLUSTER === "Mainnet" ? "Mainnet" : "Devnet";
        // console.log(feedName, dataLink, task);
        // await customizeFeed({ url: dataLink, task, name: feedName, cluster });
        res.status(200).json({ message: "Feed registration successful!" });
    } catch (error) {
        console.log("😒 error:", error);
        res.status(500).send("Something went wrong fee registration!");
    }
}