import type { IServerJars } from "@/types/IServerJars";
import { getPurpurJars } from "@/jars/purpur";
import { getPaperJars } from "@/jars/paper";
import { getSpigotJars } from "@/jars/spigot";

export const getServerJarsList = async (): Promise<IServerJars> => {
    const serverJars: IServerJars = {
        "Purpur": await getPurpurJars(),
        "Paper": await getPaperJars(),
        "Spigot": await getSpigotJars(),
        "Custom JAR": {}
    };

    return serverJars;
};