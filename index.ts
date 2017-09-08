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
let channel
client.on('ready', async () => {
	await db(MONGODB_URI)
	console.log('I am ready!')
	client.user.setGame('watching for nocoiners')
})

client.on('message', async message => {
	channel = message.channel
	try {
		console.log(message.author.username)
		const result = await commands(
			`${message.content} ${message.author.username}`
		).catch(e => console.error('Error:', e))

		if (!result) {
			return
		}
		console.log('result', JSON.stringify(result, null, 2))
		
		if (Array.isArray(result)){
			result.map((embed) => {
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
	console.log('Message', JSON.stringify(message,null, 2))
	try{
		if (user){
			client.users.find('username', user).send(message)
			
		} else {
			// tslint:disable-next-line
			client.guilds.find('name', 'bottesting').channels.find('name','general').send(message)
		}
	} catch (err) {
		console.error(err)
	}
}