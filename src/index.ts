import { spinner } from '@clack/prompts';
import { renderTitle } from "@/utils/renderTitle";
import { runCli } from "@/cli/runCli";
import { isJavaInstalled } from "@/utils/shellStuff";
import { getServerJarsList } from "@/jars/serverJars";
import { logger } from "@/utils/logger";
import { GITHUB_URL } from '@/consts/consts';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import { acceptEULA, createFile, createFolder, deleteFolder, downloadFile, modifyServerProperties, runServerJAR } from '@/utils/generalUtils';
import { generateStartScript } from '@/utils/startScriptGenerator';
import chalk from 'chalk';

const main = async () => {
    const s = spinner();
    await s.start("Starting Furnace...");

    // Get System Information
    const javaStatus = await isJavaInstalled();
    const serverJars = await getServerJarsList();
    const systemRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(0);
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

    await s.stop();

    renderTitle();    

    const configuration = await runCli({
        isJavaInstalled: javaStatus,
        serverJars,
        systemRam: parseInt(systemRam)
    });

    logger.debug(configuration);

    await s.start("Setting up server...");

    // Check if user provided a custom JAR URL
    let jarURL = null;
    
    if (!configuration.custom_jar_url) {
        // User selected a server platform 
        if (configuration.server_platform in serverJars) {
            jarURL = serverJars[configuration.server_platform as string][configuration.server_version as string];
        }
    } else {
        jarURL = configuration.custom_jar_url;
    }

    logger.debug(`Jar URL: ${jarURL as string}`);

    // Generate Server Name
    const uuid = uuidv4();
    const shortUUID = uuid.replace(/-/g, '').substring(0, 8);
    const jarName = "server.jar"
    const serverName = `${configuration.serverName as string}_${configuration.server_version ? configuration.server_version as string + "_" : ""}${shortUUID}`;

    try {
        // Create Server Folder
        s.message("Creating Server Folder");
        await createFolder(`${serverName}`, process.cwd());
        logger.info(`Server Folder Created: ${serverName}`);

        // Download Server JAR
        s.message("Downloading Server JAR");
        await downloadFile(jarURL as string, jarName, process.cwd() + `/${serverName}`);
        logger.info("Server JAR Downloaded");

        // Run Server JAR
        s.message("Starting Server for the first time to generate eula & server.properties file")
        await runServerJAR(process.cwd() + `/${serverName}/${jarName}`, process.cwd() + `/${serverName}`);
        logger.info("Created initial server files. Stopping server...");

        // Accept EULA 
        s.message("Checking EULA Status");
        if (configuration.eula_accepted) {
            s.message("User accepted EULA in setup. Accepting EULA for the user.");
            await acceptEULA(process.cwd() + `/${serverName}`);
            logger.info("EULA File Modified. EULA Accepted.");
        } else {
            logger.warn("During Setup, you did not accept the EULA. You will need to manually accept the EULA in the server folder to start the server.");
        }

        // Modify server.properties file
        s.message("Modify server.properties file");
        await modifyServerProperties(process.cwd() + `/${serverName}`, {
            "motd": configuration.server_properties.server_motd,
            "server-port": configuration.server_properties.server_port,
            "max-players": configuration.server_properties.server_max_players
        });
        logger.info("Modified server.properties file with user input.");

        // Create start.sh file
        s.message("Creating start.sh file");
        let startScript = generateStartScript(configuration, jarName);
        await createFile(process.cwd() + `/${serverName}/` + startScript.fileName, startScript.script);

        // Finish
        s.stop("Finished!");
        
        console.log(
            chalk.green(`Your server has been successfully set up!`) + "\n" +
            chalk.green(`You can now start your server by running the following command:`) + "\n\n" +
    
            chalk.yellow.bold("Linux: ") + "\n" +
            chalk.white(`cd <server_folder> && chmod +x start.sh && ./start.sh`) + "\n\n" +
    
            chalk.blueBright.bold("Windows: ") + "\n" +
            chalk.white(`cd <server_folder> && start.bat`) + "\n\n" +
    
            chalk.green(`Thank you for using Furnace! If you have any issues, please open an issue on the GitHub repository (${GITHUB_URL}).`)
        );
        

    } catch (error) {
        logger.error(`Looks like something went wrong. Here's the error: \n${error}\n`)
        logger.error(`You can try running the program again. If the issue persists, please open an issue on the GitHub repository (${GITHUB_URL}).`)
        logger.error(`Cleaning up..`);

        await deleteFolder(`${serverName}`);
        
        process.exit(1);
    } 
}

main().catch((err) => {
    logger.error(err);
    process.exit(1);
})
