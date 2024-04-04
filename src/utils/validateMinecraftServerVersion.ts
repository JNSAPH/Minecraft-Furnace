import type { IServerJars } from "@/types/IServerJars"

export const validateMinecraftServerVersion = (value: string, server_platform: string | any, serverJars: IServerJars) => {
    
    if (serverJars[server_platform] && Object.keys(serverJars[server_platform]).includes(value)) {
       
    } else {
        return `Invalid version. Please select from the following: ${Object.keys(serverJars[server_platform]).join(", ")}`;
    }
}

export const getLatestMinecraftServerVersion = (server_platform: string | any, serverJars: IServerJars) => {
    let numberOfVersions = Object.keys(serverJars[server_platform]).length;
    let versions = Object.keys(serverJars[server_platform]);
    
    return versions[numberOfVersions - 1];
}