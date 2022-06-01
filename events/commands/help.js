import pagination from "discord.js-pagination";

export const name = "help";
export const aliases = [];
export const description = "Displays a list of all commands";
export const options = [];
export async function run(client, message) {
	const MAX_FIELDS = 25;
	const fields = client.commands.map((command) => ({
		name: command.aliases.length
			? `${command.name} (${command.aliases.join(", ")})`
			: `${command.name}`,
		value: command.options.length
			? `${command.description}\nInput: ${command.options.join(", ")}`
			: `${command.description}`,
	}));

	if (fields.length <= MAX_FIELDS)
		return message.channel.send({
			embeds: [
				{
					title: "Commands",
					description: `Prefix: **${process.env.PREFIX}**`,
					fields: fields,
					color: 0x5864f1,
				},
			],
		});

	const chunks = chunkify(fields, MAX_FIELDS);
	const pages = [];

	chunks.forEach(() => {
		pages.push({
			embeds: [
				{
					title: "Commands",
					description: `Prefix: **${process.env.PREFIX}**`,
					fields: fields,
					color: 0x5864f1,
				},
			],
		});
	});

	pagination("some message", pages);
}

function chunkify(arr, len) {
	let chunks = [];
	let i = 0;
	let n = arr.length;

	while (i < n) {
		chunks.push(arr.slice(i, (i += len)));
	}

	return chunks;
}
