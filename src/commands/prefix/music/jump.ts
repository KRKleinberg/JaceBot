import { bold, inlineCode, Message } from 'discord.js';
import { player } from '../../../index.js';

export default {
	data: {
		name: 'jump',
		aliases: ['skipto'],
		description: 'Removes a track from the queue',
		options: [`${inlineCode('integer')}`],
	},

	async execute(message: Message, args: string[]) {
		if (!message.member!.voice.channel) {
			return message.channel.send({
				content: '❌ | You are not in a voice channel!',
			});
		}

		const queue = player.getQueue(message.guild!);

		if (!queue || !queue.playing) return message.channel.send({ content: '❌ | No music is playing!' });

		const trackIndex = parseInt(args[0], 10) - 1;

		if (!queue.tracks[trackIndex])
			return message.channel.send({ content: '❌ | Please enter a valid track number!' });
		
		const trackName = queue.tracks[trackIndex].title;

		queue.skipTo(trackIndex);

		return message.channel.send({ content: `↪️ | Jumped to ${bold(trackName)}` });
	},
};