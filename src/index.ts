import "reflect-metadata"
import app from "./app"
import { AppDataSource } from "./db"

async function main() {
    try {
        await AppDataSource.initialize();
        console.log("database conectada")
        app.listen(3000);
        console.log("server escucha en puerto", 3000);

    } catch (error) {
        console.log(error);

    }

}

main();


