import * as Bot from '@utils/bot';
import { GuildQueueEvent } from 'discord-player';
import {
	type AnySelectMenuInteraction,
	type CacheType,
	type ChatInputCommandInteraction,
	type Message,
} from 'discord.js';

export const event: Bot.Event = {
	async execute() {
		/**
		 * Debug
		 * Bot.player.events.on(GuildQueueEvent.debug, (_queue, message) => console.log(message));
		 */

		Bot.player.events.on(GuildQueueEvent.error, async (_queue, error) => {
			console.error(error);
		});

		Bot.player.events.on(GuildQueueEvent.playerError, async (queue, error, track) => {
			const command:
				| ChatInputCommandInteraction<CacheType>
				| AnySelectMenuInteraction
				| Message<boolean> = queue.metadata;

			console.error(error);

			try {
				if (!queue.isPlaying()) await queue.node.play();
			} catch (error) {
				console.error(error);
			}

			return await Bot.respond(
				command,
				`⚠️ | There was an error playing **${track.title}** by **${track.author}**`,
				{ channelSend: true }
			);
		});

		Bot.player.events.on(GuildQueueEvent.playerStart, async (queue, track) => {
			const command:
				| ChatInputCommandInteraction<CacheType>
				| AnySelectMenuInteraction
				| Message<boolean> = queue.metadata;

			return await Bot.respond(command, `🎵 | Playing **${track.title}** by **${track.author}**`, {
				channelSend: true,
			});
		});
	},
};
