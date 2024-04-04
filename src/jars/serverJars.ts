import type { IServerJars, SpecificJar } from "@/types/IServerJars";
import { getPurpurJars } from "@/jars/purpur";
import { getPaperJars } from "@/jars/paper";
import { getVanillaJars } from "@/jars/vanilla";

export const getServerJarsList = async (): Promise<IServerJars> => {
    const serverJars: IServerJars = {
        "Purpur": {},
        "Paper": {},
        // "Spigot": {}, // find a way to get prebuilt spigot jars without getting sued
        "Vanilla": {},
        "Custom JAR": {}
    };

    return serverJars;
};

export const loadServerJars = async (server_platform: string): Promise<SpecificJar | undefined> => {
    switch (server_platform) {
        case "Purpur":
            return await getPurpurJars();
        case "Paper":
            return await getPaperJars();
        // case "Spigot":
        //     return await getSpigotJars();
        case "Vanilla":
            return await getVanillaJars();
        default:
            return undefined;
    }
};
