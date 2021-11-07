import React from 'react';
// import style from './ComboClasses.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ComboClasses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{ year: 2021, name: 'Danh sách khách hàng thân thiết' },
				{ year: 2021, name: 'Danh sách khách hàng vip' },
                { year: 2021, name: 'Danh sách khách hàng may mắn' },
                { year: 2021, name: 'Danh sách khách hàng đã xóa' },
			],
			selectedList: '',
		};
	}

	handleChange = (event, value) => {
		// console.log('ComboClasses chọn lớp: ', value);
		this.setState({ selectedList: value?.name });
		this.props.handleChange(value?.name);
	};

	render() {
		return (
			<div style={{ minWidth: 200 }}>
				<Autocomplete
					id='combo-box-lop'
					size='small'
					options={this.state.data}
					getOptionLabel={(option) => option.name}
					onChange={this.handleChange}
					style={{
						background: 'white',
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							label=''
							variant='outlined'
							placeholder='Chọn danh sách'
						/>
					)}
				/>
			</div>
		);
	}
}

export default ComboClasses;