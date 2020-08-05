import React,{useContext, useState} from 'react'
import {profilePageStrings} from "../../../resource/text/UItext"
import AuthContext from '../../../context/auth/authContext'
import UserContext from '../../../context/user/userContext'
import { UserList } from './UserList';
import PlanPage from './PlanPage';

const Profile = () => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
    const [state, setState] = useState({mode:"none", info:[]});
    const {logout, user} = authContext;
    const {getFollowings, getFollowers} = userContext;

    const showFollowers=async()=>{
        try{
            const followers = await getFollowers(user.id);
            setState({mode:"followers", info:followers});
        }catch(e){
            console.error(e.message)
        }

    }

    const showFollowings=async()=>{
        try{
            const followings = await getFollowings(user.id);
            setState({mode:"followings", info:followings});
        }catch(e){
            console.error(e.message)
    }
    }

    if(user)
    {
        const {name, username, followers, followings} = authContext.user;

        return (
            <div className="row">
                <div className="col">
                    <h3 style={{display:"inline"}}>{name}</h3><p>@{username}</p>
                    <button type="submit" className="btn btn-primary" style={{marginRight:"5px"}} 
                            onClick={showFollowings}>{profilePageStrings.followings}:{followings.length}</button>
                    
                    <button type="submit" className="btn btn-primary"  style={{marginInline:"5px"}} 
                            onClick={showFollowers}>{profilePageStrings.followers}:{followers.length}</button>
                    
                    <button type="submit" className="btn btn-danger"  style={{marginInline:"5px"}} 
                            onClick={logout}>{profilePageStrings.logOut}</button>
                    <br/><br/>
                    <PlanPage/>
                </div>

                <div className="col">
                {state.mode==="followers"&&<UserList users = {state.info.content} totalUsers={state.info.totalSize} emptyMessage={profilePageStrings.emptyFollowers}/>}
                {state.mode==="followings"&&<UserList users = {state.info.content} totalUsers={state.info.totalSize} emptyMessage={profilePageStrings.emptyFollowings}/>}
                </div>
            </div>
        )
    }else{
        return(
            <div></div>
        )
    }
}

export default Profile
