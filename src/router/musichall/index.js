export default{
    path:"/musichall",
    component:()=>import("@/views/musichall"),
    children:[
        {
            path:"jingxuan",
            component:()=>import("@/views/musichall/indexComponents/JingXuan")
        },
        {
            path:"songrank",
            component:()=>import("@/views/musichall/indexComponents/SongRank")
        },
        {
            path:"singer",
            component:()=>import("@/views/musichall/indexComponents/Singer")
        },
        {
            path:"playlist",
            component:()=>import("@/views/musichall/indexComponents/PlayList")
        },
        {
            path:"album",
            component:()=>import("@/views/musichall/indexComponents/Album")
        },
        {
            path:"/musichall",
            redirect:"/musichall/jingxuan"
        }
    ]
    

}