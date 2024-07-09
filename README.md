# Bot nasıl çalıştırılıyor?
- Botu kullanmak için öncelikle [node.js](https://nodejs.org/dist/v20.15.0/node-v20.15.0-x64.msi) indirmeniz ve kurmanız gerekmektedir.
- Daha sonra projeyi [ZIP](https://www.win-rar.com/postdownload.html?&L=5) olarak indirip klasöre çıkartın ve [Visual Studio Code](https://code.visualstudio.com/)'u bilgisayarınıza indirip kurun.
- Kurulum işlemi bittikten sonra klasöre çıkarttığınız projenin klasörüne sağ tıklayıp Code ile aç seçeneğini seçin ve proje içerisindeki **index.js** dosyasına girin.
- Sonrasında [doldurulması gereken kısımları](https://prnt.sc/DYbNjM7RT8Og) doldurun ve sırasıyla **CTRL** + **Shift** + **+** tuşlarına basın veya üst taraftan **Terminal** butonuna basıp **New Terminal** seçeneğini seçin.
- Botun çalışması için gerekli kütüphaneyi ve package'ı yüklemek için bu iki komutu terminale girin:

`npm init -y`
`npm install discord.js`

Ve sonra `node .\index.js` komutunu girerek botu çalıştırın.

Sonra hangi kanala [kayıt ol](https://prnt.sc/bkh9cRQB7ifV) mesajını atmak istiyorsanız **!setup** komutunu kullanın.
