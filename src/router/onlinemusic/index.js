export default{
    path:"/onlinemusic",
    component:()=>import("@/views/onlinemusic"),
    children:[
        {
            path:"musichall",
            component:()=>import("@/components/musichall")
        },
        {
            path:"video",
            component:()=>import("@/components/video")
        },
        {
            path:"radio",
            component:()=>import("@/components/radio")
        },
        {
            path:"/onlinemusic",
            redirect:"/onlinemusic/musichall"
        }
    ]

}