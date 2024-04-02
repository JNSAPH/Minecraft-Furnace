import { renderTitle } from "@/utils/renderTitle";
import { runCli } from "@/cli/runCli";
import { getDockerVersion, getJavaVersion } from "@/utils/shellStuff";
import { getServerJarsList } from "@/utils/serverJars";

const main = async () => {
    const javaVersion = await getJavaVersion();
    const dockerVersion = await getDockerVersion();
    const serverJars = await getServerJarsList();

    // clear the console
    console.clear();

    renderTitle();

    const configuration = await runCli({
        javaVersion: javaVersion,
        dockerVersion: dockerVersion,
        serverJars: serverJars
    });





}

main().catch((err) => {
    
})
    