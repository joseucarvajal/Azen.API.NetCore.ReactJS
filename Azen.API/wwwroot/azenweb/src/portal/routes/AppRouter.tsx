import * as React from "react";
import {LoginPage} from '../pages/login/Login.page';


import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';



const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch> 
                    <Route exact path="/login">
                        {/* <LoginPage/> */}
                    </Route>
                    
                </Switch>
            </div>
        </Router>
    )
};

export default AppRouter;