export default {
	name: "remove",
	description: "Removes a specific track",
	options: [
		{
			name: "track",
			description: "The number of the track in the queue to remove",
			type: "NUMBER",
			required: true,
		},
	],
	run: async (client, interaction) => {
		if (interaction.member.voice.channel) {
			const queue = client.player.getQueue(interaction.guildId);

			if (queue && queue.playing) {
				const trackIndex = interaction.options.getNumber("track") - 1;
				const trackName = queue.tracks[trackIndex];
				const success = queue.remove(trackIndex);

				interaction.reply({
					content: success
						? `🗑️ | Removed **${trackName}**.`
						: "❌ | Please enter a valid track number in the queue",
				});
			} else interaction.reply({ content: "❌ | No music is playing!" });
		} else interaction.reply({ content: "❌ | You're not in a voice channel!" });
	},
};
