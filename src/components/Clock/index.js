// import {Component} from 'react'

// import './index.css'

// // class Clock extends Component {
// //   constructor(props) {
// //     super(props)

// //     this.state = {date: new Date()}
// //     console.log('constructor method')
// //   }

// //   componentDidMount() {
// //     console.log('componentDidMount method')
// //     this.timerId = setInterval(this.tick, 1000)
// //   }

// //   componentWillUnmount() {
// //     console.log('component will unmount')
// //     clearInterval(this.timerId)
// //   }

// //   tick = () => {
// //     this.setState({date: new Date()})
// //   }

// //   render() {
// //     const {date} = this.state
// //     console.log(date)
// //     console.log('render method')
// //     return (
// //       <div className="clock-container">
// //         <h1 className="heading">Clock</h1>
// //         <p className="time">{date.toLocaleTimeString()}</p>
// //       </div>
// //     )
// //   }
// // }
// // export default Clock

// class Clock extends Component {
//   state = {userDataList: [], searchValue: ''}

//   componentDidMount() {
//     // Simple GET request using fetch
//     fetch(
//       'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
//     )
//       .then(response => response.json())
//       .then(jsonData => {
//         console.log(jsonData)
//         this.setState({userDataList: jsonData})
//       })
//   }

//   render() {
//     const {userDataList, searchValue} = this.state
//     console.log(userDataList)
//     console.log(searchValue)

//     return (
//       <ul className="list-container">
//         {userDataList.map(eachItem => (
//           <li className="list-item">
//             <div className="">
//               <p className="name">{eachItem.name}</p>
//               <p className="email">{eachItem.email}</p>
//               <p className="role">{eachItem.role}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     )
//   }
// }

// export default Clock
