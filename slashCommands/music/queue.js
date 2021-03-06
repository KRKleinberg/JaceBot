export default {
	name: "queue",
	description: "Displays the queue",
	run: async (client, interaction) => {
		if (interaction.member.voice.channel) {
			const queue = client.player.getQueue(interaction.guildId);

			if (queue && queue.playing) {
				const currentTrack = queue.current;
				const tracks = queue.tracks
					.slice(0, 10)
					.map((m, i) => `${i + 1}. **${m.title}** ([link](${m.url}))`);

				interaction.followUp({
					embeds: [
						{
							title: "Server Queue",
							description: `${tracks.join("\n")}${
								queue.tracks.length > tracks.length
									? `\n...${
											queue.tracks.length - tracks.length === 1
												? `${queue.tracks.length - tracks.length} more track`
												: `${queue.tracks.length - tracks.length} more tracks`
									  }`
									: ""
							}`,
							color: 0x5864f1,
							fields: [
								{ name: "Now Playing", value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` },
							],
						},
					],
				});
			} else interaction.followUp({ content: "❌ | No music is playing!" });
		} else interaction.followUp({ content: "❌ | You're not in a voice channel!" });
	},
};
