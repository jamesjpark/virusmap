import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
root: {
flexGrow: 1,
},
menuButton: {
marginRight: 'auto',
},
};

class AppShell extends React.Component {
constructor(props) {
super(props);
this.state = {
toggle: false,
about : "About Me",
about1 : "",
about2 :"",
};
}
handleDrawerToggle = () => this.setState({toggle: !this.state.toggle})

onClickResume = () => {
    window.location.replace("https://www.jamespark.info");
}
onClickFn=() => {
    if(this.state.about === "About Me"){this.setState({about: "Joonha Park,",
                                about1 : "A first-year Computer Engineering Student at UT Austin"  ,
                                about2 : "Interested in Software Engineering",
                                about3 : "www.jamespark.info"   
                        })
                    }
    else{
        this.setState({
            about : "About Me",
            about1 : "",
            about2  : "",
            about3 : ""
        })
    }

}
render() {
const { classes } = this.props;
return (
<div className={classes.root}>
<AppBar position="static">
    <div className= "title" ><center>Texas COVID-19 Map</center></div>
<IconButton className={classes.menuButton} color= "inherit" onClick={this.handleDrawerToggle} >
<MenuIcon/>
</IconButton>
</AppBar>
<Drawer id = "drawer" open={this.state.toggle} >

<MenuItem className ="drawerTitle" onClick={this.handleDrawerToggle}>BACK to Texas COVID-19 Map</MenuItem>
<div className = "coronamap">
   <p>Provides information about COVID-19 by counties in Texas</p>
   <p> You can see which counties have how many confirmed cases,</p>
   <p>and how the numbers are changing.</p> 
   <p>All the information is from </p>

   <a className = "link" href = "https://www.dshs.state.tx.us/news/updates.shtm#coronavirus" target="_blank">https://www.dshs.state.tx.us/news/updates.shtm#coronavirus</a>
</div>

<div className = "about">
<MenuItem onClick={this.onClickFn}className="aboutElement">{this.state.about}</MenuItem>
<div className = "aboutElement">
    <p>{this.state.about1}</p>
    <p>{this.state.about2}</p>
    <a href = "https://www.jamespark.info" target="_blank">{this.state.about3}</a>
</div>
</div>



</Drawer>
<div onClick ={this.handleDrawerToggle}>

</div>
</div>
);
}
}

export default withStyles(styles)(AppShell);


