import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";

const SettingsMenu = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div>
        <IconButton
          onClick={handleClick}
          size="medium"
          aria-controls={open ? "account-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
        >
          <SlOptionsVertical />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={() => onEdit()}>
          <FaEdit size={30} color="blue" /> Editar
        </MenuItem>
        <MenuItem onClick={() => onDelete()}>
          <MdDelete size={30} color="red" /> Deletar
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default SettingsMenu;
