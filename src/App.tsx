import {useCallback, useState} from 'react';
import {useThrottle} from "./hooks";

import Button from './components/Button/Button.tsx';
import UserInfo from './components/UserInfo/UserInfo.tsx';

import classes from './App.module.scss'

const URL = 'https://jsonplaceholder.typicode.com/users';

type Company = {
    bs: string;
    catchPhrase: string;
    name: string;
};

type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
};

export type User = {
    id: number;
    email: string;
    name: string;
    phone: string;
    username: string;
    website: string;
    company: Company;
    address: Address;
};


function App(): JSX.Element {
    const [user, setUser] = useState<User | null>(null);

    // использовал useState для управления данными пользователя и кеша.
    const [cachedUsers, setCachedUsers] = useState<Map<number, User>>(new Map());

    // использовал useCallback для мемоизации функции receiveRandomUser.
    const receiveRandomUser = useCallback(async () => {
        const id = Math.floor(Math.random() * 10) + 1;

        // Реализует кеширование для полученных пользователей, чтобы избежать избыточных сетевых запросов.
        if (cachedUsers.has(id)) {
            setUser(cachedUsers.get(id)!);
            return;
        }
        
        try {
            const response = await fetch(`${URL}/${id}`);

            if (!response.ok) throw new Error('Ошибка сети');
            const data = (await response.json()) as User;

            setUser(data);
            setCachedUsers(prev => new Map(prev).set(id, data));
        } catch (error) {
            console.error('Ошибка при получении пользователя:', error);
        }
    }, [cachedUsers]);

    // И я удалил event.stopPropagation, потому что в данном случае это бесполезно

    const throttledReceiveRandomUser = useThrottle(receiveRandomUser, 2000);

    return (
        <div className={classes.wrapper}>
            <header className={classes.header}>Get a random user</header>
            <Button onClick={throttledReceiveRandomUser}/>
            <UserInfo user={user}/>
        </div>
    );
}

export default App;
