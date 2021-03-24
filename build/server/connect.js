import mongoose from "mongoose";
export default (url) => {
    const connect = () => {
        mongoose
            .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
            .then(() => {
            return console.log(`Successfully connected to ${url}`);
        })
            .catch(error => {
            console.log("Error connecting to database: ", error);
            return process.exit(1);
        });
    };
    connect();
    mongoose.connection.on("disconnected", connect);
};
