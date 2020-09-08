export default{
    path:"/musichall",
    component:()=>import("@/views/musichall"),
    children:[
        {
            path:"jingxuan",
            component:()=>import("@/components/jingxuan")
        },
        {
            path:"songrank",
            component:()=>import("@/components/songrank")
        },
        {
            path:"singer",
            component:()=>import("@/components/singer")
        },
        {
            path:"playlist",
            component:()=>import("@/components/playlist")
        },
        {
            path:"album",
            component:()=>import("@/components/album")
        },
        {
            path:"/musichall",
            redirect:"/musichall/jingxuan"
        }
    ]
    

}