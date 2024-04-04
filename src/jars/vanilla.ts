import type { SpecificJar } from "@/types/IServerJars";


export async function getVanillaJars(): Promise<SpecificJar> {
    return {
        "1.20.4": "https://piston-data.mojang.com/v1/objects/8dd1a28015f51b1803213892b50b7b4fc76e594d/server.jar"
    }
}