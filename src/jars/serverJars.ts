import type { IServerJars } from "@/types/IServerJars";
import { getPurpurJars } from "@/jars/purpur";

export const getServerJarsList = async (): Promise<IServerJars> => {
    let purpurJars = await getPurpurJars();
    
    const serverJars: IServerJars = {
        "Purpur": purpurJars,
        "Custom JAR": {}
    };

    return serverJars;
};