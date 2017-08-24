import * as Discord from 'discord.js'
import envLoader from './util/env-loader'
import discordConfig from './config'
import commands from './commands'
import * as YAML from 'yamljs'

const { DISCORD_TOKEN } = envLoader(discordConfig)
if (!DISCORD_TOKEN) {
	console.log('No discord token found, exiting...')
	process.exit()
}

const client = new Discord.Client()

client.on('ready', () => {
	console.log('I am ready!')
})

client.on('message', async message => {
	try {
		const result = await commands(message.content)
		result && message.reply(`\n${YAML.stringify(result)}`)
	} catch (error) {
		console.error(error)
	}
})

client.login(DISCORD_TOKEN)
