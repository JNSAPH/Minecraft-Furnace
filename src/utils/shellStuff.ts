import { $ } from "bun";

export const isJavaInstalled = async () => {
    try {
        const javaVersion = await $`java -version`;

        return true
    } catch (error) {
        return false;
    }
}