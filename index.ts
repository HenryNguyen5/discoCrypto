import * as Discord from 'discord.js'
import envLoader from './util/env-loader'
import discordConfig from './config'
import commands from './commands'
import * as YAML from 'yamljs'
import db from './db'

const { DISCORD_TOKEN } = envLoader(discordConfig)
if (!DISCORD_TOKEN) {
	console.log('No discord token found, exiting...')
	process.exit()
}

const client = new Discord.Client()

client.on('ready', async () => {
	await db()
	console.log('I am ready!')
	client.user.setGame('watching for nocoiners')
})

client.on('message', async message => {
	try {
		console.log(message.author.username)
		const result = await commands(
			`${message.content} ${message.author.username}`
		).catch(e => console.error('Error:', e))

		console.log('Result', result)

		result &&
			message.channel.send(`\n
		${result}`)
	} catch (error) {
		console.error(error)
	}
})

client.login(DISCORD_TOKEN)
