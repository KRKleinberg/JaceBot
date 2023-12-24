import { useQueue } from 'discord-player';
import {
	InteractionType,
	SlashCommandBuilder,
	type Command,
	type MessageCreateOptions,
	type MessagePayload,
} from 'discord.js';
import { basename } from 'path';
import { fileURLToPath } from 'url';

export const command: Command = {
	data: new SlashCommandBuilder()
		.setName(basename(fileURLToPath(import.meta.url), '.js').toLowerCase())
		.setDescription('Pauses the player'),
	async execute({ command, guild, member }) {
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
		if (!queue.isPlaying()) {
			const response: string | MessagePayload | MessageCreateOptions = '❌ | There are no tracks playing';
			return isInteraction
				? await command.followUp({ content: response, ephemeral: true })
				: await command.channel.send(response);
		}

		try {
			queue.node.pause();
		} catch (error) {
			console.error(error);

			const response: string | MessagePayload | MessageCreateOptions = '⚠️ | Could not pause the player';
			return isInteraction
				? await command.followUp({ content: response, ephemeral: true })
				: await command.channel.send(response);
		}

		const response: string | MessagePayload | MessageCreateOptions =
			`⏸️ | Paused **${currentTrack.title}** by **${currentTrack.author}**`;
		return isInteraction ? await command.editReply(response) : await command.channel.send(response);
	},
};
