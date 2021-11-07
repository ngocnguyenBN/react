import React from 'react';
import MyAppBar from './MyAppBar';
// import MyContent from './MyContent';
import MyClass from './MyClass';
import moment from 'moment';

class App extends React.Component {
	constructor() {
		super();
		this.state = { selectedClass: '', addStudent: false };
	}

	handleClassChange = (selectedClass) => {
		console.log('App chọn: ', selectedClass);
		this.setState({
			selectedClass: selectedClass,
			newStudent: null,
			className: this.state.selectedClass,
		});
	};

	handleAddStudent = () => {
		console.log('App thêm sinh viên vào lớp: ', this.state.selectedClass);
		this.addNewStudent();
	};

	addNewStudent = () => {
		// console.log('addNewStudent');
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
						newStudent: dataWithId[0],
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
					classes={[{ id: 1, value: 'một' }]}
					handleSelectClassChange={this.handleClassChange}
					handleAddStudent={this.handleAddStudent}
				/>
				<br />
				<MyClass
					newStudent={this.state.newStudent}
					className={this.state.selectedClass}
				/>
			</div>
		);
	}
}

export default App;