export default {
	name: "teams",
	aliases: [],
	description: "Splits users in voice channel into two teams",
	options: [],
	run: async (client, message) => {
		const voiceMembers = message.member.voice.channel.members.filter((member) => !member.user.bot);
		const shuffled = voiceMembers
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
		const half = Math.ceil(shuffled.length / 2);
		const teamA = shuffled.slice(0, half);
		const teamB = shuffled.slice(half);
		const mapChoice = shuffled[Math.floor(Math.random() * shuffled.length)];

		message.channel.send({
			embeds: [
				{
					title: "Teams",
					fields: [
						{
							name: "Team A",
							value: `${teamA.join("\n")}`,
							inline: true,
						},
						{
							name: "Team B",
							value: `${teamB.join("\n")}`,
							inline: true,
						},
						{
							name: "Map Choice",
							value: `${mapChoice}`,
						},
					],
					color: 0x5864f1,
				},
			],
		});
	},
};
