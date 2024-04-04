import * as p from "@clack/prompts";
import { spinner } from '@clack/prompts';
import { logger } from "@/utils/logger";
import { getLatestMinecraftServerVersion, validateMinecraftServerVersion } from "@/utils/validateMinecraftServerVersion";
import chalk from "chalk";
import type { cliOptions, CliConfig } from "@/types/cliOptions";
import { loadServerJars } from "@/jars/serverJars";

export const runCli = async (config: CliConfig) => {
    const cliOptions: cliOptions = {} as cliOptions;

    cliOptions.server_platform = await p.select({
        message: "What Minecraft Server Platform do you want to use?",
        options: Object.keys(config.serverJars).map(server => ({ value: server, label: server }))
    }) as string;

    if (cliOptions.server_platform === "Custom JAR") {
        // Custom JAR
        cliOptions.custom_jar_url = await p.text({
            message: "What is the URL of the custom JAR?",
            placeholder: "https://example.com/custom.jar",
            validate: value => !value.startsWith("http") ? "URL must start with http or https" : undefined
        }) as string | null;
    } else {
        // Fetch server jar versions
        const s = spinner();
        await s.start("Fetching server jar versions...");

        let serverJarVersions = await loadServerJars(cliOptions.server_platform);
        if (!serverJarVersions) {
            logger.error("An error occurred while fetching the server jar versions. Exiting...");
            process.exit(1);
        }

        config.serverJars[cliOptions.server_platform] = serverJarVersions;

        await s.stop("Server jar versions fetched successfully!");

        cliOptions.server_version = await p.text({
            message: "What Minecraft Server Version do you want to use?",
            placeholder: getLatestMinecraftServerVersion(cliOptions.server_platform, config.serverJars),
            validate: value => validateMinecraftServerVersion(value, cliOptions.server_platform, config.serverJars)
        }) as string | null;
    }

    cliOptions.allocated_ram = await p.text({
        message: `How much RAM do you want to allocate to the server? (in GB, Max: ${config.systemRam}GB)`,
        placeholder: Math.floor((config.systemRam / 2)).toString(),
        initialValue: Math.floor((config.systemRam / 2)).toString(),
        validate: value => {
            if (isNaN(parseInt(value))) return "RAM must be a number";
            if (parseInt(value) < 1) return "RAM must be at least 1GB";
            if (parseInt(value) !== parseFloat(value)) return "RAM cannot be a fraction of a GB";
            if (parseInt(value) > config.systemRam) return `RAM must be less than or equal to ${config.systemRam}GB`;
        }
    }) as string;

    cliOptions.auto_restart = await p.confirm({
        message: "Do you want the server to automatically restart if it crashes?",
        initialValue: true
    }) as boolean;

    cliOptions.eula_accepted = await p.confirm({
        message: "Have you read and accepted the Minecraft EULA? (https://www.minecraft.net/en-us/eula)",
        initialValue: true
    }) as boolean;

    cliOptions.serverName = await p.text({
        message: "What is the name of the server?",
        placeholder: `${(cliOptions.server_platform).replaceAll(" ", "_")}_SERVER_FURNACE`,
        initialValue: `${(cliOptions.server_platform).replaceAll(" ", "_")}_SERVER_FURNACE`,
        validate: value => {
            if (value.length < 3) return "Server name must be at least 3 characters long";
            if (value.length > 30) return "Server name must be less than 30 characters long";
            if (value.match(/[^a-zA-Z0-9_]/)) return "Server name must only contain letters, numbers, and underscores";
        }
    }) as string;

    cliOptions.server_properties = await p.group({
        server_motd: () => p.text({
            message: "What is the MOTD of the server? (The message displayed in the server list)",
            placeholder: "A Minecraft Server",
            initialValue: "A Minecraft Server",
            validate: value => value ? undefined : "MOTD cannot be empty"
        }),
        server_port: () => p.text({
            message: "What is the port of the server?",
            placeholder: "25565",
            initialValue: "25565",
            validate: value => isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 65535 ? "Port must be a number between 1 and 65535" : undefined
        }),
        server_max_players: () => p.text({
            message: "What is the max players of the server?",
            placeholder: "20",
            initialValue: "20",
            validate: value => isNaN(parseInt(value)) || parseInt(value) < 1 ? "Max players must be a number greater than 0" : undefined
        })
    }, {
        onCancel: () => {
            logger.error("User cancelled the process");
            process.exit(0);
        }
    });

    console.log(generateSummary(cliOptions));

    const confirmation = await p.confirm({
        message: "Do you want to proceed with the above configuration?"
    })

    if (!confirmation) {
        logger.error("Okay! Please run the command again to start over. Exiting...")
        process.exit(0)
    }

    return cliOptions
}

function generateSummary(cliOptions: cliOptions) {
    let summary = chalk.gray("│") + "\n" +
        chalk.green("◇  ") + chalk.bold("Summary") + "\n" +
        chalk.gray("├  ") + chalk.white("Server Platform: ") + chalk.gray(cliOptions.server_platform) + "\n";

    // If custom JAR URL is provided, show it in the summary
    if (cliOptions.custom_jar_url) summary += chalk.gray("├  ") + chalk.white("Custom JAR URL: ") + chalk.gray(cliOptions.custom_jar_url) + "\n";
    if (cliOptions.server_version) summary += chalk.gray("├  ") + chalk.white("Server Version: ") + chalk.gray(cliOptions.server_version) + "\n";
    
    summary += chalk.gray("├  ") + chalk.white("Allocated RAM ") + chalk.gray(cliOptions.allocated_ram) + "\n";
    summary += chalk.gray("│") + "\n" +
        chalk.gray("├  ") + chalk.white("Server MOTD: ") + chalk.gray(cliOptions.server_properties.server_motd) + "\n" +
        chalk.gray("├  ") + chalk.white("Server Port: ") + chalk.gray(cliOptions.server_properties.server_port) + "\n" +
        chalk.gray("├  ") + chalk.white("Max Players: ") + chalk.gray(cliOptions.server_properties.server_max_players);

    return summary;
}