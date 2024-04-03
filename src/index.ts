import { spinner } from '@clack/prompts';
import { renderTitle } from "@/utils/renderTitle";
import { runCli } from "@/cli/runCli";
import { isJavaInstalled } from "@/utils/shellStuff";
import { getServerJarsList } from "@/utils/serverJars";
import { logger } from "@/utils/logger";
import { v4 as uuidv4 } from 'uuid';
import { acceptEULA, createFolder, downloadFile, modifyServerProperties, runServerJAR } from '@/utils/fs_utils';
import { log } from 'console';

const main = async () => {
    const javaStatus = await isJavaInstalled();
    const serverJars = await getServerJarsList();
    const osCheck = process.platform;

    console.clear();


    if (osCheck !== "linux") {
        logger.error("Furnace is currently only supported on Linux. Please run this program on a Linux machine or WSL.");
        process.exit(1);
    }

    logger.info("OS Check Passed. Continuing...");

    if (!javaStatus) {
        logger.error("Java is not installed. Please install Java before running this program");
        process.exit(1);
    }

    logger.info("Java is installed. Continuing...");

    renderTitle();

    const configuration = await runCli({
        isJavaInstalled: javaStatus,
        serverJars: serverJars
    });

    const s = spinner();
    s.start();

    let jarURL = null;

    if (configuration.custom_jar_url === null) {
        // User selected a server platform 
        if (configuration.server_platform in serverJars) {
            jarURL = serverJars[configuration.server_platform as string][configuration.server_version as string];
        }
    } else {
        jarURL = configuration.custom_jar_url;
    }

    try {
        const uuid = uuidv4();
        const shortUUID = uuid.replace(/-/g, '').substring(0, 8);
        let serverName: string = configuration.serverName as string + "_" + shortUUID;

        s.message("Creating Server Folder");
        await createFolder(`${serverName}`, process.cwd());
        logger.info(`Server Folder Created: ${serverName}`);

        s.message("Downloading Server JAR");
        await downloadFile(jarURL as string, "server.jar", process.cwd() + `/${serverName}`);
        logger.info("Server JAR Downloaded");

        s.message("Starting Server for the first time to generate eula & server.properties file")
        await runServerJAR(process.cwd() + `/${serverName}/server.jar`, process.cwd() + `/${serverName}`);
        logger.info("Created initial server files. Stopping server...");

        s.message("Checking EULA Status");
        if (configuration.eula_accepted) {
            s.message("User accepted EULA in setup. Accepting EULA for the user.");
            await acceptEULA(process.cwd() + `/${serverName}`);
            logger.info("EULA File Modified. EULA Accepted.");
        } else {
            logger.warn("During Setup, you did not accept the EULA. You will need to manually accept the EULA in the server folder to start the server.");
        }

        s.message("Modify server.properties file");
        await modifyServerProperties(process.cwd() + `/${serverName}`, {
            "motd": configuration.server_properties.server_motd,
            "server-port": configuration.server_properties.server_port,
            "max-players": configuration.server_properties.server_max_players
        });
        logger.info("Modified server.properties file with user input.");

        s.message("Creating start.sh file");

        s.stop("Finished!");
    } catch (error) {
        logger.error(error);
        process.exit(1);
    } 
}

main().catch((err) => {
    logger.error(err);
    process.exit(1);
})