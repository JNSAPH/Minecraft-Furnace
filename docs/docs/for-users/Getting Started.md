---
sidebar_position: 1
---

# Getting Started

To begin setting up your Minecraft server, follow these steps:

1. **Create a Folder:** Start by creating and entering a folder on your Linux Server using the following commands:
    ```bash
    mkdir minecraft_server
    cd minecraft_server
    ```

2. **Download and Run the Installer:** Paste the following command into the Terminal and wait for it to download all necessary files. The Furnace CLI (Command-Line Interface) will start automatically:
    ```bash
    curl -fsSL https://startfurnace.com/install | bash
    ```

3. **Configure Settings:** Go through the installer process:
    - Agree to Minecraft's End User License Agreement (EULA).
    - Customize settings such as:
      - Port: The communication channel for your server.
      - MOTD (Message of the Day): A brief message displayed to players when they connect.
      - Maximal Allowed Players: The maximum number of players allowed on the server.
      - Automatic Restart: Choose whether the server should restart automatically if it crashes.

4. **Finish Installation:** Once you've configured the settings, Furnace will display a summary of the settings you've chosen before downloading and setting up the Minecraft server itself.

5. **Start the Server:** After the Minecraft server setup is complete, Furnace will provide you with a command to copy and paste into the terminal to start the server.

Now that your server is up and running, you can connect to it by entering `<YOUR SERVER'S IP>:<YOUR SET PORT>` in the Minecraft client. If you want to run the server in the background, follow the next step.

# Running the Server in the Background using Screen

To run your Minecraft server in the background using Screen, follow these instructions:

1. **Install Screen:** If you haven't already installed Screen, you can do so using the package manager for your Linux distribution. For example, on Ubuntu or Debian, you can install Screen with the following command:
    ```bash
    sudo apt-get update
    sudo apt-get install screen
    ```

2. **Start a Screen Session:** Begin by starting a Screen session using the following command:
    ```bash
    screen -S minecraft_server
    ```

    This command initiates a new Screen session named "minecraft_server".

3. **Enter the Server Command:** Once the Screen session is started, enter the command provided by Furnace to start your Minecraft server.

4. **Using Screen:** Screen is a terminal multiplexer that allows you to run multiple terminal sessions within a single window. Here are some basic commands to navigate within Screen:
    - To detach from the Screen session and leave it running in the background, press `Ctrl + A` followed by `Ctrl + D`.
    - To reattach to a detached Screen session, use the command:
      ```bash
      screen -r minecraft_server
      ```
    - To terminate the Screen session completely, exit the Minecraft server and then type `exit`.

With these steps, you can effectively run your Minecraft server in the background using Screen, allowing you to manage other tasks while keeping your server active and accessible to players.
