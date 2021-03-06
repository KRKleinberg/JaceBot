import client from "../../index.js";

client.on("messageCreate", async (message) => {
	if (
		!message.author.bot &&
		message.guild &&
		message.content.toLowerCase().startsWith(process.env.PREFIX)
	) {
		const [input, ...args] = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);

		const prefixCommand =
			client.prefixCommands.get(input.toLowerCase()) ||
			client.prefixCommands.find((c) => c.aliases?.includes(input.toLowerCase()));

		if (prefixCommand) await prefixCommand.run(client, message, args);
	}
});
