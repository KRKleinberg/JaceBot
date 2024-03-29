import { Bot } from '@utils/bot';
import { DynamoDB } from '@utils/dynamodb';
import { Events } from 'discord.js';

export const event: Bot.Event = {
	async execute() {
		Bot.client.on(Events.GuildCreate, async (guild) => {
			const defaultPrefs = await DynamoDB.Tables.getDefaultPrefs();

			try {
				await guild.members.me?.setNickname(defaultPrefs.nickname);
			} catch (error) {
				console.log('Could not set nickname');
			}
		});
	},
};
