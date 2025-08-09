# Telegram ID Resolver

🔍 Web-app for searching telegram id according to '@username'.

## Telethon library

- Before initialization, make sure that you created session file and registered in ![my.telegram.org](https://my.telegram.org/).
    ```
    import asyncio
    from telethon import TelegramClient

    # Replace to your values
    API_ID = api_id
    API_HASH = "api_hask"
    PHONE_NUMBER = "+1234567890"  # Your telegram account's phone number

    async def main():
        client = TelegramClient("session_name", API_ID, API_HASH)

        # 1) Connecting (creating or reading session_name.session)
        await client.start()
        
        # 2) If this is your first time logging in to Telethon, it will ask you to enter a code in the console,
        # which will be sent to the specified number in Telegram.
        # Then it will automatically save session_name.session
        # and the code will not be required next time.

        # For the test, you can request your own profile:
        me = await client.get_me()
        print("Authorized as:", me.username or me.first_name)

        await client.disconnect()

    if __name__ == "__main__":
        asyncio.run(main())

    ```

- Then put your api id, hash and session path.

## Result

![](https://github.com/Mad03633/Telegram_id-resolver/blob/main/frontend/public/result.jpg)