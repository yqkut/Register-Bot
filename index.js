const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ] 
});

const TOKEN = 'tokengir';
const hosgeldin_kanali = 'idgir'; // kayit sonrasi botun mesaj atacagi kanal idsini gir
const yeniUyeRolId = 'idgir'; // kayitsiz rolunun idsini gir
const kayitliUyeRolId = 'idgir'; // kayit sonrasi verilecek rol idsini gir
const logKanalID = 'idgir'; // log kanal id gir
const emoji = '✅'; // kayit emojisi gir
const ownerID = 'idgir'; // !setup komutunu kullanacak kisinin idsini gir

client.once('ready', () => {
    console.log(`${client.user.tag} adli bot goreve hazir`);
});

client.on('guildMemberAdd', async member => {
    const dmMesaj = (
        "`Yakut - Discord Topluluğuna hoş geldiniz.`\n\n" +
        "Bu toplulukta yeni arkadaşlıklar edinebilirsin. Sunucu içerisindeki üyeler sıcakkanlı samimi insanlardır. " +
        "Burada beraber oyun oynayabilecek arkadaşlar bulabilir, anime önerileri alabilecek beraber dizi film izleyebilecek " +
        "belki de hayat arkadaşın olabilecek insanlarla tanışabileceksin. Burası insanların eğlenebileceği dostluklar kurup " +
        "düzgün muhabbetler kurabileceği bir topluluk olması amacıyla kuruldu.\n\n" +
        "**Her şeyden önce bu toplulukta iyi vakit geçirmeyi, güzel anılar edinmeyi unutma :) Aileye hoş geldin.**\n\n" +
        "**Not**: Eğer Discord sunucumuzdan çıkmaya meyilli veya gezmeye gelmiş biriysen yine de kuralları okumanı rica edeceğim. " +
        "Sunucunun daha iyi yerlere gelebilmesi için önerilerinizi, şikayetlerinizi ve beğenmediğiniz herhangi bir şeyi yazmanızı rica ediyorum.\n\n" +
        "Üyelerimizin eleştirileri bizi ileriye taşımada öncülük edecektir. Lütfen bunu yapmaktan çekinmeyiniz.\n\n" +
        "Haa olur da çıkarsan ve sonra geri gelmek istersen davet linkimiz burada; https://discord.gg/yakut Her zaman bekleriz. :)"
    );

    try {
        await member.send(dmMesaj);
        await member.roles.add(yeniUyeRolId);
    } catch (err) {
        console.error('Üyeye DM gönderilirken veya rol verilirken bir hata oluştu:', err);
    }
});

client.on('messageCreate', async message => {
    if (message.content === '!setup') {
        if (message.author.id !== ownerID) {
            return message.reply('Bu komutu kullanma yetkiniz yok.');
        }

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Kayıt Ol')
            .setDescription('Emojiye basıp sende aramıza katılabilirsin.\n\nEğer bir sorunla karşılaşırsan devamlı aktif olan yetkili ekibimize iletebilir, dilersen destek kanalımızdan özel kanal oluşturup yetkili ekibimiz ile birebir görüşebilirsin. Aramıza şimdiden hoş geldin!')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp();

        const embedMessage = await message.channel.send({ embeds: [embed] });
        await embedMessage.react(emoji);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.embeds[0] && reaction.emoji.name === emoji) {
        const initialRole = reaction.message.guild.roles.cache.get(yeniUyeRolId);
        const finalRole = reaction.message.guild.roles.cache.get(kayitliUyeRolId);
        const member = reaction.message.guild.members.cache.get(user.id);
        const LogKanal = reaction.message.guild.channels.cache.get(logKanalID);
        const welcomeChannel = reaction.message.guild.channels.cache.get(hosgeldin_kanali);

        if (initialRole && finalRole && member) {
            await member.roles.remove(initialRole);
            await member.roles.add(finalRole);
            console.log(`${user.tag} rolü değiştirildi: ${initialRole.name} rolü kaldırıldı, ${finalRole.name} rolü verildi.`);

            if (LogKanal) {
                const logEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Aramıza yeni biri katıldı!')
                    .setDescription(`**${user.tag}** adlı kullanıcı sunucuya katıldı ve kayıt oldu. Sohbet kanalında ona sıcak bir karşılama yapın!`)
                    .addFields(
                        { name: '🔴 Kaldırılan Rol', value: initialRole.name, inline: true },
                        { name: '🟢 Verilen Rol', value: finalRole.name, inline: true }
                    )
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .setFooter({ text: `ID: ${user.id}` })
                    .setTimestamp();

                LogKanal.send({ embeds: [logEmbed] });
            }

            if (welcomeChannel) {
                const hosgeldinEmbed = new EmbedBuilder()
                    .setTitle('Yakut sunucusuna hoş geldin!')
                    .setDescription('Öncelikle sunucumuza hoş geldin! Umarım burada güzel vakit geçirip, iyi arkadaşlıklar kurabilirsin. Ortam içerisinde herhangi bir sorun sıkıntı yaşarsan yetkililere yazmaktan asla çekinme.\n')
                    .setColor(0x2f3136)
                    .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
                    .setThumbnail(reaction.message.guild.iconURL())
                    .setFooter({ text: `Seninle birlikte ${reaction.message.guild.memberCount} kişiyiz!` });

                await welcomeChannel.send({ content: `Aramıza hoş geldin ${user}!` });
                await welcomeChannel.send({ embeds: [hosgeldinEmbed] });
            }
        }
    }
});

client.login(TOKEN);
