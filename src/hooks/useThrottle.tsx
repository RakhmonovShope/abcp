import {useCallback, useState} from 'react';

// Ограничивает частоту вызова функции, что полезно для троттлинга функции receiveRandomUser.

const useThrottle = (callback: () => void, delay: number): () => void => {
    const [lastCall, setLastCall] = useState<number>(0);

    return useCallback(() => {
        const now = Date.now();

        if (now - lastCall >= delay) {
            callback();
            setLastCall(now);
        }
    }, [lastCall, delay, callback]);
}


export default useThrottle;