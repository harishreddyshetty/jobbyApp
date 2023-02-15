import './index.css'

const FiltersComponent = props => {
  const renderEmployeeTypeList = () => {
    const {employmentData, updateEmploymentType} = props

    return employmentData.map(eachType => {
      const onClickEmploymentType = event => {
        updateEmploymentType(event.target.value)
      }

      return (
        <li
          onChange={onClickEmploymentType}
          className="list-items"
          key={eachType.employmentTypeId}
        >
          <input
            value={eachType.employmentTypeId}
            id={eachType.label}
            type="checkbox"
          />
          <label htmlFor={eachType.label}>{eachType.label}</label>
        </li>
      )
    })
  }

  const renderEmploymentFilter = () => (
    <>
      <hr />
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="unordered-list">{renderEmployeeTypeList()}</ul>
      <hr />
    </>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList, updateSalary} = props

    return salaryRangesList.map(salary => {
      const onClickSalary = event => {
        updateSalary(event.target.value)
      }

      return (
        <li className="list-items" key={salary.salaryRangeId}>
          <input
            name="salary"
            onClick={onClickSalary}
            value={salary.salaryRangeId}
            id={salary.label}
            type="radio"
          />
          <label htmlFor={salary.label}>{salary.label}</label>
        </li>
      )
    })
  }

  const renderSalaryRangerFilter = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="unordered-list">{renderSalaryRangeList()}</ul>
    </>
  )

  return (
    <div>
      {renderEmploymentFilter()}
      {renderSalaryRangerFilter()}
    </div>
  )
}

export default FiltersComponent
