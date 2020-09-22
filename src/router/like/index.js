export default{
    path:"/like",
    component:()=>import("@/views/like"),
    children:[
        {
            path:"songs",
            component:()=>import("@/views/like/indexComponents/Songs")
        },
        {
            path:"playlist",
            component:()=>import("@/views/like/indexComponents/PlayList")
        },
        {
            path:"album",
            component:()=>import("@/views/like/indexComponents/Album")
        },
        {
            path:"video",
            component:()=>import("@/views/like/indexComponents/Video")
        },
        {
            path:"/like",
            redirect:"/like/songs"
        }
    ]

}