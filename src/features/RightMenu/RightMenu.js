import { Avatar, Box, Button, Menu, MenuItem } from '@mui/material';
import React from 'react';

const RightMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box className='right-menu'>
            <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
            <Avatar>H</Avatar>
            </Button>
            <Menu
                sx={{margin: '0 auto'}}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Log in</MenuItem>
                <MenuItem onClick={handleClose}>Register</MenuItem>
            </Menu>
        </Box>
    );
};

export default RightMenu;