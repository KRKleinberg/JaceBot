export default {
	name: "skip",
	aliases: ["fs"],
	description: "Skips the current song",
	options: [],
	run: async (client, message) => {
		if (message.member.voice.channel) {
			const queue = client.player.getQueue(message.guildId);

			if (queue && queue.playing) {
				const currentTrack = queue.current;
				const success = queue.skip();

				message.channel.send({
					content: success ? `⏭️ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!",
				});
			} else message.channel.send({ content: "❌ | No music is playing!" });
		} else message.channel.send({ content: "❌ | You're not in a voice channel!" });
	},
};
