import React from 'react';
//import header from './header'
import MyAppBar from './MyAppBar';
// import MyContent from './MyContent';
import MyClass from './MyClass';
import moment from 'moment';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedList: '',
			addCustomer: false,
			totalCustomers: 0,
		};
	}

	handleClassChange = (selectedList) => {
		// console.log('App chọn: ', selectedClass);
		this.setState({
			selectedList: selectedList,
			newCustomer: null,
			className: this.state.selectedList,
		});
	};

	handleAddCustomer = () => {
		// console.log('App thêm sinh viên vào lớp: ', this.state.selectedClass);
		this.addNewCustomer();
	};

	handleTotalCustomers = (totalCustomers) => {
		// console.log('handleTotalCustomers: ', totalCustomers);
		this.setState({ totalCustomers: totalCustomers, newCustomer: null });
	};

	addNewCustomer = () => {
		// console.log('addNewCustomer');
		fetch('https://randomuser.me/api/?results=1')
			.then((res) => res.json())
			.then(
				(data) => {
					// console.log('data', data.results);
					let id = 1;
					const dataWithId = data.results.map((record) => {
						return {
							id: id++,
							firstName: record.name.first,
							lastName: record.name.last,
							country: record.location.country,
							phone: record.phone,
							dob: moment(record.dob.date).format('DD/MM/YYYY'),
							picture: record.picture.thumbnail,
						};
					});
					// console.log('dataWithId', dataWithId);
					this.setState({
						newCustomer: dataWithId[0],
						className: this.state.selectedClass,
					});
				},
				(error) => {
					console.log('error', error);
				}
			);
	};

	render() {
		return (
			<div>
				<MyAppBar
					handleSelectClassChange={this.handleClassChange}
					handleAddCustomer={this.handleAddCustomer}
					totalCustomers={this.state.totalCustomers}
				/>
				<br />
				<MyClass
					newCustomer={this.state.newCustomer}
					className={this.state.selectedList}
					handleTotalCustomers={this.handleTotalCustomers}
				/>
			</div>
		);
	}
}

export default App;