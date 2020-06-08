import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';

import { User } from "../../dtos/user";
import { Cargo } from "../../dtos/cargo";

import "../../style/adminComponent.scss";

export interface IAdminProps {
    authUser: User;
    errorMessage: string;
}

function AdminComponent(props: IAdminProps) {
    const [errorMessage, setErrorMessage] = useState("");

    //@ts-ignore
    const [userList, setUserList] = useState(null as User[]);

    //@ts-ignore
    const [usersDisplay, setUsersDisplay] = useState(null as any[]);

    let mockUser = new User(1, "test", "test", "user", 20, 1000, 1)

    useEffect(() => {
        let userArr: any[] = [];
        let fetchUserData = async () => {
            //let result = await getAllUser()
            //setUserList(result);
            let result = [mockUser];
            if (result) {
                for (let user of result) {
                    userArr.push(
                        <div className="admin-user-holder" key={"user-" + user.id} id={"user-" + user.id}>
                            <div className="admin-user-cell-short">{user.id}</div>
                            <div className="admin-user-cell-short">{user.username}</div>
                            <div className="admin-user-cell-short">{user.currency}</div>
                            <div className="admin-user-cell-short">{user.cargoSpace}</div>
                            <div className="admin-user-cell-short" onClick={deleteUser}>DELETE</div>
                            {/* <div className="admin-user-cell-short" onClick={deleteUser}>UPDATE</div> */}
                        </div>
                    )
                }
                setUsersDisplay(userArr)
            }
        }
        fetchUserData();
    }, [userList]);

    let deleteUser = async (e: any) => {
        let id = e.currentTarget.parentElement.id.split("-")[1];
        // await deleteAction(id);
        // await getAllUser()
    }



    return (
        <>
            <div className="user-table">
                <div className="admin-user-holder">
                    <div className="admin-user-cell-short">ID</div>
                    <div className="admin-user-cell-short">USERNAME</div>
                    <div className="admin-user-cell-short">CURRENCY</div>
                    <div className="admin-user-cell-short">CARGO</div>
                </div>
                {usersDisplay}
            </div>
        </>
    );

}

export default AdminComponent;