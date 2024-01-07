import { useEffect, useState } from "react";

export function useLocalStorage(initialValue, key) {
    const [watched, setWatched] = useState(function() {
        const inLocal = localStorage.getItem(key)
        return inLocal ? JSON.parse(inLocal) : initialValue
    })
    useEffect(function() {
        localStorage.setItem(key, JSON.stringify(watched))
    }, [watched, key])

    return {watched, setWatched}
}