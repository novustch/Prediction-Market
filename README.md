# EVM-Copy-Trading-bot 

This is a copy trading bot for EVM chains. It uses web scraping to monitor the positions opened by traders sharing their positions on EVM Futures Leaderboard. We then mimic the trade in your account using the Bybit api. MongoDB is the database used in this software. **Bot updated and working (Mar 2025)**

## Contact

| Platform | Link |
|----------|------|
| 📱 Telegram | [t.me/novustch](https://t.me/novustch) |
| 📲 WhatsApp | [wa.me/14105015750](https://wa.me/14105015750) |
| 💬 Discord | [discordapp.com/users/985432160498491473](https://discordapp.com/users/985432160498491473)

<div align="center">
    <a href="https://t.me/novustch" target="_blank"><img alt="Telegram"
        src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white"/></a>
    <a href="https://wa.me/14105015750" target="_blank"><img alt="WhatsApp"
        src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"/></a>
    <a href="https://discordapp.com/users/985432160498491473" target="_blank"><img alt="Discord"
        src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"/></a>
</div>

Feel free to reach out for implementation assistance or integration support.

## Running the bot on your own

### Environment setup (Recommended)

#### Using Conda

At your target directory, execute the following:

```bash
conda create -n trading python=3.10 -y
conda activate trading
git clone https://github.com/novustch/Copy-Trading-Bot.git
cd Copy-Trading-Bot
pip install -r requirements.txt
```

### Database Setup

Follow the instructions in https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/ to set up MongoDB on the same host where the program is run.  
Follow https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04 to set up username and password.  

### Software setup 

1. Setup a telegram bot using `Botfather` (details on telegram official site) and mark the access token.
2. Setup a discord channel for urgent/alert messages, and get a webhook url. (Reason is to avoid mixing them into the telegram channel and missing out on them.)
3. Fill in the required fields in  `app/data/credentials.py`
4. Run `python -m  app.ct_main` and `python -m app.tgb_main`. It is suggested to set both up as a systemctl service, with restart=always and a MaxRunTime so that the program is automatically restarted from time to time.
5. Call `/addcookie` to add credentials required for api end-points every 2-3 days. I will not teach you how to do so here, but you can find the information on the internet.

### Using the software

After the python programs are up and running, go to your telegram bot and type /start, then follow the instructions.  
It should be rather straightforward but if you encounter any uncertainties, please report it to me by raising an issue.  
Refer to the file telegram-commands.txt for a list of commands you can use.  
I personally suggest you go to the EVM leaderboard, pick a longer timespan (e.g. monthly or all-time) and choose the top traders sharing their positions.  

### Contributing

We welcome contributions to improve EVM-Copy-Trading-bot! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to:
- Follow the existing code style
- Add tests if applicable
- Update documentation as needed
- Reference any related issues in your PR

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Disclaimer

- Users are solely responsible for their own trading decisions and the management of their accounts. TraderCloneX is not a financial advisor, and any information provided by the bot should not be taken as financial advice. Users should conduct their own due diligence and consider seeking advice from an independent financial advisor.
- TraderCloneX does not accept any liability for loss or damage as a result of reliance on the information contained within this bot. Please be fully informed regarding the risks and costs associated with trading the financial markets. While we strive to ensure our service is both fast and reliable, TraderCloneX cannot guarantee the uptime or data accuracy of the service. Access to the bot during the launch phase is limited to users who sign up using our Bybit referral link, and this condition may be subject to change in the future.
- By using TraderCloneX, you acknowledge and agree that you have read, understood, and accept the full terms of this disclaimer. You agree that all use of the TraderCloneX service is at your own risk, and you are fully responsible for any resulting profits or losses.
- Remember that trading can lead to losses that exceed initial investments. Therefore, you should not trade with capital that you cannot afford to lose. If you have any doubts, it is advisable to seek advice from an independent financial advisor.

### Support the Project

If you find this project useful, consider supporting it in one of these ways:
- Star the repository
- Report bugs or suggest features by creating issues
- Submit pull requests
- Share the project with others

