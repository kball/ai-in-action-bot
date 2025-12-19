const express = require('express')
const router = express.Router()
const autoCatch = require('../lib/auto-catch')
const loopbackOnly = require('../middleware/loopback-only')

// Apply loopback-only security to all routes in this router
router.use(loopbackOnly)

/**
 * POST /internal/proactive/check-reminders
 * Triggers the talk reminders job.
 * Returns JSON summary with counts, duration, and errors.
 */
router.post(
  '/check-reminders',
  autoCatch(async (req, res) => {
    const startTime = Date.now()

    // TODO: Phase 2 - Call actual job function
    // const result = await runTalkRemindersJob()

    // Placeholder response for now
    const duration = Date.now() - startTime
    res.json({
      job: 'check-reminders',
      status: 'success',
      duration,
      reminders: {
        tminus1Sent: 0,
        dayOfSent: 0,
        errors: [],
      },
      timestamp: new Date().toISOString(),
    })
  }),
)

/**
 * POST /internal/proactive/weekly-announcement
 * Triggers the weekly schedule announcement job.
 * Returns JSON summary with counts, duration, and errors.
 */
router.post(
  '/weekly-announcement',
  autoCatch(async (req, res) => {
    const startTime = Date.now()

    // TODO: Phase 2 - Call actual job function
    // const result = await runWeeklyAnnouncementJob()

    // Placeholder response for now
    const duration = Date.now() - startTime
    res.json({
      job: 'weekly-announcement',
      status: 'success',
      duration,
      announcement: {
        posted: false,
        error: null,
      },
      timestamp: new Date().toISOString(),
    })
  }),
)

module.exports = router
