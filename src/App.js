import {Component} from 'react'

import './App.css'

import UserItem from './components/UserItem'

class App extends Component {
  state = {userDataList: [], searchValue: '', checkAll: false}

  componentDidMount() {
    // Simple GET request using fetch

    const getItem = localStorage.getItem('userDataList')
    // console.log(getItem)
    this.setState({userDataList: JSON.parse(getItem)})

    if (getItem === null || getItem.length === []) {
      fetch(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
      )
        .then(response => response.json())
        .then(jsonData => {
          // console.log(jsonData)
          const updatedDataList = jsonData.map(eachItem => {
            const {isChecked} = eachItem
            if (isChecked === undefined) {
              return {
                ...eachItem,
                isChecked: false,
              }
            }
            return {...eachItem, isChecked: false}
          })
          // console.log(updatedDataList)

          this.setState({userDataList: updatedDataList})
          localStorage.setItem('userDataList', JSON.stringify(updatedDataList))
        })
    }
  }

  deleteUser = id => {
    const {userDataList} = this.state

    const updatedUserDataList = userDataList.filter(
      eachUser => eachUser.id !== id,
    )
    localStorage.setItem('userDataList', JSON.stringify(updatedUserDataList))
    this.setState({userDataList: updatedUserDataList})
  }

  changeCheckStatusForAll = () => {
    const {checkAll, userDataList} = this.state
    this.setState({
      checkAll: !checkAll,
      userDataList: userDataList.map(eachItem => {
        const {isChecked} = eachItem
        console.log(isChecked)
        return {...eachItem, isChecked: !checkAll}
      }),
    })
  }

  toggleStatusCheck = id => {
    const {userDataList} = this.state
    const updateCheckedList = userDataList.map(eachItem => {
      const {isChecked} = eachItem
      if (id === eachItem.id) {
        return {...eachItem, isChecked: !isChecked}
      }
      return {...eachItem}
    })

    const isAllChecked = updateCheckedList.every(
      eachItem => eachItem.isChecked === true,
    )
    this.setState({userDataList: updateCheckedList, checkAll: isAllChecked})
  }

  submitSearchValue = event => {
    event.preventDefault()
    const {userDataList, searchValue} = this.state

    const updatingList = userDataList.filter(eachItem =>
      eachItem.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    console.log(updatingList)
    // this.setState({userDataList: updatingList})
  }

  changeSearchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  deleteSelected = () => {
    const {userDataList} = this.state
    const deletingUserListData = userDataList.filter(
      eachItem => eachItem.isChecked === false,
    )
    localStorage.setItem('userDataList', JSON.stringify(deletingUserListData))
    this.setState({userDataList: deletingUserListData})
  }

  render() {
    const {userDataList, searchValue, checkAll} = this.state
    const updatingList = userDataList.filter(eachItem => {
      if (eachItem.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true
      }
      if (eachItem.email.toLowerCase().includes(searchValue.toLowerCase())) {
        return true
      }
      if (eachItem.role.toLowerCase().includes(searchValue.toLowerCase())) {
        return true
      }
      return false
    })

    return (
      <div className="bg-container">
        <div className="app-container">
          <form onSubmit={this.submitSearchValue}>
            <input
              value={searchValue}
              onChange={this.changeSearchValue}
              type="search"
              placeholder="Search by name , email or role"
              id="searchValue"
              className="search-input"
            />
          </form>
        </div>
        <ul className="list-container">
          <li className="list-item">
            <div className="list-item-container">
              <input
                type="checkbox"
                onChange={this.changeCheckStatusForAll}
                checked={checkAll}
              />
              <p className="name">Name</p>
              <p className="email">Email</p>
              <p className="role">Role</p>
              <p className="Actions">Actions</p>
            </div>
          </li>
          {updatingList.map(eachItem => (
            <UserItem
              eachItem={eachItem}
              key={eachItem.id}
              deleteUser={this.deleteUser}
              toggleStatusCheck={this.toggleStatusCheck}
            />
          ))}
        </ul>
        <div className="footer-container">
          <button
            className="delete-selected"
            onClick={this.deleteSelected}
            type="button"
          >
            Delete Selected
          </button>
        </div>
      </div>
    )
  }
}

export default App
