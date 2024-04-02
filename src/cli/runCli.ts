import * as p from "@clack/prompts";
import { Command } from "commander";
import { DEFAULT_APP_DESCRIPTION, DEFAULT_APP_NAME } from "@/consts/consts";
import { logger } from "@/utils/logger";
import { getLatestMinecraftServerVersion, validateMinecraftServerVersion } from "@/utils/validateMinecraftServerVersion";
import chalk from "chalk";

import type { IServerJars } from "@/types/types";

interface CliConfig {
    javaVersion: string | null;
    dockerVersion: string | null;
    serverJars: IServerJars;
}

export const runCli = async (config: CliConfig) => {
    // CLI Application
    const program = new Command()
        .name(DEFAULT_APP_NAME)
        .description(DEFAULT_APP_DESCRIPTION)

    // Minecraft Specific Commands
    const server_platform = await p.select({
        message: "What Minecraft Server Platform do you want to use?",
        options: [
            ...Object.keys(config.serverJars).map((server) => ({
                value: server,
                label: server
            })),
        ]
    });

    const server_version = await p.text({
        message: "What Minecraft Server Version do you want to use?",
        placeholder: getLatestMinecraftServerVersion(server_platform, config.serverJars),
        validate: (value: string) => {
            return validateMinecraftServerVersion(value, server_platform, config.serverJars)
        }
    });


    const server_properties = await p.group({
        server_motd: () =>
            p.text({
                message: "What is the MOTD of the server? (The message displayed in the server list)",
                placeholder: "A Minecraft Server"
            }),
        server_port: () =>
            p.text({
                message: "What is the port of the server?",
                placeholder: "25565",
                initialValue: "25565"
            }),
        server_max_players: () =>
            p.text({
                message: "What is the max players of the server?",
                placeholder: "20",
                initialValue: "20"
            })
    },
        {
            onCancel: () => {
                logger.error("User cancelled the process")
                process.exit(0)
            }
        })

    // Summarize the information in a playful way
    // Log the following. The pipe should be dark gray, the text should be green and the variable should be white
    console.log(
        chalk.gray("│") + "\n" +
        chalk.green("◇  ") + chalk.bold("Summary ") + "\n" +
        chalk.gray("│  ") + chalk.white("Server Platform: ") + chalk.gray(server_platform) + "\n" +
        chalk.gray("│  ") + chalk.white("Server Version: ") + chalk.gray(server_version) + "\n" +
        chalk.gray("│  ") + chalk.white("Server MOTD: ") + chalk.gray(server_properties.server_motd) + "\n" +
        chalk.gray("│  ") + chalk.white("Server Port: ") + chalk.gray(server_properties.server_port) + "\n" +
        chalk.gray("│  ") + chalk.white("Server Max Players: ") + chalk.gray(server_properties.server_max_players)
    )

    // Prompt for confirmation
    const confirmation = await p.confirm({
        message: "Do you want to proceed with the above configuration?"
    })

    if (!confirmation) {
        logger.error("Okay! Please run the command again to start over. Exiting...")
        process.exit(0)
    }

    return {
        server_platform,
        server_version,
        server_properties
    }
}