export default {
	name: "clear",
	description: "Clears the queue",
	run: async (client, interaction) => {
		if (interaction.member.voice.channel) {
			const queue = client.player.getQueue(interaction.guildId);

			if (queue && queue.playing) {
				queue.clear();

				interaction.followUp({ content: "๐งผ | Queue cleared." });
			} else interaction.followUp({ content: "โ | No music is playing!" });
		} else interaction.followUp({ content: "โ | You're not in a voice channel!" });
	},
};
