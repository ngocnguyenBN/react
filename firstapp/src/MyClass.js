import React from 'react';
// import './Countries.css';
import { DataGrid } from '@material-ui/data-grid';
// import Moment from 'react-moment';
import Moment from 'moment';

class MyClass extends React.Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				field: 'firstName',
				headerName: 'Tên',
				width: 150,
			},
			{
				field: 'lastName',
				headerName: 'Họ',
				width: 150,
			},
			{
				field: 'country',
				headerName: 'Quốc gia',
				width: 150,
			},
			{
				field: 'phone',
				headerName: 'Điện thoại',
				width: 150,
			},
			{
				field: 'dob',
				headerName: 'Ngày sinh',
				width: 150,
			},
			{
				field: 'picture',
				headerName: 'Hình',
				width: 150,
			},
		];
		this.state = {
			columns: columns,
			students: [],
			selectedClass: props.selectedClass,
		};
	}

	static getDerivedStateFromProps(props, state) {
		console.log(
			'MyClass getDerivedStateFromProps',
			props.className,
			props.newStudent
		);
		if (props.className && props.newStudent) {
			const students = state.students;
			const newStudent = props.newStudent;
			newStudent.id = students.length + 1;
			newStudent.className = props.className;
			console.log('MyClass newStudent', newStudent);

			students.push(newStudent);
			return { selectedClass: props.className, students: students };
		} else {
			return { selectedClass: props.className };
		}
	}

	// componentDidMount() {
	// 	// this.getData();
	// }

	render() {
		console.log('MyClass render', this.state.selectedClass);
		let displayStudents = [...this.state.students];
		displayStudents = displayStudents.filter(
			(data) => data.className === this.state.selectedClass
		);
		return (
			<div style={{ height: 700, width: '100%' }}>
				<DataGrid rows={displayStudents} columns={this.state.columns} />
			</div>
		);
	}
}

export default MyClass;