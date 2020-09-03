export default{
    path:"/musichall",
    component:()=>import("@/views/musichall"),
    children:[
        {
            path:"jingxuan",
            component:()=>import("@/components/jingxuan")
        },
        {
            path:"/musichall",
            redirect:"/musichall/jingxuan"
        }
    ]
    

}