import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

const SelectComponent = ({ handleChangeCategory, cat }) => {

    const { jobType } = useSelector(state => state.jobTypeAll);
    const { palette } = useTheme();

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    inputProps={{
                        MenuProps: {
                            MenuListProps: {
                                sx: {
                                    backgroundColor: palette.secondary.main
                                }
                            }
                        }
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cat}
                    label="Category"
                    onChange={handleChangeCategory}
                >
                    <MenuItem value="">All</MenuItem>
                    {
                        jobType && jobType.map(jt => (
                            <MenuItem key={jt._id} value={jt._id}>{jt.jobtypeName}</MenuItem>
                        ))
                    }


                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectComponent