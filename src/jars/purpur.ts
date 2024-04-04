import type { JarVersions, SpecificJar } from "@/types/IServerJars";


export async function getPurpurJars(): Promise<SpecificJar> {
    let versions = await getPurpurVersions();
    let jarURLs: SpecificJar = {};

    versions.forEach(async (version) => {
        jarURLs[version] = `https://api.purpurmc.org/v2/purpur/${version}/latest/download`;
    });

    return jarURLs;
}

async function getPurpurVersions(): Promise<string[]> {
    let response = await fetch("https://api.purpurmc.org/v2/purpur");
    let data: JarVersions = await response.json();
    
    return data.versions;
}