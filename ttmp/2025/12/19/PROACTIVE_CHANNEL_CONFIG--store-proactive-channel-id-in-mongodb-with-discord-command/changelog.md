# Changelog

## 2025-12-19

- Initial workspace created


## 2025-12-19

Step 1: Created GuildSettings model and helper functions (commit 42e6d40)

### Related Files

- /Users/kball/git/ai-in-action-bot/lib/proactive/getGuildSettings.js — Query helpers
- /Users/kball/git/ai-in-action-bot/models/guildSettings.js — New MongoDB schema


## 2025-12-19

Step 2: Created set-proactive-channel Discord command (commit eca63bc)

### Related Files

- /Users/kball/git/ai-in-action-bot/lib/discord/commands/set-proactive-channel.js — Discord command implementation


## 2025-12-19

Step 3: Updated weeklyAnnouncement job to use MongoDB (commit 994836d)

### Related Files

- /Users/kball/git/ai-in-action-bot/lib/proactive/jobs/weeklyAnnouncement.js — MongoDB lookup with config fallback

