export default {
	name: "teams",
	aliases: [],
	description: "Splits users in voice channel into two teams",
	options: [],
	run: async (client, message) => {
		const voiceMembers = message.member.voice.channel.members;
		const half = Math.ceil(voiceMembers.lenth / 2);
		const teams = voiceMembers
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
		const teamA = `${teams.slice(0, half).join("\n")}`;
		const teamB = `${teams.slice(half).join("\n")}`;
		const mapChoice = `${teams[Math.ceil(Math.random() * teams.length)]}`;

		message.channel.send({
	embeds: [
		{
			title: "Teams",
			fields: [
				{
					name: "Team A",
					value: `1 ${teamA}`,
					inline: true,
				},
				{
					name: "Team B",
					value: `2 ${teamB}`,
					inline: true,
				},
				{
					name: "Map Choice",
					value: `3 ${mapChoice}`,
				},
				{
					name: "Map Choice",
					value: `3 ${teams}`,
				},
			],
			color: 0x5864f1,
		},
	],
});
	},
};
