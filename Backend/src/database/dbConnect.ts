import mongoose from "mongoose";

const main = async () => {
    await mongoose.connect(process.env.Db_Connect_Key || "");
}

export default main