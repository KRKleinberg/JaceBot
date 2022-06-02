import { QueryType } from "discord-player";

export default {
	name: "play",
	description: "Plays a song",
	options: [
		{
			name: "song",
			type: "STRING",
			description: "The song you want to play",
			required: true,
		},
	],
	run: async (client, interaction) => {
		const query = interaction.options.get("song").value;
		const searchResult = await client.player
			.search(query, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			})
            .catch(() => { });
        
		if (!searchResult || !searchResult.tracks.length)
			return interaction.followUp({ content: "No results were found!" });

		const queue = await client.player.createQueue(interaction.guild, {
			ytdlOptions: {
				requestOptions: {
					headers: {
						cookie: process.env.COOKIE,
						"x-youtube-identity-token": process.env.ID_TOKEN,
					},
				},
				quality: "highest",
				filter: "audioonly",
				// eslint-disable-next-line no-bitwise
				highWaterMark: 1 << 25,
				dlChunkSize: 0,
			},
			leaveOnEnd: false,
			leaveOnStop: true,
			leaveOnEmpty: false,
			leaveOnEmptyCooldown: 5000,
			autoSelfDeaf: true,
			metadata: interaction.channel,
		});

		try {
			if (!queue.connection) await queue.connect(interaction.member.voice.channel);
		} catch {
			client.player.deleteQueue(interaction.guildId);
			return interaction.followUp({ content: "Could not join your voice channel!" });
		}

		await interaction.followUp({
			content: `⏱ | Loading your ${searchResult.playlist ? "playlist" : "track"}...`,
		});

		if (searchResult.playlist) queue.addTracks(searchResult.tracks);
		else queue.addTrack(searchResult.tracks[0]);

		if (!queue.playing) await queue.play();

		return null;
	},
};