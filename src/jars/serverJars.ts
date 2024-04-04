import type { IServerJars, SpecificJar } from "@/types/IServerJars";
import { getPurpurJars } from "@/jars/purpur";
import { getPaperJars } from "@/jars/paper";
import { getSpigotJars } from "@/jars/spigot";

export const getServerJarsList = async (): Promise<IServerJars> => {
    const serverJars: IServerJars = {
        "Purpur": {},
        "Paper": {},
        "Spigot": {},
        "Custom JAR": {}
    };

    return serverJars;
};

export const loadServerJars = async (server_platform: string): Promise<SpecificJar | undefined> => {
    if (server_platform === "Purpur") {
        return await getPurpurJars();
    } else if (server_platform === "Paper") {
        return await getPaperJars();
    } else if (server_platform === "Spigot") {
        return await getSpigotJars();
    }

    return undefined;
};
