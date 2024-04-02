import type { IServerJars } from "@/types/types";

export const getServerJarsList = async (): Promise<IServerJars> => {
    const serverJars: IServerJars = {
        "Spigot": {
            "1.20.4": "https://cdn.getbukkit.org/spigot/spigot-1.20.4.jar",
            "1.20.3": "https://cdn.getbukkit.org/spigot/spigot-1.20.3.jar",
            "1.20.2": "https://cdn.getbukkit.org/spigot/spigot-1.20.2.jar",
        },
        "Paper": {
            "1.20.4": "https://papermc.io/api/v2/projects/paper/versions/1.20.4/builds/424/downloads/paper-1.20.4.jar",
            "1.20.3": "https://papermc.io/api/v2/projects/paper/versions/1.20.3/builds/420/downloads/paper-1.20.3.jar",
            "1.20.2": "https://papermc.io/api/v2/projects/paper/versions/1.20.2/builds/415/downloads/paper-1.20.2.jar",
        },
        "Bukkit": {
            "1.20.4": "https://cdn.getbukkit.org/craftbukkit/craftbukkit-1.20.4.jar",
            "1.20.3": "https://cdn.getbukkit.org/craftbukkit/craftbukkit-1.20.3.jar",
            "1.20.2": "https://cdn.getbukkit.org/craftbukkit/craftbukkit-1.20.2.jar",
        },
        "Vanilla": {
            "1.20.0": "https://launcher.mojang.com/v1/objects/1.20.4/server.jar",
        },
    };

    return serverJars;
};