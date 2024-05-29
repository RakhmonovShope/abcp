import React from 'react';

import classes from './UserInfo.module.scss';

import type {User} from '../../App.tsx';

interface IUserInfoProps {
    user: User | null;
}


// использовал React.memo для оптимизации рендеров.
const UserInfo = React.memo(
    ({user}: IUserInfoProps): JSX.Element => {
        // Отображает информацию о пользователе, если она доступна, или сообщение, если нет данных.
        if (!user) return <div className={classes.empty}>User info not found</div>;

        return (
            <table className={classes.table}>
                <thead>
                <tr>
                    <th className={classes.tableData}>Username</th>
                    <th className={classes.tableData}>Phone number</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className={classes.tableData}> {user.name}</td>
                    <td className={classes.tableData}>{user.phone}</td>
                </tr>
                </tbody>
            </table>
        );
    }
);


export default UserInfo;