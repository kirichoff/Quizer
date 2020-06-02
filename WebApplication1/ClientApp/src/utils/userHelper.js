const userHelper = {
    GetUser: () =>
        JSON.parse(sessionStorage.getItem('login'))
    ,
    setUser: us =>
        sessionStorage.setItem('login', JSON.stringify(us))
    ,
    clearUser: () =>
        sessionStorage.removeItem('login')

}

export default userHelper