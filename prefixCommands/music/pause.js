export default {
	name: "pause",
	aliases: ["ps"],
	description: "Pauses the current song",
	options: [],
	run: async (client, message) => {
		if (message.member.voice.channel) {
			const queue = client.player.getQueue(message.guildId);

			if (queue && queue.playing) {
				const success = queue.setPaused(true);

				message.channel.send({ content: success ? "⏸ | Paused!" : "❌ | Something went wrong!" });
			} else message.channel.send({ content: "❌ | No music is playing!" });
		} else message.channel.send({ content: "❌ | You're not in a voice channel!" });
	},
};
