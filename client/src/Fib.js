import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Fib = () => {
  const [seenIndices, setSeenIndices] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')
  const [calculatedLabel, setCalculatedLabel] = useState([])
  const [submit, setSubmit] = useState(false)
  const [reload, setReload] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const values = await fetchValues()
      const seenIndices = await fetchIndices()

      setValues(values.data)
      setSeenIndices(seenIndices.data)
      setReload(false)
    }

    if (reload) {
      fetchData()
    }
  }, [reload])

  useEffect(() => {
    const entries = []

    for (const key in values) {
      entries.push(`For index ${key} i calculated ${values[key]}`)
    }

    setCalculatedLabel(entries)
  }, [values])

  useEffect(() => {
    async function store() {
      await storeIndex(index)

      setSubmit(false)
      setIndex('')
      setReload(true)
    }

    if (submit) {
      store()
    }
  }, [submit, index])

  const handleSubmit = event => {
    event.preventDefault()
    setSubmit(true)
  }
  
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Enter your index:</label>
          <input type="number" value={index} onChange={event => setIndex(event.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h3>Indexes i have seen:</h3>
        {seenIndices.map(({ number }) => number).join(', ')}
      </div>

      <div>
        <h3>Calculated values:</h3>
        {calculatedLabel.map(label => (<div key={label}>{label}</div>))}
      </div>
    </div>
  )
}

const fetchValues = async () => {
  const result = await axios.get('/api/values/current')

  return result
}

const fetchIndices = async () => {
  const result = await axios.get('/api/values/all')

  return result
}

const storeIndex = async (index) => {
  await axios.post('/api/values', {
    index
  })

  return index
}

export default Fib