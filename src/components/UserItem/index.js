const UserItem = props => {
  const {eachItem, deleteUser, toggleStatusCheck} = props
  const {isChecked} = eachItem
  const backgroundColor = isChecked ? 'grey' : ''
  //   console.log(isChecked)

  const deletingUser = () => {
    console.log(eachItem.id)
    deleteUser(eachItem.id)
  }

  const changeCheckStatus = () => {
    toggleStatusCheck(eachItem.id)
  }

  return (
    <li className={`list-item ${backgroundColor}`} key={eachItem.id}>
      <div className="list-item-container">
        <input
          type="checkbox"
          onChange={changeCheckStatus}
          checked={isChecked}
        />
        <p className="name">{eachItem.name}</p>
        <p className="email">{eachItem.email}</p>
        <p className="role">{eachItem.role}</p>
        <div className="edit-delete-container">
          <button className="" type="button">
            <i className="far fa-edit" />
          </button>
          <button type="button" onClick={deletingUser}>
            <i className="far fa-trash-alt" />
          </button>
        </div>
      </div>
    </li>
  )
}

export default UserItem
