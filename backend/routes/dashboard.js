const express = require('express')
const router = express.Router()
const pool = require('../db')

// Skill demand over time
router.get('/skills', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT skill, job_count, snapshot_date FROM skill_demand_snapshots ORDER BY snapshot_date ASC'
    )
    res.json({ data: rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Salary trends over time
router.get('/salaries', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT skill, avg_min, avg_max, snapshot_date FROM salary_snapshots ORDER BY snapshot_date ASC'
    )
    res.json({ data: rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Location distribution over time
router.get('/locations', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT province, job_count, snapshot_date FROM location_snapshots ORDER BY snapshot_date ASC'
    )
    res.json({ data: rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router