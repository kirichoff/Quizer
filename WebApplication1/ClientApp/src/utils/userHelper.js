const userHelper = {
    GetUser: () =>
        JSON.parse(localStorage.getItem('login'))
    ,
    setUser: us =>
        localStorage.setItem('login', JSON.stringify(us))
    ,
    clearUser: () =>
        localStorage.removeItem('login')

}

export default userHelper