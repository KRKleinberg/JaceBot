export default {
	name: "teams",
	aliases: [],
	description: "Splits users in voice channel into two teams",
	options: [],
	run: async (client, message) => {
		let voiceMembers = [];
		voiceMembers = await message.member.voice.channel.members;
		const half = Math.floor(voiceMembers.length()/2);
		const shuffled = await voiceMembers
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
		const teamA = await shuffled.slice(0, half);
		const teamB = await shuffled.slice(-half);
		const mapChoice = await shuffled[Math.floor(Math.random() * shuffled.length)];

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
							value: `3 ${shuffled} ${shuffled.length}`,
						},
					],
					color: 0x5864f1,
				},
			],
		});
	},
};
