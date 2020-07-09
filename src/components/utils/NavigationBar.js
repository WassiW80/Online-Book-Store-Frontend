import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import '../../css/NavigationBar.css'
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonIcon from '@material-ui/icons/Person';
import Badge from "@material-ui/core/Badge";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DialogBoxPage from "./CustomDialogBox";
import {withRouter} from "react-router";


class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogBoxVisible: false,
            url: "",
        };
    }

    handleClickOpen = () => {

        localStorage.getItem('token') === null ?
            this.setState({
                isDialogBoxVisible: true,
            }) :
            this.props.history.push('/cart');
    };

    handleClose = () => {
        this.setState({
            isDialogBoxVisible: false,
        })
    };

    returnSearchTextValue = (searchText) => {
        this.props.searchedText(searchText)
    };

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        const homepagePath = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        const isAdminPage = window.location.href.includes("admin");
        return (
            <AppBar id="App-header">
                <DialogBoxPage isDialogBoxVisible={this.state.isDialogBoxVisible} close={this.handleClose}/>
                <Toolbar id="toolbar">
                    <LocalLibraryIcon id="App-icon"/>
                    <Link style={{color: 'white', textDecoration: 'none'}} to={'/'}>
                        <Typography id="Headers-font">
                            e BookStore
                        </Typography>
                    </Link>
                    <div className="search"
                         style={homepagePath === '' || isAdminPage ? {visibility: "visible"} : {visibility: "hidden"}}>
                        <div className="searchIcon">
                            <SearchIcon/>
                        </div>
                        <InputBase fullWidth
                                   id="searchText"
                                   placeholder=" Search"
                                   className="inputRoot inputInput"
                                   inputProps={{'aria-label': 'search'}}
                                   onChange={(event) => this.returnSearchTextValue(event.target.value)}
                        />
                    </div>
                    <div className="grow"/>
                    <div className="shoppingCartDiv"
                         style={homepagePath === '' ? {visibility: "visible"} : {visibility: "hidden"}}
                    >
                        <IconButton id="profileIcon" aria-label="show 4 new mails" color="inherit"
                                    onClick={this.handleClickOpen}>
                            <Badge badgeContent={this.props.badgeCount} id="badge" style={{border: "2px solid #b90f4b"}}
                                   color="primary">
                                <ShoppingCartOutlinedIcon
                                    style={{fontSize: '100%', display: 'flex'}}/>
                            </Badge>
                        </IconButton>
                    </div>
                    <div className="logoutDiv"
                         style={homepagePath === '' || isAdminPage? {visibility: "visible"} : {visibility: "hidden"}}
                    >
                        <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                                <div>
                                    <IconButton id="profileIcon" color="inherit">
                                        <PersonIcon variant="contained" {...bindTrigger(popupState)}>
                                        </PersonIcon>
                                    </IconButton>
                                    <Popover
                                        style={{marginTop: "38px"}}
                                        {...bindPopover(popupState)}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        {localStorage.length === 0 ?
                                            <div className="loginPopUp">
                                                <h6>Welcome</h6>
                                                <div style={{fontSize: '13px'}}>
                                                    To access account and manage orders
                                                </div>
                                                <Button className="loginSignUp" onClick={this.handleClickOpen}>
                                                    Login/SignUp
                                                </Button>
                                            </div> :
                                            <div className="loginPopUp">
                                                <p className="logoutTitle">Hello,{localStorage.getItem('userName')}</p>

                                                <IconButton style={{backgroundColor: "white"}} className="myOrder"
                                                            color="inherit">
                                                    <ShoppingBasketOutlinedIcon fontSize="small"/> <b
                                                    id="listTitle"><Link to="/orders">My Orders</Link></b>
                                                </IconButton>
                                                <IconButton style={{backgroundColor: "white"}} className="myOrder"
                                                            color="inherit">
                                                    <FavoriteBorderOutlinedIcon fontSize="small"/> <b
                                                    id="listTitle"><Link to="/wishlist">Wishlist</Link></b>
                                                </IconButton>
                                                <Button id="logout" onClick={this.logout}>
                                                    Logout
                                                </Button>
                                            </div>}
                                    </Popover>
                                </div>
                            )}
                        </PopupState>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(NavigationBar);