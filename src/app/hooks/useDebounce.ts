import {useEffect, useState} from "react";

const useDebounce = <Type>(value: Type, delay: number) => {
    const [debounceValue, setDebounceValue] = useState<Type>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        }
    }, [value]);

    return debounceValue;
}
export default useDebounce;
