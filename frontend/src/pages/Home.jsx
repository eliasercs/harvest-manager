import useAuthStore from "../hooks/useAuthStore"

export const Home = () => {

    const {user, startLogOut} = useAuthStore()

    return <div>
        <h1>{user.name}</h1>
        <button onClick={startLogOut}>LogOut</button>
    </div>
}