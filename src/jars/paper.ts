import type { BuildList, JarVersions, SpecificJar } from "@/types/IServerJars";
import { sortMinecraftVersionServerList } from "@/utils/generalUtils";

const name = "paper";

export async function getPaperJars(): Promise<SpecificJar> {
    const versions: string[] = await getVersions();
    const jarURLs: SpecificJar = {};

    // Sorting the versions
    let sorted_versions = await sortMinecraftVersionServerList(versions);
    
    // Generating jar URLs
    for (const version of sorted_versions) {
        const build = await getLatestBuild(version);
        jarURLs[version] = `https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}/downloads/${name}-${version}-${build}.jar`;
    }

    return jarURLs;
}

async function getLatestBuild(version: string): Promise<string> {
    let response = await fetch(`https://papermc.io/api/v2/projects/${name}/versions/${version}`);
    let data:BuildList = await response.json();

    return data.builds[data.builds.length - 1]
}

async function getVersions(): Promise<string[]> {
    let response = await fetch(`https://api.papermc.io/v2/projects/${name}`);
    let data: JarVersions = await response.json();
    
    return data.versions;
}