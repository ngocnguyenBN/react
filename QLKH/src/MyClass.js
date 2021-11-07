import React from 'react';
// import './Countries.css';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import MuiAlert from '@material-ui/lab/Alert';
// import Moment from 'react-moment';
// import moment from 'moment';

class MyClass extends React.Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				field: 'actions',
				headerName: 'Actions',
				width: 100,
				renderCell: (params) => (
					<div style={{ marginTop: 10, cursor: 'pointer' }}>
						<EditIcon onClick={() => this.editRow(params.value)} />
						<DeleteForIcon
							onClick={() => this.deleteRow(params.value)}
						/>
					</div>
				),
			},
			{
				field: 'picture',
				headerName: 'Avatar',
				width: 100,
				renderCell: (params) => (
					<div>
						<Avatar alt='' src={params.value} />
					</div>
				),
			},
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
		];
		this.state = {
			columns: columns,
			Customers: [],
			selectedClass: props.selectedClass,
			openConfirmation: false,
			openEditor: false,
			editCustomer: null,
			editedCustomer: null,
			totalCustomers: 0,
			maxID: 1,
			openSnackbar: false,
			snackbarInfo: '',
			severity: 'success',
		};
	}

	static getDerivedStateFromProps(props, state) {
		// console.log(
		// 	'MyClass getDerivedStateFromProps',
		// 	props.className,
		// 	props.newCustomer
		// );
		let totalCustomers = 0;
		if (!props.className || props.className === '') {
			totalCustomers = state.Customers.length;
		} else {
			let displayCustomers = [...state.Customers];
			displayCustomers = displayCustomers.filter(
				(data) => data.className === props.className
			);
			totalCustomers = displayCustomers.length;
		}
		if (props.className && props.newCustomer) {
			const Customers = state.Customers;
			const newCustomer = props.newCustomer;

			let currentID = state.maxID;
			newCustomer.id = currentID;
			newCustomer.className = props.className;
			newCustomer.actions = newCustomer.id;

			// console.log('MyClass newCustomer', newCustomer, state.maxID);

			Customers.push(newCustomer);
			++totalCustomers;
			// console.log('MyClass newCustomer after', newCustomer, Customers);
			// console.log('MyClass handleTotalCustomers', totalCustomers);
			props.handleTotalCustomers(totalCustomers);
			return {
				selectedClass: props.className,
				Customers: Customers,
				totalCustomers: totalCustomers,
				maxID: ++currentID,
				openSnackbar: true,
				snackbarInfo: 'Thêm khách hàng thành công !',
				severity: 'success',
			};
		} else {
			if (props.className !== state.selectedClass) {
				props.handleTotalCustomers(totalCustomers);
			}
			return {
				selectedClass: props.className,
				totalCustomers: totalCustomers,
			};
		}
	}

	editRow = (id) => {
		// console.log('editRow', id);
		const editCustomer = this.state.Customers.find(
			(Customer) => Customer.id === id
		);
		// console.log('editRow', id, editCustomer);
		// console.log('editRow', id, { ...editCustomer });
		if (editCustomer) {
			this.setState({
				openEditor: true,
				editCustomer: editCustomer,
				editedCustomer: { ...editCustomer },
			});
		}
	};

	deleteRow = (id) => {
		const editCustomer = this.state.Customers.find(
			(Customer) => Customer.id === id
		);
		// console.log('deleteRow', id, editCustomer);
		// alert('xoá');
		if (editCustomer) {
			this.setState({
				openConfirmation: true,
				editCustomer: editCustomer,
			});
		}
	};

	handleCloseConfirmation = (yes) => {
		// console.log('handleCloseConfirmation', yes);
		this.setState({ openConfirmation: false });
		if (yes) {
			let Customers = this.state.Customers;
			Customers = Customers.filter(
				(data) => data.id !== this.state.editCustomer.id
			);
			const totalCustomers = this.state.totalCustomers - 1;
			// console.log('handleCloseConfirmation', Customers);
			this.setState({ Customers: Customers, totalCustomers: totalCustomers });
			this.props.handleTotalCustomers(totalCustomers);
			this.setState({
				openSnackbar: true,
				snackbarInfo: 'Xóa khách hàng thành công !',
				severity: 'success',
			});
		}
	};

	handleCloseEditor = (yes) => {
		// console.log('handleCloseEditor', yes);
		this.setState({ openEditor: false });
		if (yes) {
			// console.log(
			// 	'handleCloseEditor: editCustomer',
			// 	this.state.editCustomer
			// );
			// console.log(
			// 	'handleCloseEditor: editedCustomer',
			// 	this.state.editedCustomer
			// );
			let Customers = this.state.Customers;
			Customers = Customers.filter(
				(data) => data.id !== this.state.editedCustomer.id
			);
			Customers.push(this.state.editedCustomer);
			this.setState({
				Customers: Customers,
				editCustomer: null,
				editedCustomer: null,
				openSnackbar: true,
				snackbarInfo: 'Chỉnh sửa thành công !',
				severity: 'success',
			});
		} else {
			this.setState({
				editCustomer: null,
				editedCustomer: null,
			});
		}
	};

	setFirstName = (event) => {
		// console.log('setFirstName', event.target.value);
		const editedCustomer = this.state.editedCustomer;
		editedCustomer.firstName = event.target.value;
		this.setState(editedCustomer);
	};

	setLastName = (event) => {
		// console.log('setLastName', event.target.value);
		const editedCustomer = this.state.editedCustomer;
		editedCustomer.lastName = event.target.value;
		this.setState(editedCustomer);
	};

	setCountry = (event) => {
		// console.log('setCountry', event.target.value);
		const editedCustomer = this.state.editedCustomer;
		editedCustomer.country = event.target.value;
		this.setState(editedCustomer);
	};

	handleSnackbarClose = () => {
		this.setState({
			openSnackbar: false,
		});
	};

	// Alert = (props) => {
	// 	return <MuiAlert elevation={6} variant='filled' {...props} />;
	// };

	// componentDidUpdate() {
	// 	console.log('componentDidUpdate');
	// 	let totalCustomers = MyClass.calculateTotalCustomers(
	// 		this.state.selectedClass,
	// 		this.state.Customers
	// 	);
	// 	this.props.handleTotalCustomers(totalCustomers);
	// }

	render() {
		// console.log('MyClass render', this.state.selectedClass);
		let displayCustomers = [...this.state.Customers];
		displayCustomers = displayCustomers.filter(
			(data) => data.className === this.state.selectedClass
		);

		return (
			<div style={{ height: 700, width: '100%' }}>
				<DataGrid rows={displayCustomers} columns={this.state.columns} />
				<Dialog
					open={this.state.openConfirmation}
					onClose={() => this.handleCloseConfirmation(false)}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='alert-dialog-title'>
						Bạn có chắc là muốn xóa khách hàng{' '}
						{this.state.editCustomer?.firstName}{' '}
						{this.state.editCustomer?.lastName} ?{' '}
						<Avatar alt='' src={this.state.editCustomer?.picture} />
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'></DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => this.handleCloseConfirmation(false)}
							color='primary'
						>
							Hủy
						</Button>
						<Button
							onClick={() => this.handleCloseConfirmation(true)}
							color='primary'
							autoFocus
						>
							Đồng ý
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					open={this.state.openEditor}
					onClose={this.state.handleCloseEditor}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>
					    Chỉnh sửa thông tin khách hàng
					</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin='dense'
							id='firstName'
							onChange={this.setFirstName}
							label='Tên'
							type='text'
							defaultValue={this.state.editCustomer?.firstName}
							fullWidth
						/>
						<TextField
							margin='dense'
							id='lastName'
							onChange={this.setLastName}
							label='Họ'
							type='text'
							defaultValue={this.state.editCustomer?.lastName}
							fullWidth
						/>
						<TextField
							margin='dense'
							id='country'
							onChange={this.setCountry}
							label='Đất nước'
							type='text'
							defaultValue={this.state.editCustomer?.country}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => this.handleCloseEditor(false)}
							color='primary'
						>
							Hủy
						</Button>
						<Button
							onClick={() => this.handleCloseEditor(true)}
							color='primary'
						>
							Lưu
						</Button>
					</DialogActions>
				</Dialog>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={this.state.openSnackbar}
					onClose={this.handleSnackbarClose}
					key={{ vertical: 'bottom', horizontal: 'right' }}
				>
					<MuiAlert
						onClose={this.handleSnackbarClose}
						severity={this.state.severity}
						variant='filled'
					>
						{this.state.snackbarInfo}
					</MuiAlert>
				</Snackbar>
			</div>
		);
	}
}

export default MyClass;