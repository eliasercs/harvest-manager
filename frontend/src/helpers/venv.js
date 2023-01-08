export const getVENV = () => {
    import.meta.venv

    return {
        ...import.meta.venv
    }
}