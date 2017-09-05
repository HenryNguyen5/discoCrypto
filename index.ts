import * as Discord from 'discord.js'
import commands from './commands'
import discordConfig from './config'
import db from './db'
import envLoader from './util/env-loader'

const { DISCORD_TOKEN, MONGODB_URI } = envLoader(discordConfig)
if (!DISCORD_TOKEN) {
	console.log('No discord token found, exiting...')
	process.exit()
}

const client = new Discord.Client()

client.on('ready', async () => {
	await db(MONGODB_URI)
	console.log('I am ready!')
	client.user.setGame('watching for nocoiners')
})

client.on('message', async message => {
	try {
		console.log(message.author.username)
		const result = await commands(
			`${message.content} ${message.author.username}`
		).catch(e => console.error('Error:', e))

		if (!result) {
			return
		}
		console.log('result', result)
		if (Array.isArray(result)){
			result.forEach((embed) => {
				if (embed.personal) {
					message.author.send(embed)
				}
				else {
					message.channel.send(embed)
				}
			})
		}
		else{
			message.channel.send(result)
		}
	} catch (error) {
		console.error(error)
	}
})

client.login(DISCORD_TOKEN)

export const sendMessage = async ({ user, message }) => {
	console.log(message)
	await client
	if (user){
		client.users.find('username', user).send(message)
		
	} else {
		throw new Error('Invalid params send to sendMessage')
	}
}