import { bold, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import { player } from '../../../index.js';

export default {
	data: new SlashCommandBuilder().setName('skip').setDescription('Skips the current song'),

	async execute(interaction: ChatInputCommandInteraction) {
		const member = interaction.member as GuildMember;
		const queue = player.getQueue(interaction.guild!);
		const currentTrack = queue.current.title;

		if (!member.voice.channel)
			return interaction.reply({ content: '❌ | You are not in a voice channel!' });

		if (!queue || !queue.playing) return interaction.reply({ content: '❌ | No music is playing!' });

		return interaction.reply(
			queue.skip()
				? { content: `⏭️ | Skipped ${bold(currentTrack)}!` }
				: { content: '❌ | Something went wrong!', ephemeral: true }
		);
	},
};
