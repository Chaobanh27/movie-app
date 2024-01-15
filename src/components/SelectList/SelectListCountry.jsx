/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { getListCountry } from '../../api'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'

const SelectListCountry = () => {
  const [data, setData] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [selectedValue, setSelectedValue] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const results = await getListCountry()
      setData(results)
    }
    fetchData()
  }, [])

  const renderData = () => {
    if (data.length > 0) {
      return data.map((value, key) => {
        return (
          <option key={key} value={value.iso_639_1}>{value.english_name}</option>
        )
      })
    }
  }

  const handleSelectChange = (e) => {
    let selectVal = e.target.value
    navigate('/movie/filter/Country/' + selectVal)
  }
  return (
    <>
      <Form.Select value={selectedValue} onChange={handleSelectChange} aria-label="Default select example">
        <option>Select movies by country</option>
        {renderData()}
      </Form.Select>
    </>
  )
}

export default SelectListCountry