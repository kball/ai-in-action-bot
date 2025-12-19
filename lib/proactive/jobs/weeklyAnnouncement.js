/**
 * Weekly announcement job.
 * Posts upcoming schedule to the configured announcements channel.
 */

const ScheduledSpeaker = require('../../../models/scheduledSpeaker')
const config = require('../../../config')

/**
 * Normalize a date to midnight UTC for comparison.
 * @param {Date} date - Date to normalize
 * @returns {Date} - Date normalized to midnight UTC
 */
function normalizeToMidnightUTC(date) {
  const d = new Date(date)
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

/**
 * Get today's date normalized to midnight UTC.
 * @returns {Date} - Today at midnight UTC
 */
function getTodayUTC() {
  return normalizeToMidnightUTC(new Date())
}

/**
 * Format upcoming talks for announcement.
 * @param {Array} talks - Array of ScheduledSpeaker documents
 * @returns {string} - Formatted message
 */
function formatUpcomingSchedule(talks) {
  if (talks.length === 0) {
    return 'No upcoming talks scheduled. Want to sign up? Just mention the bot!'
  }

  let message = '## Upcoming Talks\n\n'
  talks.forEach((talk, index) => {
    const dateStr = talk.scheduledDate.toISOString().split('T')[0]
    message += `${index + 1}. **${dateStr}** - ${talk.discordUsername}: "${talk.topic}"\n`
  })
  return message
}

/**
 * Run the weekly announcement job.
 * @param {Object} client - Discord.js client instance
 * @returns {Promise<Object>} - Job result
 */
async function runWeeklyAnnouncementJob(client) {
  if (!config.proactive.weeklyEnabled) {
    return {
      announcement: {
        posted: false,
        error: null,
      },
      skipped: true,
      reason: 'disabled',
    }
  }

  if (!config.proactive.announcementsChannelId) {
    return {
      announcement: {
        posted: false,
        error: 'PROACTIVE_ANNOUNCEMENTS_CHANNEL_ID not configured',
      },
    }
  }

  try {
    const today = getTodayUTC()
    // Get next 7 talks (next week)
    const upcomingTalks = await ScheduledSpeaker.find({
      scheduledDate: { $gte: today },
      talkCompleted: { $ne: true },
    })
      .sort({ scheduledDate: 1 })
      .limit(7)

    const message = formatUpcomingSchedule(upcomingTalks)

    const channel = await client.channels.fetch(
      config.proactive.announcementsChannelId,
    )
    await channel.send(message)

    return {
      announcement: {
        posted: true,
        talksCount: upcomingTalks.length,
        error: null,
      },
    }
  } catch (error) {
    return {
      announcement: {
        posted: false,
        error: error.message,
      },
    }
  }
}

module.exports = {
  runWeeklyAnnouncementJob,
}
