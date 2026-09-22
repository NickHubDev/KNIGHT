<p align="center"><a href="https://github.com/NickHubDev"><img src="/src/assets/imgs/KnightLogo.jpg" width="300" alt="Knight Logo"/></a></p>

<h1 align="center"> 🦇 Knight.ts.bot</h1>

<p align="center"><strong>Developer-Friendly • Moderation • Utilities • Information • Fun</strong></p>

<p align="center">The official Discord bot for the <strong>NIZOLAX Community,</strong> built with <strong>TypeScript</strong> and <strong>Discord.js v14.</strong></a>

<p align="center">

- [📚 Resource Links](#-resource-links)
- [⚡ Prerequisites](#-prerequisites)
- [🚀 Getting Started](#-getting-started)
- [✨ Features](#-features)
- [🤝 Contributing](./CONTRIBUTING.md)

</p>

## 📚 Resource Links

* 🤖 **Demo Bot:** [Visit Here](https://discord.com/oauth2/authorize?client_id=1551188404539101214&permissions=8&integration_type=0&scope=bot)
* 🌍 **Official Community:** *(Coming Soon)*
* 💬 **Discord Developer Community:** [Visit Here](https://discord.gg/4xJZhVA7dS)

## ⚡ Prerequisites

Before running Knight, make sure you have:

* **Node.js v26.8.2** or higher
* **Git**
* A **Discord Application** created in the Discord Developer Portal

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NickHubDev/KNIGHT.git
cd KNIGHT
npm install
```

### 2. Configure your environment

Rename the **`.env.example`** file to **`.env`** and fill in your credentials.

| Variable            | Description                          |
| ------------------- | ------------------------------------ |
| `TOKEN`             | Your Discord Bot Token               |
| `clientId`          | Discord Application ID               |
| `guildId`           | Development Server ID                |
| `welcomeChannel`    | Welcome messages channel             |
| `welcomeBotChannel` | Bot welcome channel *(optional)*     |
| `moderationChannel` | Moderation logs channel *(optional)* |

### 3. Start Knight

```bash
npm run start
```

> 💡 Knight will automatically load all commands and events using its modular handler system.

<h1 align="center"> ✨ Features</h1>

#### 🛡️ Moderation

Powerful moderation tools designed for community management.

`ban` • `unban` • `waiting` • `warn` • `clear` • **more coming soon...**

#### 💻 Programmer Info

Utilities created especially for developers.

`info` • `test` • `creatormsg` • `status` • `vulnerabilities`

#### 📡 Reply & Information

Everyday commands for users and server interaction.

`ping` • `userinfo` • `botinfo` • `afk` • `afkoff` • `nizolinks`

#### 🧠 Custom Client

Knight uses an **extended Discord Client** to provide stronger typing, centralized collections and a cleaner architecture across the entire project.

#### 🧩 Utilities

Reusable event-based systems that allow the creation of dynamic server features:

* 🎫 Ticket Panels
* 🔒 Verification Panels
* 🏷️ Auto Role Panels
* 🚫 Appeal Ban System
* 🧪 Beta Tester Registration

<h1 align="center"> 🤝 Contributing</h1>

Contributions are always welcome!

If you'd like to improve Knight, please read the **[CONTRIBUTING](./CONTRIBUTING.md)** before opening a Pull Request.
<br>

<h1 align="center">📜 License</h1>

**Knight** is licensed under the **Knight Proprietary License**.

Please read the complete terms in **[LICENSE](./LICENSE)** before using or redistributing this project.

---

<div align="center">

### Built with ❤️ by **NIZOLAX**

**TypeScript • Discord.js • Node.js**

</div>
