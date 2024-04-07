import type { SpecificJar } from "@/types/IServerJars";
import { VanillaJarBaseURL } from "@/consts/consts";

export async function getVanillaJars(): Promise<SpecificJar> {
    let versions = await getAllVersions();
    let jarURLs: SpecificJar = {};

    for (const [key, value] of Object.entries(versions)) {
        jarURLs[key] = VanillaJarBaseURL + value;
    }

    return jarURLs;
}

async function getAllVersions() {
    let response = await fetch(VanillaJarBaseURL + "/index.json");
    let data = await response.json();

    return data;
}