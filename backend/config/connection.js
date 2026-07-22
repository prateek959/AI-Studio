import dns from "dns";

// 👇 ye 2 line sabse upar honi chahiye
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";

const db = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL_PRO);
        console.log("DB Connect Successfully");
    } catch (error) {
        console.log("DB Connection Failed",error)
    }
}

export default db;