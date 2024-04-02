import { $ } from "bun";

export const getJavaVersion = async () => {
    try {
        const javaVersion = await $`java -version`;
        
        // return as string
        return javaVersion.stdout.toString();
    } catch (error) {
        return null;
    }
}

export const getDockerVersion = async () => {
    try {
        const dockerVersion = await $`docker -v`;
        
        // return as string
        return dockerVersion.stdout.toString();
    } catch (error) {
        return null;
    }
}