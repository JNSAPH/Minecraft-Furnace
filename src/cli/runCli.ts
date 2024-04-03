import * as p from "@clack/prompts";
import { Command } from "commander";
import { DEFAULT_APP_DESCRIPTION, DEFAULT_APP_NAME } from "@/consts/consts";
import { logger } from "@/utils/logger";
import { getLatestMinecraftServerVersion, validateMinecraftServerVersion } from "@/utils/validateMinecraftServerVersion";
import chalk from "chalk";
import type { cliOptions, serverProperties } from "@/types/cliOptions";

import type { IServerJars } from "@/types/IServerJars";

interface CliConfig {
    isJavaInstalled: boolean | null;
    serverJars: IServerJars;
}

export const runCli = async (config: CliConfig) => {
    // CLI Application
    const program = new Command()
        .name(DEFAULT_APP_NAME)
        .description(DEFAULT_APP_DESCRIPTION)
    
    // Object to store the CLI options
    const cliOptions: cliOptions = {
        serverName: "",
        serverJars: "",
        eula_accepted: false,
        server_platform: "", 
        custom_jar_url: null, // Only used if server_platform is Custom JAR
        server_version: null, // Can only be null if server_platform is Custom JAR
        server_properties: {
            server_motd: "",
            server_port: "",
            server_max_players: ""
        }
    }

    cliOptions.server_platform = await p.select({
        message: "What Minecraft Server Platform do you want to use?",
        options: [
            ...Object.keys(config.serverJars).map((server) => ({
                value: server,
                label: server
            })),
        ]
    });

    if (cliOptions.server_platform === "Custom JAR") {

        cliOptions.custom_jar_url = await p.text({
            message: "What is the URL of the custom JAR?",
            placeholder: "https://example.com/custom.jar",
            validate: (value: string) => {
                if (!value.startsWith("http")) {
                    return "URL must start with http or https"
                }
            }
        })
    } else {
        cliOptions.server_version = await p.text({
            message: "What Minecraft Server Version do you want to use?",
            placeholder: getLatestMinecraftServerVersion(cliOptions.server_platform, config.serverJars),
            validate: (value: string) => {
                return validateMinecraftServerVersion(value, cliOptions.server_platform, config.serverJars)
            }
        });
    }

    cliOptions.eula_accepted = await p.confirm({
        message: "Have you read and accepted the Minecraft EULA? (https://www.minecraft.net/en-us/eula)",
        initialValue: true
    });

    cliOptions.serverName = await p.text({
        message: "What is the name of the server?",
        placeholder: (cliOptions.server_platform as string).replaceAll(" ", "_") + "_SERVER_FURNACE",
        initialValue: (cliOptions.server_platform as string).replaceAll(" ", "_") + "_SERVER_FURNACE",
        validate: (value: string) => {
            if (value.length < 3) {
                return "Server name must be at least 3 characters long"
            }

            if (value.length > 30) {
                return "Server name must be less than 30 characters long"
            }

            if (value.match(/[^a-zA-Z0-9_]/)) {
                return "Server name must only contain letters, numbers, and underscores"
            }
        }
    });



    cliOptions.server_properties = await p.group({
        server_motd: () =>
            p.text({
                message: "What is the MOTD of the server? (The message displayed in the server list)",
                placeholder: "A Minecraft Server",
                initialValue: "A Minecraft Server",
                validate: (value: string) => {
                    if (!value) {
                        return "MOTD cannot be empty"
                    }
                }
            }),
        server_port: () =>
            p.text({
                message: "What is the port of the server?",
                placeholder: "25565",
                initialValue: "25565",
                validate: (value: string) => {
                    if (isNaN(parseInt(value)) || parseInt(value) < 1 || parseInt(value) > 65535){
                        return "Port must be a number between 1 and 65535"
                    }
                }
            }),
        server_max_players: () =>
            p.text({
                message: "What is the max players of the server?",
                placeholder: "20",
                initialValue: "20",
                validate: (value: string) => {
                    if (isNaN(parseInt(value)) || parseInt(value) < 1){
                        return "Max players must be a number greater than 0"
                    }
                }
            })
    },
        {
            onCancel: () => {
                logger.error("User cancelled the process")
                process.exit(0)
            }
        })

    console.log(
        chalk.gray("│") + "\n" +
        chalk.green("◇  ") + chalk.bold("Summary ") + "\n" + 
        chalk.gray("│  ") + chalk.white("Server Platform: ") + chalk.gray(cliOptions.server_platform) + "\n" +
        chalk.gray("│  ") + chalk.white("Custom JAR URL: ") + chalk.gray(cliOptions.custom_jar_url) + "\n" +
        chalk.gray("│  ") + chalk.white("Server Version: ") + chalk.gray(cliOptions.server_version) + "\n" +
        chalk.gray("│  ") + "\n" +
        chalk.gray("│  ") + chalk.white("Server MOTD: ") + chalk.gray(cliOptions.server_properties.server_motd) + "\n" +
        chalk.gray("│  ") + chalk.white("Server Port: ") + chalk.gray(cliOptions.server_properties.server_port) + "\n" +
        chalk.gray("│  ") + chalk.white("Max Players: ") + chalk.gray(cliOptions.server_properties.server_max_players) + "\n" +

        ""
    )

    // Prompt for confirmation
    const confirmation = await p.confirm({
        message: "Do you want to proceed with the above configuration?"
    })

    if (!confirmation) {
        logger.error("Okay! Please run the command again to start over. Exiting...")
        process.exit(0)
    }

    return cliOptions

    
}