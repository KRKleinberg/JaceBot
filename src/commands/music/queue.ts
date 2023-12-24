import { Str } from '@supercharge/strings';
import { useQueue } from 'discord-player';
import {
	EmbedBuilder,
	InteractionType,
	SlashCommandBuilder,
	type Command,
	type MessageCreateOptions,
	type MessagePayload,
} from 'discord.js';
import { basename } from 'path';
import { fileURLToPath } from 'url';

export const command: Command = {
	aliases: ['q'],
	data: new SlashCommandBuilder()
		.setName(basename(fileURLToPath(import.meta.url), '.js').toLowerCase())
		.setDescription('Displays the queue'),
	async execute({ command, guild, member, defaultPrefs, guildPrefs }) {
		const isInteraction = command.type === InteractionType.ApplicationCommand;
		const queue = useQueue(guild);
		const currentTrack = queue?.currentTrack;

		if (member.voice.channel == null) {
			const response: string | MessagePayload | MessageCreateOptions = '❌ | You are not in a voice channel';
			return isInteraction
				? await command.followUp({ content: response, ephemeral: true })
				: await command.channel.send(response);
		}
		if (currentTrack == null) {
			const response: string | MessagePayload | MessageCreateOptions = '❌ | There are no tracks in the queue';
			return isInteraction
				? await command.followUp({ content: response, ephemeral: true })
				: await command.channel.send(response);
		}
		if (member.voice.channel !== queue?.channel) {
			const response: string | MessagePayload | MessageCreateOptions =
				'❌ | You are not in the same voice channel as the bot';
			return isInteraction
				? await command.followUp({ content: response, ephemeral: true })
				: await command.channel.send(response);
		}

		try {
			const embed = new EmbedBuilder()
				.setColor(guildPrefs?.color ?? defaultPrefs.color)
				.setTitle('Queue')
				.setDescription(
					Str(
						`**Now Playing:**\n[**${currentTrack.title}**](${currentTrack.url}) by **${currentTrack.author}**\n\n${queue.tracks
							.map((track, index) => `**${index + 1}.** [**${track.title}**](${track.url}) by **${track.author}**`)
							.join('\n')}`
					)
						.limit(4093, '...')
						.toString()
				);
			const response: string | MessagePayload | MessageCreateOptions = { embeds: [embed] };
			return isInteraction ? await command.editReply(response) : await command.channel.send(response);
		} catch (error) {
			console.error(error);

			const response: string | MessagePayload | MessageCreateOptions = '⚠️ | Could not display the queue';
			return isInteraction
				? await command.followUp({ content: response, ephemeral: true })
				: await command.channel.send(response);
		}
	},
};
